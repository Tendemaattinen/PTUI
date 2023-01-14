using System.ComponentModel.DataAnnotations;
using PTUI.Core.Model;

namespace PTUI.Core.Entities;

public class UserBestSuitedAnswer
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string UserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public DateTime Timestamp { get; set; }
    public int UserPreferenceVersion { get; set; }
    public int UserPreferenceFit { get; set; }
}