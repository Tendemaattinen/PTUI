using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;

namespace PTUI.Core.Model;

public class RatingPostModel
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public string Rating { get; set; }
    public string Reason { get; set; }
    public UserPreferenceFit Fit { get; set; }
}