using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PTUI.Core.Interfaces;
using PTUI.Core.Entities;
using PTUI.Core.Enums;
using PTUI.Core.Model;
using PTUI.Core.Models;
using PTUI.Core.Context;


namespace PTUI.Core.Services;

public class UserService : IUserService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ApplicationDbContext _context;

    public UserService(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
    }

    public async Task<(bool, string)> RegisterAsync(RegisterModel model)
    {
        if (await _userManager.FindByNameAsync(model.Username) != null)
        {
            return (false, "User exists!");
        }
        

        var user = new ApplicationUser()
        {
            UserName = model.Username,
            FirstName = "",
            LastName = "",
            Email = "",
            PreferenceFit = UserPreferenceFit.Default
        };
        
        var result = await _userManager.CreateAsync(user, model.Password);
        if (result.Succeeded)
        {
            return (true, "User registered");
        }

        var messages = result.Errors.Select(x => x.Description.TrimEnd('.'));
        return (false, string.Join(", ", messages));
    }

    public async Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model, JWT jwtSettings)
    {
        var authenticationModel = new AuthenticationModel();
        //var user = await _userManager.FindByEmailAsync(model.Email);
        var user = await _userManager.FindByNameAsync(model.Username);
        if (user == null)
        {
            authenticationModel.IsAuthenticated = false;
            authenticationModel.Message = $"No Accounts Registered with {model.Username}.";
            return authenticationModel;
        }
        if (await _userManager.CheckPasswordAsync(user, model.Password))
        {
            authenticationModel.IsAuthenticated = true;
            var jwtSecurityToken = await CreateJwtToken(user, jwtSettings);
            authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            authenticationModel.Email = user.Email;
            authenticationModel.UserName = user.UserName;
            authenticationModel.UserId = user.Id;
            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            authenticationModel.Roles = rolesList.ToList();


            if (user.RefreshTokens.Any(a => a.IsActive))
            {
                var activeRefreshToken = user.RefreshTokens.FirstOrDefault(a => a.IsActive == true);
                authenticationModel.RefreshToken = activeRefreshToken.Token;
                authenticationModel.RefreshTokenExpiration = activeRefreshToken.Expires;
            }
            else
            {
                var refreshToken = CreateRefreshToken();
                authenticationModel.RefreshToken = refreshToken.Token;
                authenticationModel.RefreshTokenExpiration = refreshToken.Expires;
                user.RefreshTokens.Add(refreshToken);
                _context.Update(user);
                await _context.SaveChangesAsync();
            }

            return authenticationModel;
        }
        authenticationModel.IsAuthenticated = false;
        authenticationModel.Message = $"Incorrect Credentials for user {user.Email}.";
        return authenticationModel;
    }

    private RefreshToken CreateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var generator = RandomNumberGenerator.Create();
        generator.GetBytes(randomNumber);
        return new RefreshToken
        {
            Token = Convert.ToBase64String(randomNumber),
            Expires = DateTime.UtcNow.AddDays(7),
            Created = DateTime.UtcNow
        };
    }

    private async Task<JwtSecurityToken> CreateJwtToken(ApplicationUser user, JWT jwtSettings)
    {
        var userClaims = await _userManager.GetClaimsAsync(user);
        var roles = await _userManager.GetRolesAsync(user);

        var roleClaims = roles.Select(t => new Claim("roles", t)).ToList();

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim("uid", user.Id)
        }
        .Union(userClaims)
        .Union(roleClaims);

        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Key));
        var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

        var jwtSecurityToken = new JwtSecurityToken(
            issuer: jwtSettings.Issuer,
            audience: jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(jwtSettings.DurationInMinutes),
            signingCredentials: signingCredentials);
        return jwtSecurityToken;
    }

    public async Task<string> AddRoleAsync(AddRoleModel model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return $"No Accounts Registered with {model.Email}.";
        }

        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return $"Incorrect Credentials for user {user.Email}.";
        }

        var roleExists = Enum.GetNames(typeof(Role)).Any(x => string.Equals(x, model.Role, StringComparison.CurrentCultureIgnoreCase));
            
        if (!roleExists)
        {
            return $"Role {model.Role} not found.";
        }
            
        var validRole = Enum.GetValues(typeof(Role)).Cast<Role>().FirstOrDefault(x => string.Equals(x.ToString(), model.Role, StringComparison.CurrentCultureIgnoreCase));
        await _userManager.AddToRoleAsync(user, validRole.ToString());
        return $"Added {model.Role} to user {model.Email}.";

    }

    public async Task<AuthenticationModel> RefreshTokenAsync(string token, JWT jwtSettings)
    {
        var authenticationModel = new AuthenticationModel();
        var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));
        if (user == null)
        {
            authenticationModel.IsAuthenticated = false;
            authenticationModel.Message = $"Token did not match any users.";
            return authenticationModel;
        }

        var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

        if (!refreshToken.IsActive)
        {
            authenticationModel.IsAuthenticated = false;
            authenticationModel.Message = $"Token Not Active.";
            return authenticationModel;
        }

        //Revoke Current Refresh Token
        refreshToken.Revoked = DateTime.UtcNow;

        //Generate new Refresh Token and save to Database
        var newRefreshToken = CreateRefreshToken();
        user.RefreshTokens.Add(newRefreshToken);
        _context.Update(user);
        await _context.SaveChangesAsync();

        //Generates new jwt
        authenticationModel.IsAuthenticated = true;
        var jwtSecurityToken = await CreateJwtToken(user, jwtSettings);
        authenticationModel.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        authenticationModel.Email = user.Email;
        authenticationModel.UserName = user.UserName;
        var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
        authenticationModel.Roles = rolesList.ToList();
        authenticationModel.RefreshToken = newRefreshToken.Token;
        authenticationModel.RefreshTokenExpiration = newRefreshToken.Expires;
        return authenticationModel;
    }
    public bool RevokeToken(string token)
    {
        var user = _context.Users.SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == token));

        // return false if no user found with token
        if (user == null) return false;

        var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

        // return false if token is not active
        if (!refreshToken.IsActive) return false;

        // revoke token and save
        refreshToken.Revoked = DateTime.UtcNow;
        _context.Update(user);
        _context.SaveChanges();

        return true;
    }

    public ApplicationUser GetById(string id)
    {
        return _context.Users.Find(id);
    }

    public async Task<string> GetUserIdByNameAsync(string username)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
        return user.Id;
    }

    public async Task<string> GetUserPreferences(string id, int fit = (int)UserPreferenceFit.Good) 
    {
        if (fit == (int)UserPreferenceFit.Default)
        {
            return GetDefaultPreferences();
        }
        
        var pref = _context.UserPreferences.Where(x => x.UserId == id)
            ?.OrderByDescending(y => y.Version)
            .Where(x => x.Fit == (UserPreferenceFit)fit)?.FirstOrDefault()
            ?.PreferencesJson ?? "{}";

        return pref;
    }

    public string GetDefaultPreferences()
    {
        var settingsObject = new JsonObject();
        var settings = _context.Settings.Where(x => x.Type == (int)SettingType.Css);
        foreach (var setting in settings)
        {
            settingsObject[setting.Name] = setting.DefaultValue;
        }

        return JsonSerializer.Serialize(settingsObject);

    }

    public async Task<bool> SetUserPreferences(string userId, string preferences, NavbarLocation navbarLocation, 
        UserPreferenceFit fit, string pageSelector)
    {
        var userPreferences = new UserPreference
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            PreferencesJson = preferences,
            NavbarLocation = navbarLocation,
            Version = GetUserPreferencesMaxVersion(userId, fit) + 1,
            Fit = fit,
            PageSelector = pageSelector
        };
        
        try
        {
            _context.Add(userPreferences);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            // TODO: Improve error handling
            return false;
        }
    }

    public bool IsUserSameAsInToken(string? userId, string userIdInToken)
    {
        if (userId is null)
        {
            return false;
        }

        return userId == userIdInToken;
    }

    public async Task<bool> SaveRating(string userId, int rating, string reason, UserPreferenceFit fit)
    {
        var userRating = new UserRating()
        {
            Id = new Guid(),
            UserId = userId,
            Rating = rating,
            Reason = reason,
            Timestamp = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
            UserPreferenceVersion = GetUserPreferencesMaxVersion(userId, fit),
            UserPreferenceFit = (int)fit
        };
        
        try
        {
            _context.Add(userRating);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            // TODO: Improve error handling
            return false;
        }
    }
    
    private int GetUserPreferencesMaxVersion(string userId, UserPreferenceFit fit)
    {
        var preferences = _context.UserPreferences
            .Where(x => x.ApplicationUser.Id == userId && x.Fit == fit).ToList();
        
        return preferences.Any() ? preferences.Max(x => x.Version) : 0;
    }

    public NavbarLocation GetNavBarLocationPreference(string userId, UserPreferenceFit fit)
    {
        return _context.UserPreferences
            .FirstOrDefault(x => x.ApplicationUser.Id == userId
                        && x.Fit == fit
                        && x.Version == GetUserPreferencesMaxVersion(userId, fit))?
            .NavbarLocation ?? NavbarLocation.Top;
    }
    
    public string GetPageSelectorPreference(string userId, UserPreferenceFit fit)
    {
        return _context.UserPreferences
            .FirstOrDefault(x => x.ApplicationUser.Id == userId
                                 && x.Fit == fit
                                 && x.Version == GetUserPreferencesMaxVersion(userId, fit))?
            .PageSelector ?? "numbers";
    }

    public string GetComponentPreference(string userId, string component, UserPreferenceFit fit)
    {
        var userPreference = _context.UserPreferences
            .FirstOrDefault(x => x.ApplicationUser.Id == userId
                                 && x.Fit == fit
                                 && x.Version == GetUserPreferencesMaxVersion(userId, fit));

        switch (component.ToLower())
        {
            case "style":
                if (fit == UserPreferenceFit.Default)
                {
                    return GetDefaultPreferences();
                }

                return userPreference?.PreferencesJson ?? "{}";
                break;
            case "navbar":
                if (fit == UserPreferenceFit.Default)
                {
                    return "top";
                }
                return (userPreference?.NavbarLocation ?? NavbarLocation.Top).ToString();
            case "pageselector":
                if (fit == UserPreferenceFit.Default)
                {
                    return "numbers";
                }
                return userPreference?.PageSelector ?? "numbers";
            default:
                return "";
        }
    }

    public UserPreferenceFit GetUserPreferenceFit(string userId)
    {
        return _context.Users.FirstOrDefault(x => x.Id == userId)?.PreferenceFit 
               ?? UserPreferenceFit.Default;
    }
    
    public async Task<bool> SetUserPreferenceFit(string userId, UserPreferenceFit fit)
    {
        try
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            if (user is null)
            {
                return false;
            }

            user.PreferenceFit = fit;
            _context.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            // TODO: Error handling
            return false;
        }
    }
    
    public async Task<bool> SaveBestSuitedVersionAsync(string userId, UserPreferenceFit fit)
    {
        try
        {
            var maxVersion = GetUserPreferencesMaxVersion(userId, fit);
            var existing = _context.BestSuitedAnswers.FirstOrDefault(x => x.UserId == userId && x.UserPreferenceVersion == maxVersion) ?? null;

            if (existing != null)
            {
                existing.UserPreferenceFit = (int)fit;
                _context.Update(existing);
            }
            else
            {
                var bestSuitedVersion = new UserBestSuitedAnswer()
                {
                    Id = new Guid(),
                    UserId = userId,
                    Timestamp = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc),
                    UserPreferenceVersion = maxVersion,
                    UserPreferenceFit = (int)fit
                };
                _context.Add(bestSuitedVersion);
            }
            
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            // TODO: Improve error handling
            return false;
        }
    }
    
    public async Task<bool> HasUserDonePersonalizationQuiz(string userId)
    {
        return await _context.UserPreferences.AnyAsync(x => x.UserId == userId);
    }

    public async Task<bool> SaveUserAnswers(string userId, JsonObject answers)
    {
        try
        {
            var userAnswer = new UserAnswer()
            {
                Id = new Guid(),
                UserId = userId,
                Answers = JsonSerializer.Serialize(answers),
                Version = GetUserPreferencesMaxVersion(userId, UserPreferenceFit.Good)
            };

            _context.UserAnswers.Add(userAnswer);
            await _context.SaveChangesAsync();

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }

    public async Task<JsonObject> GetUserAnswers(string userId)
    {
        try
        {
            var maxVersion = GetUserPreferencesMaxVersion(userId, UserPreferenceFit.Good);
        
            var answers = _context.UserAnswers.FirstOrDefault(x => 
                    x.UserId == userId && 
                    x.Version == maxVersion)
                ?.Answers ?? "";
        
            var ansObj = JsonNode.Parse(answers);
            var keys = _context.PersonalizationQuestions.Select(x => x.Name).ToList();

            var returnable = new JsonObject();

            foreach (var key in keys)
            {
                var obj = ansObj?[key]?.ToString() ?? "";
                var question = _context.PersonalizationQuestions.FirstOrDefault(x => x.Name == key);
                var questionName = question?.Text ?? "";
                var questionAnswer = _context.PersonalizationQuestionAnswers.FirstOrDefault(x => x.QuestionId == question.Id && x.Name == obj)?.Text ?? "";
                returnable.Add(questionName, questionAnswer);
            }

            return returnable;
        }
        catch (Exception ex)
        {
            return new JsonObject();
        }
    }
}


