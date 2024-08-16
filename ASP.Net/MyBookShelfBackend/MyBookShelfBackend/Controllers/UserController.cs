using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyBookShelfBackend.Data;
using MyBookShelfBackend.Dtos;
using MyBookShelfBackend.Helpers;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Controllers
{
    [Route(template:"api")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;
        private readonly UserManager<Users> _userManager;
        public UserController(IUserRepository repository, JwtService jwtService, UserManager<Users> userManager)
        {
            _userRepository = repository;
            _jwtService = jwtService;
            _userManager = userManager;
        }

        [HttpPost(template: "register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var alreadyUser = await _userManager.FindByEmailAsync(dto.EmailAdress);
            if (alreadyUser != null)
            {
                return BadRequest("Email already in use.");
            }
            var user = new Users
            {
                UserName = dto.Name,
                Email = dto.EmailAdress,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            var created = await _userManager.CreateAsync(user);
            if (!created.Succeeded)
            {
                return BadRequest(created.Errors);
            }
            var roleCreated = await _userManager.AddToRoleAsync(user, Roles.User);
            if (!roleCreated.Succeeded)
            {
                await _userManager.DeleteAsync(user);
                return BadRequest(roleCreated.Errors);
            }
            return Created("Success", user);
        }
        [HttpPost(template: "login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _userRepository.GetUsersByEmail(dto.EmailAdress);

            if (user == null)
            {
                return BadRequest("Wrong credentials");
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, hash: user.PasswordHash))
            {
                return BadRequest("Wrong credentials");
            }

            var _jwt = _jwtService.Generate(user.Id);

            Response.Cookies.Append("jwt", _jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new
            {
                message = "success"
            });
        }
        [HttpGet(template: "user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);

                var userId = token.Issuer;

                var user = _userRepository.GetById(userId);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }

        }
        [HttpGet(template:"userRoles")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);
                var userId = token.Issuer;
                var user = _userRepository.GetById(userId);

                if (user == null)
                {
                    return NotFound("User not found");
                }
                var roles =await _userManager.GetRolesAsync(user);
                var userWithRolesDto = new UserWithRolesDto
                {
                    Id = userId,
                    Email = user.Email,
                    UserName = user.UserName,
                    Roles = roles.ToList()
                };
                return Ok(userWithRolesDto);


            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }
        [HttpPost(template: "logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(key: "jwt");

            return Ok(new
            {
                message = "success"
            });
        }
        [HttpGet(template:"getUserWithRole/{id}")]
        public async Task<IActionResult> GetUserWithRoles(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null) { 
                return NotFound("User not found "); 
            }
            var roles =  await _userManager.GetRolesAsync(user);
            var userWithRolesDto = new UserWithRolesDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Roles = roles.ToList()
            };
            return Ok(userWithRolesDto);
        }
    }
}
