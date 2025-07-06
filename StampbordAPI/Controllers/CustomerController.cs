using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StampbordAPI.Data;
using StampbordAPI.Models;

namespace StampbordAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly DataContext _context;
        public CustomerController(DataContext context) {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<List<CustomerModel>>> Add(CustomerModel customer)
        {
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpGet]
        public async Task<ActionResult<List<CustomerModel>>> GetAll()
        {
            return Ok(await _context.Customers.ToListAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CustomerModel>> GetById(int id)
        {
            return Ok(await _context.Customers.FirstOrDefaultAsync(c => c.Id == id));
        }

        [HttpGet("{query}")]
        public async Task<ActionResult<CustomerModel>> GetByQuery(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return BadRequest("Query can't be NULL or Empty.");

            var results = await _context.Customers
                .Where(c =>
                    c.Name.Contains(query) ||
                    c.Email.Contains(query) ||
                    c.TaxCode.Contains(query) ||
                    c.Telefone.Contains(query) 
                )
                .ToListAsync();

            return Ok(results);
        }

        [HttpGet("paged")]
        public async Task<ActionResult<List<CustomerModel>>> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than zero.");

            var skip = (page - 1) * pageSize;

            var customers = await _context.Customers
                .Skip(skip)
                .Take(pageSize)
                .ToListAsync();

            var totalCount = await _context.Customers.CountAsync();

            var result = new
            {
                data = customers,
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
    }
}
