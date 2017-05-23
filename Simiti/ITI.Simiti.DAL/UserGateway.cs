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

        public UserGateway(string connectionString )
        {
            _connectionString = connectionString;
        }

        public IEnumerable<User> GetAll()
        {
            using(SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select t.UserId,
                             t.Pseudo,
                             t.Adress,
                             t.UserPassword
                     from iti.vUser t;");
            }

        }
        public User FindById( int userId )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                    @"select t.UserId,
                             t.Pseudo,
                             t.Adress,
                             t.UserPassword
                     from iti.vUser t
                     <here t.UserId = @UserId;",
                new { UserId = userId } )
                    .FirstOrDefault();

            }
        }

        public User FindByName ( string pseudo )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                return con.Query<User>(
                       @"select t.UserId,
                             t.Pseudo,
                             t.Adress,
                             t.UserPassword
                     from iti.vUser t
                     <here t.Pseudo = @pseudo;",
                    new { Pseudo = pseudo })
                    .FirstOrDefault();
            }

        }

        public void Create (string pseudo, string adress )
        {
            Create(pseudo, adress);
        }

        public void Create(string pseudo,string userPassword,string adress)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserCreate",
                    new { Pseudo = pseudo, Adress = adress, UserPassword = userPassword },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public void Delete(int userId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserDelete",
                    new { UserId = userId },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public void Update(int userId, string pseudo, string userpassword,string adress)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
            {
                con.Execute(
                    "iti.sUserUpdate",
                    new { ClassId = userId, Pseudo = pseudo, Adress = adress },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public User FindUserByProjectIdAndName(string name,int projectId)
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
                return con.Query<User>(
                      @"select t.UserId,
                             t.Pseudo,
                             t.Adress,
         
                     from iti.vUser t
                     <here t.ProjectId= @ProjectId and t.Name = @Name;",
                   new { ProjectId = projectId, Name = name })
                   .FirstOrDefault();

        }
        public User FindByPseudo(string pseudo )
        {
            using (SqlConnection con = new SqlConnection(_connectionString))
                return con.Query<User>(
                      @"select t.UserId,
                             t.Pseudo,
                             t.Adress,
                     from iti.vUser t
                     <here t.Pseudo= @Pseudo;",
                   new { Pseudo = pseudo})
                   .FirstOrDefault();

        }

    }
}
