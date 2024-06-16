using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.data;
using backend.models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using backend.interfaces;
using System.Collections;
using backend.DTO;
using backend.classes;  

namespace backend.controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProduct _product;

        public ProductController(IProduct product)
        {
            _product = product;
        }

        [HttpGet]
        public IEnumerable<DataProduct> GetAllProducts()
        {
            return _product.GetAllProducts();
        } 
    }
}