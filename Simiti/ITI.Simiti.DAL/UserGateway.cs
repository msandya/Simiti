using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace ITI.Simiti.DAL
{
    public class UserGateway
    {
        readonly string _connectionString;

        public UserGateway( string connectionString )
        {
            _connectionString = connectionString;
        }

        public void CreatePasswordUser( string pseudo, string email, byte[] password )
        {
            using (SqlConnection con = new SqlConnection( _connectionString ))
            {
                con.Execute(
                    "iti.sPasswordUserCreate",
                    new { Pseudo = pseudo, Email = email, Password = password },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public IEnumerable<string> GetAuthenticationProviders(string userId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<string>(
                    "select p.ProviderName from iti.vAuthenticationProvider p where p.UserId = @UserId",
                    new { UserId = userId });
            }
        }

        public IEnumerable<User> GetAll()
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select u.UserId,
                             u.Pseudo,
                             u.Email
                      from iti.vUser u;");
            }
        }

        public User FindById( int userId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select u.UserId,
                             u.Pseudo,
                             u.Email
                      from iti.vUser u
                      where UserId = @UserId",
                    new { UserId = userId })
                    .FirstOrDefault();
            }
        }

        public User FindByEmail(string email)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select u.UserId,
                             u.Pseudo,
                             u.Email
                      from iti.vUser u
                      where Email = @Email",
                    new { Email = email })
                    .FirstOrDefault();
            }
        }

        public User FindUserPassword(int userId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select [Password]
                      from iti.tPasswordUser
                      where UserId = @UserId",
                    new { UserId = userId })
                    .FirstOrDefault();
            }
        }

        public User FindByPseudo( string pseudo )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select u.UserId,
                             u.Pseudo,
                             u.Email
                      from iti.vUser u
                      where Pseudo = @Pseudo",
                    new { Pseudo = pseudo })
                    .FirstOrDefault();
            }
        }

        public User FindUserByProjectId( int projectId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select u.UserId,
                             u.Pseudo,
                             u.Email
                      from iti.vUser u
                      where ProjectId = @ProjectId", 
                    new { ProjectId = projectId })
                    .FirstOrDefault();
            }
        }

        public User FindUserByProjectIdAndName( string name, int projectId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select u.UserId,
                             u.Pseudo,
                             u.Email
                      from iti.vUser u
                      where ProjectId = @ProjectId and Name = @Name",
                    new { ProjectId = projectId, Name = name })
                    .FirstOrDefault();
            }
        }

        public void Create( string pseudo, string email )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserCreate", 
                    new { Pseudo = pseudo, Email = email }, 
                    commandType: CommandType.StoredProcedure);
            }
        }

        public void Delete( int userId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserDelete", 
                    new { UserId = userId }, 
                    commandType: CommandType.StoredProcedure);
            }
        }

        public void Update( int userId, string pseudo, string email )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserUpdate",
                    new { UserId = userId, Pseudo = pseudo, Email = email },
                    commandType: CommandType.StoredProcedure);
            }
        }

    }
}
