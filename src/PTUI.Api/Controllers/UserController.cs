using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PTUI.Api.Settings;
using PTUI.Core.Interfaces;
using PTUI.Core.Entities;
using PTUI.Core.Model;
using PTUI.Core.Models;
using Microsoft.AspNet.Identity;
using PTUI.Core.Enums;

namespace PTUI.Api.Controllers;

[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly JWTSettings _jwtSettings;
    
    public UserController(IUserService userService, IOptions<JWTSettings> jwtSettings)
    {
        _userService = userService;
        _jwtSettings = jwtSettings.Value;
    }

    [HttpGet("testApi")]
    public async Task<IActionResult> TestApiAsync()
    {
        return Ok("Api connection works");
    }
    
    [HttpGet("secureTestApi")]
    [Authorize]
    public async Task<IActionResult> SecureTestApiAsync()
    {
        return Ok("Secure Api connection works");
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync(RegisterModel model)
    {
        var (result, message) = await _userService.RegisterAsync(model);
        if (result)
        {
            return Ok(message);
        }

        return BadRequest(message);
    }
    
    [HttpPost("token")]
    public async Task<IActionResult> GetTokenAsync(TokenRequestModel model)
    {
        var result = await _userService.GetTokenAsync(model, TransformJwtSettings(_jwtSettings));
        if (result.IsAuthenticated == false)
        {
            return BadRequest("Credentials do not match");
        }
        SetRefreshTokenInCookie(result.RefreshToken);
        return Ok(result);
    }
    [HttpPost("add-role")]
    public async Task<IActionResult> AddRoleAsync(AddRoleModel model)
    {
        var result = await _userService.AddRoleAsync(model);
        return Ok(result);
    }
    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        
        var response = await _userService.RefreshTokenAsync(refreshToken, TransformJwtSettings(_jwtSettings));
        if (!string.IsNullOrEmpty(response.RefreshToken))
            SetRefreshTokenInCookie(response.RefreshToken);
        return Ok(response);
    }
    

    [HttpPost("revoke-token")]
    public async Task<IActionResult> RevokeToken([FromBody] RevokeTokenRequest model)
    {
        // accept token from request body or cookie
        var token = model.Token ?? Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(token))
            return BadRequest(new { message = "Token is required" });

        var response = _userService.RevokeToken(token);

        if (!response)
            return NotFound(new { message = "Token not found" });

        return Ok(new { message = "Token revoked" });
    }
    private void SetRefreshTokenInCookie(string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(10),
        };
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }

    [Authorize]
    [HttpPost("tokens/{id}")]
    public IActionResult GetRefreshTokens(string id)
    {
        var user = _userService.GetById(id);
        return Ok(user.RefreshTokens);
    }

    // TODO: Move to common/helpers folder
    private static JWT TransformJwtSettings(JWTSettings original)
    {
        return new JWT
        {
            Key = original.Key,
            Issuer = original.Issuer,
            Audience = original.Audience,
            DurationInMinutes = original.DurationInMinutes,
        };
    }

    [HttpPost("setUserPreferences")]
    [Authorize]
    public async Task<IActionResult> SetUserPreferencesAsync([FromBody] UserPreferencesModel preferencesModel)
    {
        // var userId = User.Identity.GetUserId();
        // if (!_userService.IsUserSameAsInToken(userId, preferencesModel.UserId))
        // {
        //     return Unauthorized();
        // }
        
        // TODO: Do this need more custom logic, not hardcoded values?
        if (await _userService.SetUserPreferences(preferencesModel.UserId, preferencesModel.Preferences,
                preferencesModel.NavbarLocation, UserPreferenceFit.Custom, "numbers"))
        {
            return Ok(preferencesModel);
        }
        else
        {
            return Problem(detail: "Internal error", statusCode: 500);
        }
    }

    [HttpPost("saveRating")]
    [Authorize]
    public async Task<IActionResult> SaveRatingAsync([FromBody] RatingPostModel ratingModel)
    {
        if (!(int.TryParse(ratingModel.Rating, out var rating)))
        {
            return BadRequest("Invalid rating");
        }

        await _userService.SaveRating(ratingModel.UserId, rating, ratingModel.Reason, ratingModel.Fit);
        return Ok();
    }

    [HttpGet("componentPreference")]
    [Authorize]
    public async Task<IActionResult> GetComponentPreference(string tokenUserId, string component, int fit = (int)UserPreferenceFit.Default)
    {
        // var userId = User.Identity.GetUserId();
        // if (!_userService.IsUserSameAsInToken(userId, tokenUserId))
        // {
        //     return Unauthorized();
        // }
        
        return Ok(_userService.GetComponentPreference(tokenUserId, component, (UserPreferenceFit)fit));
    }
    
    [HttpGet("preferenceFit")]
    [Authorize]
    public async Task<IActionResult> GetPreferenceFit(string tokenUserId)
    {
        var fit = _userService.GetUserPreferenceFit(tokenUserId);
        return Ok(fit);
    }
    
    [HttpPost("preferenceFit")]
    [Authorize]
    public async Task<IActionResult> SetPreferenceFit([FromBody]PreferenceFitPostModel model)
    {
        if (!(await _userService.SetUserPreferenceFit(model.UserId, model.Fit)))
        {
            return BadRequest();
        }
        return Ok();
    }

}