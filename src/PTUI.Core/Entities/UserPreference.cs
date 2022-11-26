using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;

namespace PTUI.Core.Model;

public class UserPreference
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    [Required]
    public string UserId { get; set; }
    public string PreferencesJson { get; set; }
    public NavbarLocation NavbarLocation { get; set; }
}