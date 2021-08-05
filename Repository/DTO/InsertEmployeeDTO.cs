using System;
using System.Collections.Generic;
using System.Text;

namespace Repository.DTO
{
    public class InsertEmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Address { get; set; }
        public string Notes { get; set; }

        public string Photo { get; set; }
    }
}
