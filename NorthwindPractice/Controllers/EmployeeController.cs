using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Repository;
using Repository.DTO;
using Repository.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace NorthwindPractice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private IEmployees _repo;

        public EmployeeController(IEmployees  employees) {
            _repo = employees;
        }

        [Route("/employee/{employeeid}")]
        [HttpGet]
        public Employee GetEmployee(int employeeid) 
        {

            var result = _repo.GetEmployees(employeeid);

            return result.FirstOrDefault();
        }

        [Route("/employee/city/{city}")]
        [HttpGet]
        public int GetEmpolyeefromnCity(string city) 
        {
            var result = _repo.GetTotleEmployeesfromCities(city);

            return result;
        }

        [Route("/employee/{id}/{firstname}")]
        [HttpPut]
        public bool UpdateEmployeeFirstName(int id,string firstname) 
        {
            var currentemploy=_repo.GetEmployees(id).FirstOrDefault();
            currentemploy.FirstName = firstname;
            
            var result=_repo.UpdateEmployees(currentemploy);

            return result;
        }

        [Route("/employee")]
        [HttpPost]
        public Object InsertEmployee([FromBody] EmployeeDTO body) 
        {
            var result = new Object();
            if (ModelState.IsValid)
            {
                var employee = new Employee();
                employee.FirstName = body.FirstName;
                employee.LastName = body.LastName;
                employee.Title = body.Title;
                employee.TitleOfCourtesy = body.TitleOfCourtesy;
                employee.BirthDate = body.BirthDate;
                employee.HireDate = body.HireDate;
                employee.Address = body.Address;
                employee.City = body.City;
                employee.Region = body.Region;
                employee.PostalCode = body.PostalCode;
                employee.Country = body.Country;
                employee.HomePhone = body.HomePhone;
                employee.Extension = body.Extension;
                employee.Photo = GetPhoto(body.Photo);
                employee.Notes = body.Notes;
                employee.ReportsTo = body.ReportsTo;
                employee.PhotoPath = body.PhotoPath;
                //var employee = JsonConvert.DeserializeObject<Employee>(JsonConvert.SerializeObject(body));

                result = _repo.InsertEmployees(employee);
            }
            else {
                result = String.Join("|", ModelState.Values.SelectMany(x => x.Errors).Select(x => x.ErrorMessage));
            }

            return result;
        }


        [Route("/employee/{id}")]
        [HttpDelete]
        public bool DeleteEmployee(int id) 
        {
            var result=_repo.DeleteEmployees(id);

            return result;
        }

        private static byte[] GetPhoto(string filePath)
        {
            FileStream stream = new FileStream(
                filePath, FileMode.Open, FileAccess.Read);
            BinaryReader reader = new BinaryReader(stream);

            byte[] photo = reader.ReadBytes((int)stream.Length);

            reader.Close();
            stream.Close();

            return photo;
        }
    }
}
