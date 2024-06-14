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

        public ProductLogic(Product product){
            this.Products = product.Products;
        }
        public List<Product> GetAllProducts()
        {
            var products = 
        }
        public async Task<List<User>> GetAllUsersAsync()
        {
            return await Users.ToListAsync();
    }
    }
}
