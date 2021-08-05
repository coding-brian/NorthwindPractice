using Microsoft.AspNetCore.Mvc;
using Repository.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Website.Controllers
{
    public class EmployeeController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult EmployeeTable(String isedit)
        {
            ViewBag.isedit = isedit;

            return View("_EmployeeTable");
        }

        public IActionResult SearchEmployee() {

            return View();
        }


        public IActionResult DeleteEmployee() {

            return View();
        }

        public IActionResult UpdateEmployee() {

            return View();
        }

        public IActionResult InsertEmployee()
        {

            return View();
        }
    }
}
