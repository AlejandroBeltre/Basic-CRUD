using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.classes;
using backend.models;

namespace backend.interfaces
{
    public interface IProduct
    {
        List<Product> GetAllProducts();
        Product GetProductById(int id);
        void AddProduct(Product product);
        void UpdateProduct(Product product);
        void DeleteProduct(int id);
    }
}