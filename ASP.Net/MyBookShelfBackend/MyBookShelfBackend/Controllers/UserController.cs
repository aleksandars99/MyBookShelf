using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        public UserController(IUserRepository repository, JwtService jwtService)
        {
            _userRepository = repository;
            _jwtService = jwtService;
        }

        [HttpPost(template: "register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = new Users
            {
                UserName = dto.Name,
                Email = dto.EmailAdress,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            return Created("Sccss", _userRepository.Create(user));
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
        [HttpPost(template: "logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete(key: "jwt");

            return Ok(new
            {
                message = "success"
            });
        }

    }
}
