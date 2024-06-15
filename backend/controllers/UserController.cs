using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.data;
using backend.models;
using System.Linq;
using System.Threading.Tasks;
using backend.classes;
using backend.interfaces;
using backend.DTO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using backend.endpoints;
using System.Text.Json;

namespace backend.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;
        private readonly JwtOptions _jwtOptions;

        public UserController(IUser user,JwtOptions jwtOptions)
        {
            _user = user;
            _jwtOptions = jwtOptions;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            if (await _user.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = new DataUser
            {
                Username = userForRegisterDto.Username,
                Email = userForRegisterDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userForRegisterDto.Password),
                Role = userForRegisterDto.Role
            };

            var createdUser = await _user.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _user.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            // Create JSON payload to send to TokenEndpoint.Connect
            var loginPayload = new
            {
                grant_type = "password",
                username = userForLoginDto.Username,
                password = userForLoginDto.Password
            };

            // Convert the payload to a JSON string
            var loginJson = JsonSerializer.Serialize(loginPayload);

            // Create a new HttpRequest and set the content
            var request = HttpContext.Request;
            request.ContentType = "application/json";
            request.Body = new MemoryStream(Encoding.UTF8.GetBytes(loginJson));

            // Call the TokenEndpoint.Connect method
            var result = await TokenEndpoint.Connect(HttpContext, _jwtOptions);

            return result;
        }


        [HttpGet]
        public IEnumerable<DataUser> GetAllUsers()
        {   
            return _user.GetAllUsers();
        }
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _user.GetUserById(id);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }
    }
}