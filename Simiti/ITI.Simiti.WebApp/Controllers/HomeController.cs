using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ITI.Simiti.WebApp.Services;
using System.Security.Claims;
using ITI.Simiti.WebApp.Authentification;

namespace ITI.Simiti.WebApp.Controllers
{
    public class HomeController : Controller
    {
        readonly TokenService _tokenService;
        readonly UserService _userService;

        public HomeController(TokenService tokenService, UserService userService)
        {
            _tokenService = tokenService;
            _userService = userService;
        }

        public IActionResult Index()
        {
            ClaimsIdentity identity = User.Identities.SingleOrDefault(i => i.AuthenticationType == CookieAuthentication.AuthenticationType);
            
            if (identity != null)
            {
                string userId = identity.FindFirst(ClaimTypes.NameIdentifier).Value;
                string email = identity.FindFirst(ClaimTypes.Email).Value;
                Token token = _tokenService.GenerateToken(userId, email);
                ViewData["Token"] = token;
                ViewData["Email"] = email;
            }
            else
            {
                ViewData["Token"] = null;
                ViewData["Email"] = null;
            }

            ViewData["NoLayout"] = true;
            return View();
        }
        
    }
}
