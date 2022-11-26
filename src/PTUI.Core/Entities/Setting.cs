using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;
using PTUI.Core.Model;

namespace PTUI.Core.Entities;

public class Setting
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    [Required]
    public string Name { get; set; }
    //public string DefaultValue { get; set; }
    public string Definition { get; set; }
    public SettingType Type { get; set; }
    public IList<SettingValue> Values { get; set; }

    public Setting(string name, string definition, SettingType type)
    {
        Id = new Guid();
        Name = name;
        Definition = definition;
        Type = type;
    }
}