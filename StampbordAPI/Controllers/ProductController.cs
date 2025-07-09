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
        public async Task<ActionResult<List<ProductModel>>> GetAll()
        {
            return Ok(await _context.Products.ToListAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductModel>> GetById(int id)
        {
            return Ok(await _context.Products.FirstOrDefaultAsync(c => c.Id == id));
        }

        [HttpGet("paged")]
        public async Task<ActionResult<List<ProductModel>>> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? search = null)
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than zero.");

            var productsQuery = _context.Products.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                string searchLower = search.ToLower();
                productsQuery = productsQuery.Where(p =>
                    p.Description.ToLower().Contains(searchLower) ||
                    p.ProductCode.ToLower().Contains(searchLower) ||
                    p.NcmSh.ToLower().Contains(searchLower));
            }

            var totalCount = await productsQuery.CountAsync();

            var products = await productsQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();


            var result = new
            {
                data = products,
                pagination = new
                {
                    page,
                    pageSize,
                    totalPages = (int)Math.Ceiling((double)totalCount / pageSize),
                    totalCount
                }
            };

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProductModel>> UpdateCustomer(int id, [FromBody] ProductModel product)
        {
            var _product = await _context.Products.FindAsync(id);
            if (_product == null) return NotFound();

            _product.Description = product.Description;
            _product.NcmSh = product.NcmSh;
            _product.UnitaryPrice = product.UnitaryPrice;
            _product.ProductCode = product.ProductCode;

            await _context.SaveChangesAsync();

            return Ok(_product);
        }
    }
}
