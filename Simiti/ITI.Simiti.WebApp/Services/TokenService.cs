using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using ITI.Simiti.WebApp.Authentification;

namespace ITI.Simiti.WebApp.Services
{
    public class TokenService
    {
        readonly TokenProviderOptions _options;

        public TokenService( IOptions<TokenProviderOptions> options )
        {
            _options = options.Value;
        }

        public Token GenerateToken ( string userId, string email )
        {
            var now = DateTime.UtcNow;

            var claims = new Claim[]
            {
                new Claim( JwtRegisteredClaimNames.Sub, userId ),
                new Claim( JwtRegisteredClaimNames.Email, email ),
                new Claim( JwtRegisteredClaimNames.Iat, ( ( int )( now - new DateTime( 1970, 1, 1 ) ).TotalSeconds).ToString(), ClaimValueTypes.Integer64 )
            };

            var jwt = new JwtSecurityToken(
                issuer: _options.Issuer,
                audience: _options.Audience,
                claims: claims,
                notBefore: now,
                expires: now.Add(_options.Expiration),
                signingCredentials: _options.SigningCredentials);
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return new Token(encodedJwt, (int)_options.Expiration.TotalSeconds);
        }
    }
    public class Token
    {
        public Token( string accessToken, int expiresIn )
        {
            AccessToken = accessToken;
            ExpiresIn = expiresIn;
        }

        public string AccessToken { get; }

        public int ExpiresIn { get; }
    }
}
