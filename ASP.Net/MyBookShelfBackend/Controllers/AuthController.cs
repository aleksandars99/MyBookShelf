using Microsoft.AspNetCore.Mvc;

namespace Auth.Controllers
{
    [Route(template:"")]
    [ApiController]
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Register()
        {
            return Ok("success");
        }
    }
}
