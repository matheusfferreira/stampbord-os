using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StampbordAPI.Data;
using StampbordAPI.Models;

namespace StampbordAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly DataContext _context;
        public ProductController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<ProductModel>>> Add(ProductModel product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return Ok(await _context.Products.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<CustomerModel>>> GetAll()
        {
            return Ok(await _context.Products.ToListAsync());
        }
    }
}
