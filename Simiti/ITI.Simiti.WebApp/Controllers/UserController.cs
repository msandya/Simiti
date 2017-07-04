using ITI.PrimarySchool.WebApp.Controllers;
using ITI.Simiti.DAL;
using ITI.Simiti.WebApp.Authentification;
using ITI.Simiti.WebApp.Models.UserViewModels;
using ITI.Simiti.WebApp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITI.Simiti.WebApp.Controllers
{
    [Route("api/[controller]")]
    [Authorize(ActiveAuthenticationSchemes = JwtBearerAuthentication.AuthenticationScheme)]
    public class UserController : Controller
    {
        readonly UserService _userService;

        public UserController( UserService userService )
        {
            _userService = userService;
        }

        [HttpGet]
        public IActionResult GetUserList()
        {
            Result<IEnumerable<User>> result = _userService.GetAll();
            return this.CreateResult<IEnumerable<User>, IEnumerable<UserViewModel>>(result, o =>
            {
                o.ToViewModel = x => x.Select(s => s.ToUserViewModel());
            });
        }

        [HttpGet("{emailUser}")]
        public User GetUserByEmail(string emailUser)
        {
            User user = _userService.FindUserSecret(emailUser);
            return user;
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UserViewModel model)
        {
            Result<User> result = _userService.UpdateUser(id, model.Pseudo, model.Email);
            return this.CreateResult<User, UserViewModel>(result, o =>
            {
                o.ToViewModel = s => s.ToUserViewModel();
            });
        }

        //[HttpPut("{email}")]
        //public bool VerifyUserPassword(string email, string password)
        //{
        //    User user = _userService.FindUser(email, password);
        //    if (user != null) return true;
        //    return false;
            
        //}
    }
}
