using Microsoft.AspNetCore.Identity;
using PTUI.Core.Entities;
using PTUI.Core.Enums;

namespace PTUI.Core.Model;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public IList<RefreshToken> RefreshTokens { get; set; }
    public IList<UserRating> Ratings { get; set; }
    public IList<UserBestSuitedAnswer> BestSuitedAnswers { get; set; }
    public IList<UserPreference> UserPreferences { get; set; }
    public UserPreferenceFit PreferenceFit { get; set; }
}