using Microsoft.EntityFrameworkCore;
using Repository.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Repository
{
    public class Employees : IEmployees
    {
        private INorthwindContext _context;

        public Employees(INorthwindContext northwindContext)
        {
            _context = northwindContext;
        }

        /// <summary>
        /// 各個城市裡面，員工有幾個
        /// </summary>
        public int GetTotleEmployeesfromCities(string city)
        {
            return _context.Employees.Where(x => x.City == city).Count();
        }

        /// <summary>
        /// 取得特定員工
        /// </summary>
        /// <param name="employeeid">員工編碼</param>
        /// <returns></returns>
        public IQueryable<Employee> GetEmployees(int employeeid)
        {   
            return _context.Employees.Where(x => x.EmployeeId == employeeid);
        }

        /// <summary>
        /// 寫入員工資料
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public bool InsertEmployees(Employee employee)
        {
            _context.Employees.Add(employee);

            var result = _context.SaveChanges();

            return result > 0;
        }

        /// <summary>
        /// 更新特定員工
        /// </summary>
        /// <param name="employee"></param>
        /// <returns></returns>
        public bool UpdateEmployees(Employee employee)
        {
            var currentemployee = _context.Employees.Where(x => x.EmployeeId == employee.EmployeeId).First();

            currentemployee = employee;

            var result = _context.SaveChanges();

            return result > 0;

        }

        /// <summary>
        /// 刪除特定員工
        /// </summary>
        /// <param name="employeeid"></param>
        /// <returns></returns>
        public bool DeleteEmployees(int employeeid)
        {
            bool result = false;
            try 
            {
                var currentemployee = _context.Employees.Where(x => x.EmployeeId == employeeid).Include(x=>x.Orders).Include(x=>x.EmployeeTerritories).First();
                currentemployee.EmployeeTerritories.Clear();

                _context.Employees.Remove(currentemployee);

                result = _context.SaveChanges()>0;
            } 
            catch (Exception e) 
            {
                throw e;
            }

            return result ;
        }
    }
}
