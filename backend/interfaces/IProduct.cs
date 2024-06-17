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
        Task AddProduct(DataProduct product);
        Task UpdateProduct(DataProduct product);
        Task DeleteProduct(int ProductId);
        List<DataProduct> GetProductsWithPagination(int pageNumber, int pageSize);
        List<DataProduct> SearchProducts(string searchTerm);
    }
}