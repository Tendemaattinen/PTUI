using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;

namespace PTUI.Core.Entities;

public class SettingValue
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Value { get; set; }
    [Required]
    public Guid SettingId { get; set; }
    public Setting Setting { get; set; }
    
    public SettingValue(string name, string value, Guid settingId)
    {
        Id = new Guid();
        Name = name;
        Value = value;
        SettingId = settingId;
    }
}