namespace StampbordAPI.Models
{
    public class CustomerModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string TaxCode { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string? Address { get; set; }
        public string? Logo { get; set; }
    }
}
