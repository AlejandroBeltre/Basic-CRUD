using Microsoft.EntityFrameworkCore;
using backend.DTO;
using backend.classes;
using backend.interfaces;
using backend.models;
using backend.controllers;


namespace backend.data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<DataUser> Users { get; set; }
        public DbSet<DataProduct> Products { get; set; }
    }
}
