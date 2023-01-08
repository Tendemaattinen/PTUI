using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;

namespace PTUI.Core.Model;

public class PreferenceFitPostModel
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public UserPreferenceFit Fit { get; set; }
}