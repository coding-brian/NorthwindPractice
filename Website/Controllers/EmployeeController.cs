using Microsoft.AspNetCore.Mvc;
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
    }
}
