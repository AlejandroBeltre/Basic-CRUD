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

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _product.GetProductById(id);
            if (product == null)
            {
                return NotFound("No product found with the given ID.");
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] newProduct productDto)
        {
            var productToCreate = new DataProduct
            {
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                Stock = productDto.Stock,
                CreatedAt = DateTime.Now,
                LastUpdatedAt = DateTime.Now
            };

            await _product.AddProduct(productToCreate);

            return StatusCode(201);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] newProduct productDto)
        {
            var existingProduct = _product.GetProductById(id);
            if (existingProduct == null)
            {
                return NotFound("No product found with the given ID.");
            }
            var productToUpdate = new DataProduct
            {
                ProductId = id,
                Name = productDto.Name,
                Description = productDto.Description,
                Price = productDto.Price,
                Stock = productDto.Stock,
                LastUpdatedAt = DateTime.Now
            };

            await _product.UpdateProduct(productToUpdate);
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var existingProduct = _product.GetProductById(id);
            if (existingProduct == null)
            {
                return NotFound("No product found with the given ID.");
            }
            await _product.DeleteProduct(id);
            return NoContent();
        }
        [HttpGet("paginated")]
        public IActionResult GetProductsWithPagination(int pageNumber, int pageSize)
        {
            var products = _product.GetProductsWithPagination(pageNumber, pageSize);
            return Ok(products);
        }
        [HttpGet("search")]
        public IActionResult SearchProducts(string searchTerm)
        {
            var products = _product.SearchProducts(searchTerm);
            return Ok(products);
        }
    }
}