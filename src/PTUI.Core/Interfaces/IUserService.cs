using PTUI.Core.Entities;
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

    Task<string> GetUserPreferences(string id);
    Task <bool> SetUserPreferences(string userId, string preferences, int navbarLocation);
    bool IsUserSameAsInToken(string? userId, string userIdInToken);
    Task<bool> SaveRating(string userId, int rating, string reason);
}