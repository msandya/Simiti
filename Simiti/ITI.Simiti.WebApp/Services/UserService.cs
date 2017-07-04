using ITI.PrimarySchool.WebApp;
using ITI.Simiti.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ITI.Simiti.WebApp.Services
{
    public class UserService
    {
        readonly UserGateway _userGateway;
        readonly PasswordHasher _passwordHasher;

        public UserService( UserGateway userGateway, PasswordHasher passwordHasher )
        {
            _userGateway = userGateway;
            _passwordHasher = passwordHasher;
        }

        public bool CreatePasswordUser( string pseudo, string email, string password )
        {
            if (_userGateway.FindByEmail(email) != null) return false;
            _userGateway.CreatePasswordUser(pseudo, email, _passwordHasher.HashPassword(password));
            
            return true;
        }

        public Result<IEnumerable<User>> GetAll()
        {
            return Result.Success(Status.Ok, _userGateway.GetAll());
        }

        public Result<User> CreateUser( string pseudo, string email )
        {
            if (!IsPseudoValid(pseudo)) return Result.Failure<User>(Status.BadRequest, "The username is invalid.");
            if (!IsAdressMailValid(email)) return Result.Failure<User>(Status.BadRequest, "Adress Mail is invalid.");

            _userGateway.Create(pseudo, email);
            User user = _userGateway.FindByPseudo(pseudo);
            return Result.Success(Status.Ok, user);
        }

        public Result<User> UpdateUser( int userId, string pseudo,  string email )
        {
            if (!IsPseudoValid(pseudo)) return Result.Failure<User>(Status.BadRequest, "The username is invalid.");
            if (!IsAdressMailValid(email)) return Result.Failure<User>(Status.BadRequest, "Adress Mail is invalid.");
            if (_userGateway.FindById(userId) == null) return Result.Failure<User>(Status.NotFound, "User not found.");

            _userGateway.Update(userId, pseudo, email);
            User user = _userGateway.FindById(userId);
            return Result.Success(Status.Ok, user);
        }

        public Result<User> UpdateUserPassword( int userId, string password )
        {
            _userGateway.UpdatePassword(userId, _passwordHasher.HashPassword(password));
            User user = _userGateway.FindById(userId);
            return Result.Success(Status.Ok, user);
        }

        public User FindUserByPseudo( string pseudo )
        {
            if (_userGateway.FindByPseudo(pseudo) != null)
                return _userGateway.FindByPseudo(pseudo);
            return null;
        }

        public User FindUserByEmail( string email )
        {
            User user = _userGateway.FindByEmail(email);
            if (user != null)
            {
                user.Password = _userGateway.FindUserPassword(user.UserId).Password;
                return user;
            }
            return null;
        }

        public User FindUserSecret(string email)
        {
            User user = _userGateway.FindByEmail(email);
            user.Password = _userGateway.FindUserPassword(user.UserId).Password;
            return user;
        }

        public User FindUserById(int userId)
        {
            User user = _userGateway.FindById(userId);
            return user;
        }

        public User FindUser(string email, string password)
        {
            User user = _userGateway.FindByEmail(email);
            if(user != null)
            {
                user.Password = _userGateway.FindUserPassword(user.UserId).Password;
            }
            if (user != null && _passwordHasher.VerifyHashedPassword(user.Password, password) == PasswordVerificationResult.Success)
            {
                return user;
            }
            return null;
        }

        public Result<int> Delete( int userId )
        {
            if (_userGateway.FindById(userId) == null) return Result.Failure<int>(Status.BadRequest, "User not found.");
            _userGateway.Delete(userId);
            return Result.Success(Status.Ok, userId);
        }

        bool IsPseudoValid(string pseudo) => !string.IsNullOrEmpty(pseudo);

        bool IsAdressMailValid(string email) => !string.IsNullOrEmpty(email);

        public IEnumerable<string> GetAuthenticationProviders(string userId)
        {
            return _userGateway.GetAuthenticationProviders(userId);
        }
    }
}
