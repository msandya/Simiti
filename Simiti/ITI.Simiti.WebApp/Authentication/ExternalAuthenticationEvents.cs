using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using ITI.Simiti.DAL;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OAuth;
using ITI.Simiti.WebApp.Authentication;

namespace ITI.Simiti.WebApp.Authentication
{
    public class ExternalAuthenticationEvents
    {

        readonly IExternalAuthenticationManager _authenticationManager;

        public ExternalAuthenticationEvents( IExternalAuthenticationManager authenticationManager )
        {
            _authenticationManager = authenticationManager;
        }

        public Task OnCreatingTicket( OAuthCreatingTicketContext context )
        {
            _authenticationManager.CreateOrUpdateUser( context );
            User user = _authenticationManager.FindUser( context );
            ClaimsPrincipal principal = CreatePrincipal( user );
            context.Ticket = new AuthenticationTicket( principal, context.Ticket.Properties, CookieAuthentication.AuthenticationScheme );
            return Task.CompletedTask;
        }

        ClaimsPrincipal CreatePrincipal( User user )
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim( ClaimTypes.NameIdentifier, user.UserId.ToString(), ClaimValueTypes.String ),
                new Claim( ClaimTypes.Email, user.Adress )
            };
            ClaimsPrincipal principal = new ClaimsPrincipal( new ClaimsIdentity( claims, CookieAuthentication.AuthenticationType, ClaimTypes.Email, string.Empty ) );
            return principal;
        }
    }
}
