using System.ComponentModel.DataAnnotations;

namespace PTUI.Core.Model;

public class PersonalizationModel2
{
    [Required]
    public string UserId { get; set; }
    public string Answers { get; set; }
}