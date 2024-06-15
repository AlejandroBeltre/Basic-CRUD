using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.data;
using backend.models;
using System.Linq;
using System.Threading.Tasks;
using backend.classes;
using backend.data;
using backend.interfaces;
using backend.DTO;

namespace backend.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUser _user;

        public UserController(IUser user)
        {
            _user = user;
        }

        [HttpGet]
        public IEnumerable<DataUser> GetAllUsers()
        {   
            return _user.GetAllUsers();
        }
    }
}