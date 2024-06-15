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
        bool RegisterUser(DataUser user);
        bool LoginUser(DataUser user);
    }
}