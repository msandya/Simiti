using System;
using System.Collections.Generic;
using System.Text;

namespace ITI.Simiti.DAL
{
    public class User
    {
        public int UserId { get; set; }

        public string Pseudo { get; set; }

        public string AdressMail { get; set; }

        public string PasswordHashed { get; set; }

        public string Salt { get; set; }

        public DateTime RegisterDate { get; set; }
    }
}
