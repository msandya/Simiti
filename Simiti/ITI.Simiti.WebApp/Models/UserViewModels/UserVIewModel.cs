using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITI.Simiti.WebApp.Models.UserViewModels
{
    public class UserViewModel
    {
        public int UserId { get; set; }

        public string Pseudo { get; set; }

        public string Email { get; set; }

        public byte[] Password { get; set; }
    }
}
