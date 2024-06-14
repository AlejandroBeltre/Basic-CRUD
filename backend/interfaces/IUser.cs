using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.models;

namespace backend.interfaces
{
    public interface IUser
    {
        List<User> GetAllUsers();
        bool RegisterUser(User user);
        bool LoginUser(User user);
    }
}