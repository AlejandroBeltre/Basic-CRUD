using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;
using backend.DTO;
using backend.classes;

namespace backend.interfaces
{
    public interface IUser
    {
        List<DataUser> GetAllUsers();
        DataUser GetUserById(int id);
        Task<DataUser> Register(DataUser user, string password);
        Task<DataUser> Login(string username, string password);
        Task<bool> UserExists(string username);
        Task UpdateUser(DataUser user);
        Task DeleteUser(int id);

    }
}