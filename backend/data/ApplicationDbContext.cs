using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using backend.models;
using backend.controllers;

namespace backend.data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }


        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
