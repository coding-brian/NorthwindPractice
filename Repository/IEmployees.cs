using Repository.Model;
using System;
using System.Linq;

namespace Repository
{
    public interface IEmployees
    {
        bool DeleteEmployees(int employeeid);
        IQueryable<Employee> GetEmployees(int employeeid);
        int GetTotleEmployeesfromCities(string city);
        bool InsertEmployees(Employee employee);
        bool UpdateEmployees(Employee employee);
    }
}