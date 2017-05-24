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

        public Result<IEnumerable<Project>> GetAll()
        {
            return Result.Success(Status.Ok, _projectGateway.GetAll());
        }

        public Result<Project> CreateProject( string name, string pathProject, int userId )
        {
            if (!IsNameValid(name)) return Result.Failure<Project>(Status.BadRequest, "The name of project is not valid.");
            if (!IsPathProjectValid(pathProject)) return Result.Failure<Project>(Status.BadRequest, "The path of project is not valid.");
            if (_projectGateway.FindByName(name) != null && _userGateway.FindById(userId) != null ) return Result.Failure<Project>(Status.BadRequest, "This project exist with its owner.");

            _projectGateway.Create(name, pathProject, userId);
            Project project = _projectGateway.FindByName(name);
            return Result.Success(Status.Created, project);
        }

        public Result<Project> UpdateProject( int userId, int projectId, string name, string pathProject )
        {
            if (!IsNameValid(name)) return Result.Failure<Project>(Status.BadRequest, "The name of project is not valid.");
            if (!IsPathProjectValid(pathProject)) return Result.Failure<Project>(Status.BadRequest, "The path of project is not valid.");
            if (_projectGateway.FindById(projectId) == null) return Result.Failure<Project>(Status.NotFound, "This project does not exist.");
            if (_userGateway.FindUserByProjectIdAndName(name, projectId) != null) return Result.Failure<Project>(Status.BadRequest, "This project exist with its owner.");

            _projectGateway.Update(projectId, name, pathProject);
            Project project = _projectGateway.FindById(projectId);
            return Result.Success(Status.Ok, project);
        }

        public Result<Project> GetById( int projectId )
        {
            if ((_projectGateway.FindById(projectId)) == null) return Result.Failure<Project>(Status.NotFound, "Project not found.");
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
