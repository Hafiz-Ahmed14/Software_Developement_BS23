using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CV_Generator.Models;
using Microsoft.EntityFrameworkCore;

namespace CV_Generator.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Otp> Otps { get; set; }

        public DbSet<User> Users { get; set; }
    }
}

