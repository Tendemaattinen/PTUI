using PTUI.Core.Entities;
using PTUI.Core.Model;
using PTUI.Core.Models;

namespace PTUI.Core.Interfaces;

public interface IUserService
{
    Task<string> RegisterAsync(RegisterModel model);
    Task<AuthenticationModel> GetTokenAsync(TokenRequestModel model, JWT jwtSettings);
    Task<string> AddRoleAsync(AddRoleModel model);

    Task<AuthenticationModel> RefreshTokenAsync(string jwtToken, JWT jwtSettings);

    bool RevokeToken(string token);
    ApplicationUser GetById(string id);
}