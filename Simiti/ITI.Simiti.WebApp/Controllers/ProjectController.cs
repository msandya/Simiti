using ITI.PrimarySchool.WebApp.Controllers;
using ITI.Simiti.DAL;
using ITI.Simiti.WebApp.Authentification;
using ITI.Simiti.WebApp.Models.ProjectViewModel;
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

    public class ProjectController : Controller
    {
        readonly ProjectService _projectService;
        readonly UserService _userService;
            
        public ProjectController(ProjectService projectService, UserService userService )
        {
            _projectService = projectService;
            _userService = userService;
        }

        [HttpGet("{ProjectId}")]
        public TheProject GetProjectByProjectId(int projectId)
        {
            TheProject project = _projectService.GetByProjectId(projectId);
            return project;
        }

        [HttpPut("{userId}")]
        public IActionResult CreateProject(int userId, [FromBody] ProjectViewModel model)
        {
            Result<TheProject> result = _projectService.CreateProject(model.Name, model.Project, model.UserId);
            return this.CreateResult<TheProject, ProjectViewModel>(result, o =>
            {
                o.ToViewModel = t => t.ToProjectViewModel();
            });
        }

        [HttpGet("{Name}")]
        public TheProject GetProjectByName(string name)
        {
            TheProject project = _projectService.GetByName(name);
            return project;
        }
    }
}
