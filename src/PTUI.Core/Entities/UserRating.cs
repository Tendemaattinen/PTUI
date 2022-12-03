using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;

namespace PTUI.Core.Model;

public class UserRating
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string UserId { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
    public int Rating { get; set; }
    public string Reason { get; set; }
    public DateTime Timestamp { get; set; }
    public int UserPreferenceVersion { get; set; }
}