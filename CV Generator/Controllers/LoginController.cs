using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;


namespace CV_Generator.Controllers
{
    [ApiController]
    [Route("cv/auth/")]
    public class LoginController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login(LoginRequest loginRequest)
        {
            var validUsers = new List<User>
            {
                new User { Email = "test@example.com", Username = "Hafiz", Password = "password123" }
            };

            var user = validUsers.FirstOrDefault(u =>
                (u.Email == loginRequest.EmailOrUsername || u.Username == loginRequest.EmailOrUsername) &&
                u.Password == loginRequest.Password);

            if (user != null)
            {
                return Ok(new { Message = "Login successful!" });
            }

            return Unauthorized(new { Message = "Invalid credentials." });
        }
    }

    public class LoginRequest
    {
        public string EmailOrUsername { get; set; }
        public string Password { get; set; }
    }

    public class User
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}