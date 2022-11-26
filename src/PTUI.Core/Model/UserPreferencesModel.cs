using System.ComponentModel.DataAnnotations;

namespace PTUI.Core.Model;

public class UserPreferencesModel
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public string Preferences { get; set; }
    public int NavbarLocation { get; set; }
}