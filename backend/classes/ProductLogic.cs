using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.interfaces;
using backend.models;
using backend.data;
using backend.DTO;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace backend.classes
{ 
    public class ProductLogic : IProduct
    {
        private ApplicationDbContext context;

        public ProductLogic(ApplicationDbContext context)
        {
            this.context = context;
        }

        public async Task AddProduct(DataProduct product)
        {
            await context.Products.AddAsync(product);
            await context.SaveChangesAsync();
        }

        public async Task DeleteProduct(int ProductId)
        {
            var product = await context.Products.FirstOrDefaultAsync(p => p.ProductId == ProductId);
            if (product != null)
            {
                context.Products.Remove(product);
                await context.SaveChangesAsync();
            }
        }

        public List<DataProduct> GetAllProducts()
        {
            var products = context.Products.ToList();
            return products.Select(u => new DataProduct
            {
                ProductId = u.ProductId,
                Name = u.Name,
                Description = u.Description,
                Price = u.Price,
                Stock = u.Stock,
                CreatedAt = u.CreatedAt,
                LastUpdatedAt = u.LastUpdatedAt
            }).ToList();
        }

        public DataProduct GetProductById(int ProductId)
        {
            var product = context.Products.FirstOrDefault(u => u.ProductId == ProductId);
            return product;
        }

        public List<DataProduct> GetProductsWithPagination(int pageNumber, int pageSize)
        {
            var products = context.Products
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new DataProduct
                {
                    ProductId = u.ProductId,
                    Name = u.Name,
                    Description = u.Description,
                    Price = u.Price,
                    Stock = u.Stock,
                    CreatedAt = u.CreatedAt,
                    LastUpdatedAt = u.LastUpdatedAt
                })
                .ToList();

            return products;
        }

        public List<DataProduct> SearchProducts(string searchTerm)
        {
            var products = context.Products
            .Where(p => p.Name.Contains(searchTerm) || p.Description.Contains(searchTerm))
            .Select(u => new DataProduct
            {
                ProductId = u.ProductId,
                Name = u.Name,
                Description = u.Description,
                Price = u.Price,
                Stock = u.Stock,
                CreatedAt = u.CreatedAt,
                LastUpdatedAt = u.LastUpdatedAt
            })
            .ToList();

            return products;
        }

        public async Task UpdateProduct(DataProduct product)
        {
            var existingProduct = await context.Products.FirstOrDefaultAsync(p => p.ProductId == product.ProductId);
            if (existingProduct != null)
            {
                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.Price = product.Price;
                existingProduct.Stock = product.Stock;
                existingProduct.LastUpdatedAt = DateTime.Now;

            await context.SaveChangesAsync();
            }
        }
    }
}