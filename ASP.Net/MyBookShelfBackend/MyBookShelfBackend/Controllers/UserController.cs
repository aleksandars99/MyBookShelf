using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyBookShelfBackend.Dtos;
using MyBookShelfBackend.Helpers;
using MyBookShelfBackend.Interfaces;
using MyBookShelfBackend.Models;
using MyBookShelfBackend.ViewModels;

namespace MyBookShelfBackend.Controllers
{
    [Route(template:"api")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtService _jwtService;

        public UserController(IUserRepository userRepository, JwtService jwt)
        {
            _userRepository = userRepository;
            _jwtService = jwt;
        }
        [HttpPost(template:"Register")]
        public IActionResult Register (RegisterDto dto)
        {
            var user = new Users
            {
                UserName = dto.Name,
                Email = dto.EmailAdress,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            return Created("Success", _userRepository.Create(user));
        }

        [HttpPost(template:"Login")] 
        public IActionResult Login (LoginDto dto)
        {
            var user = _userRepository.GetUsersByEmail(dto.EmailAdress);

            if (user == null) return BadRequest("Wrong credentials");
            
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
        [HttpGet(template:"user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);

                string userId = token.Issuer;

                var user = _userRepository.GetById(userId);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return Unauthorized();
            }
        }

    }
}
