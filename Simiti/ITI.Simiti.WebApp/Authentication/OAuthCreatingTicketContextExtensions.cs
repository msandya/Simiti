using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.OAuth;

namespace ITI.Simiti.WebApp.Authentication
{
    public static class OAuthCreatingTicketContextExtensions
    {
        public static string GetEmail( this OAuthCreatingTicketContext @this )
        {
            return @this.Identity.FindFirst( c => c.Type == ClaimTypes.Email ).Value;
        }

        static string GetNameIdentifier( this OAuthCreatingTicketContext @this )
        {
            return @this.Identity.FindFirst( c => c.Type == ClaimTypes.NameIdentifier ).Value;
        }
    }
}
