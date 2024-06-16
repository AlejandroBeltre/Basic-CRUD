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

        public void AddProduct(DataProduct product)
        {
            throw new NotImplementedException();
        }

        public void DeleteProduct(int ProductId)
        {
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }

        public void UpdateProduct(DataProduct product)
        {
            throw new NotImplementedException();
        }
    }
}