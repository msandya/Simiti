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

        public UserService( UserGateway userGateway )
        {
            _userGateway = userGateway;
        }

        public Result<IEnumerable<User>> GetAll()
        {
            return Result.Success(Status.Ok, _userGateway.GetAll());
        }

        public Result<User> CreateUser( string pseudo, byte[] password, string adressMail )
        {
            if (!IsPseudoValid(pseudo)) return Result.Failure<User>(Status.BadRequest, "The username is invalid.");
            if (!IsAdressMailValid(adressMail)) return Result.Failure<User>(Status.BadRequest, "Adress Mail is invalid.");

            _userGateway.Create(pseudo, password, adressMail);
            User user = _userGateway.FindByPseudo(pseudo);
            return Result.Success<User>(Status.Ok, user);
        }

        public Result<User> UpdateUser( int userId, string pseudo, byte[] password, string adressMail )
        {
            if (!IsPseudoValid(pseudo)) return Result.Failure<User>(Status.BadRequest, "The username is invalid.");
            if (!IsAdressMailValid(adressMail)) return Result.Failure<User>(Status.BadRequest, "Adress Mail is invalid.");
            if (_userGateway.FindById(userId) == null) return Result.Failure<User>(Status.NotFound, "User not found.");

            _userGateway.Update(userId, pseudo, password, adressMail);
            User user = _userGateway.FindById(userId);
            return Result.Success(Status.Ok, user);
        }

        public Result<User> GetById( int userId )
        {
            if (_userGateway.FindById(userId) == null) return Result.Failure<User>(Status.BadRequest, "User not found.");
            User user = _userGateway.FindById(userId);
            return Result.Success(Status.Ok, user);
        }

        public Result<int> Delete( int userId )
        {
            if (_userGateway.FindById(userId) == null) return Result.Failure<int>(Status.BadRequest, "User not found.");
            _userGateway.Delete(userId);
            return Result.Success(Status.Ok, userId);
        }

        bool IsPseudoValid(string pseudo) => !string.IsNullOrEmpty(pseudo);

        bool IsAdressMailValid(string adressMail) => !string.IsNullOrEmpty(adressMail);
    }
}
