using PTUI.Core.Entities;
using PTUI.Core.Enums;
using PTUI.Core.Model;
using PTUI.Core.Models;

namespace PTUI.Core.Interfaces;

public interface IUserService
{
    Task<(bool, string)> RegisterAsync(RegisterModel model);
    Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model, JWT jwtSettings);
    Task<string> AddRoleAsync(AddRoleModel model);

    Task<AuthenticationModel> RefreshTokenAsync(string jwtToken, JWT jwtSettings);

    bool RevokeToken(string token);
    ApplicationUser GetById(string id);

    Task<string> GetUserPreferences(string id, int fit = (int)UserPreferenceFit.Good);
    Task <bool> SetUserPreferences(string userId, string preferences, NavbarLocation navbarLocation, 
        UserPreferenceFit fit, string pageSelector);
    bool IsUserSameAsInToken(string? userId, string userIdInToken);
    Task<bool> SaveRating(string userId, int rating, string reason, UserPreferenceFit fit);
    NavbarLocation GetNavBarLocationPreference(string userId, UserPreferenceFit fit);
    string GetPageSelectorPreference(string userId, UserPreferenceFit fit);
    Task<string> GetUserIdByNameAsync(string username);
    string GetComponentPreference(string userId, string component, UserPreferenceFit fit);
    UserPreferenceFit GetUserPreferenceFit(string userId);
    Task<bool> SetUserPreferenceFit(string userId, UserPreferenceFit fit);
    Task<bool> SaveBestSuitedVersionAsync(string userId, UserPreferenceFit fit);
    string GetDefaultPreferences();
}