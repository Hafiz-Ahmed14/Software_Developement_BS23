using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CV_Generator.Models;
using Microsoft.AspNetCore.Mvc;

namespace CV_Generator.Controllers
{   
    [ApiController]
    [Route("/cv/auth/")]
    public class SignUpController:ControllerBase
    {   
        [HttpPost("register")]

        public IActionResult Register(SignUp signUpModel) {
            if (ModelState.IsValid)
            {
                return Ok(new { Message = "Registration successful!" });
            }
            
            var errors = ModelState
                .Where(x => x.Value?.Errors?.Count > 0) // Use null-conditional operators to safely access properties
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value?.Errors
                                ?.Select(e => e.ErrorMessage)
                                ?.ToArray() ?? Array.Empty<string>() // Use null-coalescing operator to handle null cases
            );


            return BadRequest(errors);
        }
        
    }
}