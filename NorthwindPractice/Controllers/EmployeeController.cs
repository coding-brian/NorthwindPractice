using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Repository;
using Repository.DTO;
using Repository.Model;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NorthwindPractice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {

        private IEmployees _repo;

        private MapperConfiguration mapperConfiguration = new MapperConfiguration(
            cfg => cfg.CreateMap < Employee, EmployeeDTO>().ForMember(x=>x.Photo,y=>y.MapFrom(o=> GetPhotePath(o.Photo))));

        public EmployeeController(IEmployees  employees) {
            _repo = employees;
        }

        [Route("/employee/{employeeid}")]
        [HttpGet]
        public EmployeeDTO GetEmployee(int employeeid) 
        {

            var employee = _repo.GetEmployees(employeeid).FirstOrDefault();


            var mapper = mapperConfiguration.CreateMapper();

            var result = mapper.Map<EmployeeDTO>(employee);

            return result;
        }

        [Route("/employee/city/{city}")]
        [HttpGet]
        public int GetEmpolyeefromnCity(string city) 
        {
            var result = _repo.GetTotleEmployeesfromCities(city);

            return result;
        }

        [Route("/employee/{id}/")]
        [HttpPut]
        public bool UpdateEmployee(int id,[FromBody] UpdateEmployeeDTO employeeDTO) 
        {
            var currentemploy=_repo.GetEmployees(id).FirstOrDefault();
            currentemploy.FirstName = employeeDTO.FirstName;
            currentemploy.LastName=employeeDTO.LastName;
            currentemploy.Title=employeeDTO.Title;
            currentemploy.Address=employeeDTO.Address;
            currentemploy.BirthDate=employeeDTO.BirthDate;

            var result=_repo.UpdateEmployees(currentemploy);

            return true;
        }

        [Route("/employee")]
        [HttpPost]
        public Object InsertEmployee(InsertEmployeeDTO body) 
        {
            
            var result = new Object();
            var path = ChangeBase64toPhote(body.Photo);
            if (ModelState.IsValid)
            {
                var employee = new Employee();
                employee.FirstName = body.FirstName;
                employee.LastName = body.LastName;
                employee.Title = body.Title;

                employee.BirthDate = body.BirthDate;
                employee.Address = body.Address;

                employee.Photo = ChangePhoto(path);
                employee.Notes = body.Notes;


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
            var result = _repo.DeleteEmployees(id);

            return true;
        }

        private  byte[] ChangePhoto(string filePath)
        {
            FileStream stream = new FileStream(
                filePath, FileMode.Open, FileAccess.Read);
            BinaryReader reader = new BinaryReader(stream);

            byte[] photo = reader.ReadBytes((int)stream.Length);

            reader.Close();
            stream.Close();

            return photo;
        }

        private static string GetPhotePath(byte[] bytes) 
        {

            var imagesrc = "";
            using (var stream = new MemoryStream(bytes)) 
            {
                stream.Write(bytes, 0,bytes.Length);
                string imageBase64 = Convert.ToBase64String(stream.ToArray());
                imagesrc = imageBase64;
            }

            return imagesrc;
        }

        private string ChangeBase64toPhote(string base64) 
        {
            byte[] arr = Convert.FromBase64String(base64);
            var path = Path.GetFullPath("./Images/Upload_Image.jpeg");
            using (MemoryStream ms = new MemoryStream(arr)) {

                using (Bitmap bmp = new Bitmap(ms)) {
                    
                    bmp.Save(path, System.Drawing.Imaging.ImageFormat.Jpeg);
                    ms.Close();
                }
            }

            
            
            return path;
        }
    }
}
