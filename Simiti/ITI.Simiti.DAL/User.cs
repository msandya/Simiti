using System;
using System.Collections.Generic;
using System.Text;

namespace ITI.Simiti.DAL
{
    public class User
    {
        public int UserId { get; set; }

        public string Pseudo { get; set; }

        public string Email { get; set; }

        public byte[] Password { get; set; }
    }
}
