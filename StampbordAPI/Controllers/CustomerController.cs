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

        //[HttpPut]
        //public async Task<ActionResult<CustomerModel>> UpdateCustomer(CustomerModel customer`)
        //{
        //    _context.Customers.Update(customer);
        //    await
        //}

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

        [HttpGet("paged")]
        public async Task<ActionResult<List<CustomerModel>>> GetPaged([FromQuery] int page = 1, [FromQuery] int pageSize = 10, [FromQuery] string? search = null)
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than zero.");

            var customersQuery = _context.Customers.AsQueryable();

            if (!string.IsNullOrWhiteSpace(search))
            {
                string searchLower = search.ToLower();
                customersQuery = customersQuery.Where(c =>
                    c.Name.ToLower().Contains(searchLower) ||
                    c.Email.ToLower().Contains(searchLower) ||
                    c.Telefone.ToLower().Contains(searchLower));
            }

            var totalCount = await customersQuery.CountAsync();
            
            var customers = await customersQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();


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

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomerModel>> UpdateCustomer(int id, [FromBody] CustomerModel customer)
        {
            var _customer = await _context.Customers.FindAsync(id);
            if (_customer == null) return NotFound();

            _customer.Name = customer.Name;
            _customer.TaxCode = customer.TaxCode;
            _customer.Email = customer.Email;
            _customer.Telefone = customer.Telefone;

            await _context.SaveChangesAsync();

            return Ok(_customer);
        }
    }
}
