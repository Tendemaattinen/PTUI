using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTUI.Core.Models;

public class SettingsModel
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Definition { get; set; }
    public int Type { get; set; }
    public IList<SettingValueModel> Values { get; set; }
}