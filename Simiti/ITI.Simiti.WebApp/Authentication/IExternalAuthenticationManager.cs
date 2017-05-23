using ITI.Simiti.DAL;
using Microsoft.AspNetCore.Authentication.OAuth;

namespace ITI.Simiti.WebApp.Authentication
{
    public interface IExternalAuthenticationManager
    {
        void CreateOrUpdateUser( OAuthCreatingTicketContext context );

        User FindUser( OAuthCreatingTicketContext context );
    }
}