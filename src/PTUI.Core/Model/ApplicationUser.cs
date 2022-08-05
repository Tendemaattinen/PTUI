using Microsoft.AspNetCore.Identity;
using PTUI.Core.Entities;

namespace PTUI.Core.Model;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public List<RefreshToken> RefreshTokens { get; set; }
}