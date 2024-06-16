using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using backend.DTO;
using backend.classes;

namespace backend.interfaces
{
    public interface IProduct
    {
        List<DataProduct> GetAllProducts();
        DataProduct GetProductById(int ProductId);
        void AddProduct(DataProduct product);
        void UpdateProduct(DataProduct product);
        void DeleteProduct(int ProductId);
    }
}