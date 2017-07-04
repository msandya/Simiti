using ITI.Simiti.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITI.Simiti.WebApp.Services
{
    public class ProjectService
    {
        readonly ProjectGateway _projectGateway;
        readonly UserGateway _userGateway;

        public ProjectService( ProjectGateway projectGateway, UserGateway userGateway )
        {
            _projectGateway = projectGateway;
            _userGateway = userGateway;
        }

        public TheProject GetByProjectId(int projectId)
        {
            TheProject project = _projectGateway.FindById(projectId);
            return project;
        }

        public TheProject GetByName(string name)
        {
            TheProject project = _projectGateway.FindByName(name);
            return project;
        }

        public Result<TheProject> GetByNameNUserId(int userId, string name)
        {
            TheProject project = _projectGateway.FindByNameNUserId(userId, name);
            if (!IsNameValid(name)) return Result.Failure<TheProject>(Status.BadRequest, "The name of project is not valid.");
            if (project != null) return Result.Failure<TheProject>(Status.BadRequest, "This user created this project.");

            return Result.Success(Status.Created, project);
        }

        public Result<TheProject> CreateProject(string name, string project, int userId)
        {
            if (!IsNameValid(name)) return Result.Failure<TheProject>(Status.BadRequest, "The name of project is not valid.");
            if (!IsNameValid(project)) return Result.Failure<TheProject>(Status.BadRequest, "The project is not valid.");
            if (_userGateway.FindById(userId) == null) return Result.Failure<TheProject>(Status.NotFound, "The user not exist.");
            if (_projectGateway.FindByNameNUserId(userId, name) != null) return Result.Failure<TheProject>(Status.BadRequest, "This project existed.");

            _projectGateway.Create(name, project, userId);
            TheProject projectTesting = _projectGateway.FindByNameNUserId(userId, name);
            return Result.Success(Status.Ok, projectTesting);
        }

        public Result<IEnumerable<TheProject>> GetAll()
        {
            return Result.Success(Status.Ok, _projectGateway.GetAll());
        }

        public Result<TheProject> UpdateProject( int userId, int projectId, string name, string pathProject )
        {
            if (!IsNameValid(name)) return Result.Failure<TheProject>(Status.BadRequest, "The name of project is not valid.");
            if (!IsPathProjectValid(pathProject)) return Result.Failure<TheProject>(Status.BadRequest, "The path of project is not valid.");
            if (_projectGateway.FindById(projectId) == null) return Result.Failure<TheProject>(Status.NotFound, "This project does not exist.");
            if (_userGateway.FindUserByProjectIdAndName(name, projectId) != null) return Result.Failure<TheProject>(Status.BadRequest, "This project exist with its owner.");

            _projectGateway.Update(projectId, name, pathProject);
            TheProject project = _projectGateway.FindById(projectId);
            return Result.Success(Status.Ok, project);
        }

        public Result<TheProject> GetById( int projectId )
        {
            if ((_projectGateway.FindById(projectId)) == null) return Result.Failure<TheProject>(Status.NotFound, "Project not found.");
            return Result.Success(Status.Ok, _projectGateway.FindById(projectId));
        }

        public Result<int> Delete( int projectId )
        {
            if ((_projectGateway.FindById(projectId)) == null) return Result.Failure<int>(Status.NotFound, "Project not found.");
            _projectGateway.Delete(projectId);
            return Result.Success(Status.Ok, projectId);
        }

        bool IsNameValid(string name) => !string.IsNullOrWhiteSpace(name);

        bool IsPathProjectValid(string pathProject) => !string.IsNullOrWhiteSpace(pathProject);
    }
}
