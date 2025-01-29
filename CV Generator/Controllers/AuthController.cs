using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CV_Generator.Data;
using CV_Generator.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using System.Net.Mail;
using System.Net;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace CV_Generator.Controllers
{
    [ApiController]
    [Route("/cv/auth/")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        private static Dictionary<string, string> _otpStore = new(); // Temporary in-memory storage for OTPs

        public AuthController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost("register")]

        public async Task<IActionResult> Register(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if username or email already exists
            if (await _dbContext.Users.AnyAsync(u => u.Username == user.Username))
                return BadRequest(new { Username = new[] { "Username is already taken." } });

            if (await _dbContext.Users.AnyAsync(u => u.Email == user.Email))
                return BadRequest(new { Email = new[] { "Email is already registered." } });

            // Hash the password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Save user to database
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return Ok(new { message = "Registration successful." });
        }

        [HttpPost("login")]
        // public async Task<IActionResult> Login(LoginRequest request)
        // {
        //     var user = await _dbContext.Users
        //                                 .FirstOrDefaultAsync(u => u.Username == request.Username || u.Email == request.Username);

        //     // Ensure user exists and the password matches
        //     if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        //     {
        //         return Unauthorized(new { error = "Invalid username or password." });
        //     }

        //     return Ok(new { message = "Login successful." });
        // }

        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _dbContext.Users
                                        .FirstOrDefaultAsync(u => u.Username == request.Username || u.Email == request.Username);

            // Ensure user exists and the password matches
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return Unauthorized(new { error = "Invalid username or password." });
            }
            return Ok(new
            {

                username = user.Username,
                message = "Login successful."
            });
        }


        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest(new { error = "Email not registered." });
            }

            // Generate OTP
            string otp = GenerateOtp();

            // Save OTP to the database with an expiration time of 5 minutes
            var otpEntry = new Otp
            {
                Email = request.Email,
                OtpCode = otp,
                ExpirationTime = DateTime.UtcNow.AddMinutes(5) // Set expiration time
            };

            _dbContext.Otps.Add(otpEntry);
            await _dbContext.SaveChangesAsync();

            // Store the email and user ID in session for later use
            HttpContext.Session.SetString("ResetPasswordEmail", request.Email);
            HttpContext.Session.SetInt32("ResetPasswordUserId", user.Id);

            // Send OTP to email
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("hafizahmed373908@gmail.com", "rskk ehgp thyl dgnn"),
                    EnableSsl = true,
                };
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("hafizahmed373908@gmail.com"),
                    Subject = "Your OTP for Password Reset",
                    Body = $"Your OTP is {otp}",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(user.Email);
                smtpClient.Send(mailMessage);
            }
            catch (Exception)
            {
                return StatusCode(500, new { error = "Failed to send OTP email." });
            }

            return Ok(new { message = "OTP sent successfully." });
        }



        // Verify OTP
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp(VerifyOtpRequest request)
        {
            string storedEmail = HttpContext.Session.GetString("ResetPasswordEmail");
            int? storedUserId = HttpContext.Session.GetInt32("ResetPasswordUserId");

            var otpEntry = await _dbContext.Otps
                .FirstOrDefaultAsync(o => o.OtpCode == request.Otp && o.Email == storedEmail);

            if (otpEntry == null)
            {
                return BadRequest(new { error = "Invalid OTP" });
            }

            if (otpEntry.ExpirationTime < DateTime.UtcNow)
            {
                return BadRequest(new { error = "OTP has expired." });
            }

            // Remove OTP from the database after successful verification
            _dbContext.Otps.Remove(otpEntry);
            await _dbContext.SaveChangesAsync();

            // OTP verified successfully, continue with password reset process
            return Ok(new { message = "OTP verified." });
        }



        // Reset Password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            // Log session values for debugging
            var email = HttpContext.Session.GetString("ResetPasswordEmail");
            var userId = HttpContext.Session.GetInt32("ResetPasswordUserId");

            if (string.IsNullOrEmpty(email) || !userId.HasValue)
            {
                return BadRequest(new { error = "Session expired or invalid request." });
            }

            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return BadRequest(new { error = "User not found." });
            }

            user.Password = request.NewPassword;
            // Hash the new password
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);

            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();

            // Clear the session after password reset
            HttpContext.Session.Remove("ResetPasswordEmail");
            HttpContext.Session.Remove("ResetPasswordUserId");

            return Ok(new { message = "Password reset successfully." });
        }


        private string GenerateOtp()
        {
            var random = new Random();
            var otp = random.Next(100000, 999999).ToString();
            return otp;
        }
    }
}