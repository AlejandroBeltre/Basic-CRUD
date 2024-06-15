using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.interfaces;
using backend.models;
using backend.data;
using backend.DTO;
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

        public bool LoginUser(DataUser user)
        {
            throw new NotImplementedException();
        }

        public bool RegisterUser(DataUser user)
        {
            throw new NotImplementedException();
        }
    }
}