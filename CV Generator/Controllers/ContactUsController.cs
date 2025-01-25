using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using CV_Generator.Models;
using Microsoft.AspNetCore.Mvc;

namespace CV_Generator.Controllers
{   
    [ApiController]
    [Route("/cv/")]
    public class ContactUsController : ControllerBase
    {   
        [HttpPost("sendemail")]

        public async Task<IActionResult> SendEmail(EmailRequest data)
        {
            if (data == null || string.IsNullOrEmpty(data.Name) || string.IsNullOrEmpty(data.Email) || string.IsNullOrEmpty(data.Question))
            {
                return BadRequest("Invalid input.");
            }

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
                    Subject = $"Contact Form: {data.Subject}",
                    Body = $"Name: {data.Name}\nEmail: {data.Email}\nQuestion: {data.Question}",
                    IsBodyHtml = false,
                };
                mailMessage.To.Add("hafizahmed373908@gmail.com");

                await smtpClient.SendMailAsync(mailMessage);
                return Ok("Email sent successfully.");
            }
            catch (Exception ex)
            {
                return Problem("Failed to send email: " + ex.Message);
            }
        }
        
    }
}