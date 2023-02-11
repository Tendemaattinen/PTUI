using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PTUI.Core.Entities;

public class PersonalizationQuestionAnswer
{
    [Required] [Key] public Guid Id { get; set; }
    [Required] public Guid QuestionId { get; set; }

    [Required]
    [JsonIgnore]
    public PersonalizationQuestion Question { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Text { get; set; }
    public string? Image { get; set; }
    public IList<DynamicPersonalization> DynamicPersonalizations { get; set; }
    
}