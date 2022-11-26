using System.ComponentModel.DataAnnotations;
using PTUI.Core.Enums;

namespace PTUI.Core.Entities;

public class DefaultSetting
{
    [Required]
    [Key]
    public Guid Id { get; set; }
    [Required]
    public Guid SettingId { get; set; }
    public Setting Setting { get; set; }
    [Required]
    public Guid SettingValueId { get; set; }
    public SettingValue SettingValue { get; set; }
}