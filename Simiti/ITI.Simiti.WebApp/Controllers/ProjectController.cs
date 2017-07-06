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

        [HttpGet("{projectId}")]
        public TheProject GetProjectByProjectId(int projectId)
        {
            TheProject project = _projectService.GetByProjectId(projectId);
            return project;
        }

        [HttpGet("getall/{userId}")]
        public IActionResult GetProjectList(int userId)
        {
            Result<IEnumerable<TheProject>> result = _projectService.GetAllProjectByUserId(userId);
            return this.CreateResult<IEnumerable<TheProject>, IEnumerable<ProjectViewModel>>(result, o =>
            {
                o.ToViewModel = x => x.Select(c => c.ToProjectViewModel());
            });
        }

        [HttpGet("loadproj/{projectN}/{userId}")]
        public IActionResult GetProject(string projectN, int userId)
        {
            Result<TheProject> result = _projectService.GetByNameNUserId(projectN, userId);
            return this.CreateResult<TheProject, ProjectViewModel>(result, o =>
            {
                o.ToViewModel = c => c.ToProjectViewModel();
            });
        }

        [HttpPost("saveproj/{userId}")]
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
