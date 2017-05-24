using ITI.Simiti.DAL;
using ITI.Simiti.WebApp.Models.ProjectViewModel;
using ITI.Simiti.WebApp.Models.UserViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITI.Simiti.WebApp.Controllers
{
    public static class ModelExtensions
    {
        public static UserViewModel ToUserViewModel( this User @this )
        {
            return new UserViewModel
            {
                Email = @this.Email,
                Pseudo = @this.Pseudo
            };
        }

        public static ProjectViewModel ToProjectViewModel( this Project @this )
        {
            return new ProjectViewModel
            {
                Name = @this.Name,
                UserId = @this.UserId
            };
        }
    }
}
