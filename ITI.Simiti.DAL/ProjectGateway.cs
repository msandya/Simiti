using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace ITI.Simiti.DAL
{
    public class ProjectGateway
    {
        readonly string _connectionString;

        public ProjectGateway( string connectionString )
        {
            _connectionString = connectionString;
        }

        public IEnumerable<Project> GetAll()
        {
            using( SqlConnection con = new SqlConnection( _connectionString ))
            {
                return con.Query<Project>(
                    @"select p.ProjectId,
                             p.Name,
                             p.UserId
                        from iti.vProject p;");
            }
        }

        public Project FindById( int projectId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<Project>(
                    @"select p.ProjectId,
                             p.Name,
                             p.UserId
                          from iti.vProject p
                          where p.ProjectId = @ProjectId;",
                    new { ProjectId = projectId })
                    .FirstOrDefault();
            }
        }

        public Project FindByName( string name )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<Project>(
                    @"select p.ProjectId,
                             p.Name,
                             p.UserId
                          from iti.vProject p
                          where p.Name = @Name;",
                    new { Name = name })
                    .FirstOrDefault();
            }
        }

        public void Create( string name, int userId )
        {
            Create(name, userId);
        }

        public void Create( string name, string pathProject, int userId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sProjectCreate",
                    new { Name = name, PathProject = pathProject, UserId = userId },
                    commandType: System.Data.CommandType.StoredProcedure);
            }
        }

        public void Delete( int projectId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sProjectDelete",
                    new { ProjectId = projectId },
                    commandType: System.Data.CommandType.StoredProcedure);
            }
        }

        public void Update( int projectId, string name, string pathProject )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sProjectUpdate",
                    new { ProjectId = projectId, Name = name, PathProject = pathProject },
                    commandType: System.Data.CommandType.StoredProcedure);
            }
        }
    }
}
