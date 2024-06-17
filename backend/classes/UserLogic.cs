using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.interfaces;
using backend.models;
using backend.data;
using backend.DTO;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;

namespace backend.classes
{
    public class UserLogic : IUser
    {
        private ApplicationDbContext context;
        public UserLogic(ApplicationDbContext context)
        {
            this.context = context;
        }
        public List<DataUser> GetAllUsers()
        {
            var users = context.Users.ToList();
            return users.Select(u => new DataUser
            {
                UserId = u.UserId,
                Username = u.Username,
                PasswordHash = u.PasswordHash,
                Email = u.Email,
                Role = u.Role,
                CreatedAt = u.CreatedAt
            }).ToList();
        }

        public DataUser GetUserById(int id)
        {
            var user = context.Users.FirstOrDefault(u => u.UserId == id);
            return user;
        }

        public async Task<DataUser> Login(string username, string password)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Username == username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                return null;

            return user;
        }

        public async Task<DataUser> Register(DataUser user, string password)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);

            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UserExists(string username)
        {
            return await context.Users.AnyAsync(x => x.Username == username);
        }
        public async Task UpdateUser(DataUser user)
        {
            context.Users.Update(user);
            await context.SaveChangesAsync();
        }
        public async Task DeleteUser(int id)
        {
            var user = await context.Users.FindAsync(id);
            if (user != null)
            {
                context.Users.Remove(user);
                await context.SaveChangesAsync();
            }
        }
    }
}