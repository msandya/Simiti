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

        public IEnumerable<User> GetAll()
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select u.UserId,
                             u.Pseudo,
                             u.Adress
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
                             u.Adress
                      from iti.vUser u
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
                             u.Adress
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
                             u.Adress
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
                             u.Adress
                      from iti.vUser u
                      where ProjectId = @ProjectId and Name = @Name",
                    new { ProjectId = projectId, Name = name })
                    .FirstOrDefault();
            }
        }

        public void Create( string pseudo, byte[] password, string adressMail )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserCreate", new { Pseudo = pseudo, Password = password, AdressMail = adressMail }, 
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

        public void Update( int userId, string pseudo, byte[] passwordHashed, string adressEmail )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserUpdate",
                    new { UserId = userId },
                    commandType: CommandType.StoredProcedure);
            }
        }

    }
}
