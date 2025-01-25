using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CV_Generator.Models
{
    public class Login
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