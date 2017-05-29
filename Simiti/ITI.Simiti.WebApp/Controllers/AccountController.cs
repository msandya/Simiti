using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ITI.Simiti.WebApp.Services;
using Microsoft.AspNetCore.Authorization;
using ITI.Simiti.WebApp.Models.AccountViewModels;
using ITI.Simiti.DAL;
using System.Security.Claims;
using ITI.Simiti.WebApp.Authentification;

namespace ITI.Simiti.WebApp.Controllers
{
    public class AccountController : Controller
    {
        readonly UserService _userService;
        readonly TokenService _tokenService;
        readonly Random _random;

        public AccountController(UserService userService, TokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
            _random = new Random();
        }


        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login( LoginViewModel model )
        {
            if(ModelState.IsValid)
            {
                User user = _userService.FindUserByEmail(model.Email);
                if (user == null)
                {
                    ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                    return View(model);
                }
                await SignIn(user.Email, user.UserId.ToString());
                return RedirectToAction(nameof(Authenticated));
            }
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                if (_userService.FindUserByEmail(model.Email) != null )
                {
                    ModelState.AddModelError(string.Empty, "An account with this email already exists.");
                    return View(model);
                }
                if (_userService.FindUserByPseudo(model.Pseudo) != null)
                {
                    ModelState.AddModelError(string.Empty, "An account with this nickname already exists.");
                    return View(model);
                }
                _userService.CreatePasswordUser(model.Pseudo, model.Email, model.Password);
                User user = _userService.FindUserByEmail(model.Email);
                await SignIn(user.Email, user.UserId.ToString());
                return RedirectToAction(nameof(Authenticated));
            }
            return View(model);
        }

        [HttpGet]
        [Authorize(ActiveAuthenticationSchemes = CookieAuthentication.AuthenticationScheme)]
        public async Task<IActionResult> LogOff()
        {
            await HttpContext.Authentication.SignOutAsync(CookieAuthentication.AuthenticationScheme);
            ViewData["NoLayout"] = true;
            return View();
        }

        [HttpGet]
        [Authorize(ActiveAuthenticationSchemes = CookieAuthentication.AuthenticationScheme)]
        public IActionResult Authenticated()
        {
            string userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            string email = User.FindFirst(ClaimTypes.Email).Value;
            Token token = _tokenService.GenerateToken(userId, email);
            ViewData["BreachPadding"] = GetBreachPadding();
            ViewData["Token"] = token;
            ViewData["Email"] = email;
            ViewData["NoLayout"] = true;
            return View();
        }



        async Task SignIn(string email, string userId)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim( ClaimTypes.Email, email, ClaimValueTypes.String ),
                new Claim( ClaimTypes.NameIdentifier, userId.ToString(), ClaimValueTypes.String )
            };
            ClaimsIdentity identity = new ClaimsIdentity(claims, CookieAuthentication.AuthenticationType, ClaimTypes.Email, string.Empty);
            ClaimsPrincipal principal = new ClaimsPrincipal(identity);
            await HttpContext.Authentication.SignInAsync(CookieAuthentication.AuthenticationScheme, principal);
        }

        string GetBreachPadding()
        {
            byte[] data = new byte[_random.Next(64, 256)];
            _random.NextBytes(data);
            return Convert.ToBase64String(data);
        }

    }
}