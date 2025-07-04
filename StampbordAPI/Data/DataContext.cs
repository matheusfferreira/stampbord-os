using Microsoft.EntityFrameworkCore;
using StampbordAPI.Models;

namespace StampbordAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<CustomerModel> Customers { get; set; }
    }
}
