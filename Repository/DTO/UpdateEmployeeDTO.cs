using System;
using System.Collections.Generic;
using System.Text;

namespace Repository.DTO
{
    public class UpdateEmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
