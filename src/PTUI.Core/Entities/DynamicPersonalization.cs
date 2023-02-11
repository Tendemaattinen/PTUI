using System.ComponentModel.DataAnnotations;

namespace PTUI.Core.Entities;

public class DynamicPersonalization
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    public Guid AnswerId { get; set; }
    public PersonalizationQuestionAnswer Answer { get; set; }
    public string Type { get; set; }
    public string? SubType { get; set; }
    public string? SubSubType { get; set; }
    public string? Target { get; set; }
    public string BestValue { get; set; }
    public string AverageValue { get; set; }
    public string WorstValue { get; set; }
}