using System.ComponentModel.DataAnnotations;

namespace PTUI.Core.Entities;

public class PersonalizationQuestion
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Text { get; set; }
    public IList<PersonalizationQuestionAnswer> Answers { get; set; }
}