using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;

namespace PTUI.Core.Model;

public class BestSuitedAnswerModel
{
    [Required]
    public string UserId { get; set; }
    [Required]
    public string BestSuitedVersion { get; set; }
}