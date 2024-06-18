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
                Role = "user"
            };

            var createdUser = await _user.Register(userToCreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
{
    var userFromRepo = await _user.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

    if (userFromRepo == null)
    {
        Console.WriteLine("Login failed: Invalid username or password");
        return Unauthorized();
    }

    var claims = new[]
    {
        new Claim(JwtRegisteredClaimNames.Sub, userFromRepo.Username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.Role, userFromRepo.Role) 
    };
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.SigningKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: _jwtOptions.Issuer,
        audience: _jwtOptions.Audience,
        claims: claims,
        expires: DateTime.Now.AddMinutes(30),
        signingCredentials: creds);

    Console.WriteLine("Login successful: Token generated");
    return Ok(new 
    { 
        token = new JwtSecurityTokenHandler().WriteToken(token),
        role = userFromRepo.Role
    });
}

        [Authorize]
        [HttpGet]
        public IEnumerable<DataUser> GetAllUsers()
        {   
            return _user.GetAllUsers();
        }
        [Authorize]
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
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userDto)
        {
            var existingUser = _user.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            existingUser.Username = userDto.Username;
            existingUser.Email = userDto.Email;
            existingUser.Role = userDto.Role;

            await _user.UpdateUser(existingUser);
            return NoContent();
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var existingUser = _user.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            await _user.DeleteUser(id);
            return NoContent();
        }

    }
}