using System.ComponentModel.DataAnnotations;

namespace PTUI.Core.Entities;

public class UserAnswer
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string UserId { get; set; }
    [Required]
    public string Answers { get; set; }
    public int? Version { get; set; }
}
