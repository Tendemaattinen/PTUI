using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTUI.Core.Models;

public class SettingValueModel
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Value { get; set; }
    public Guid SettingId { get; set; }
}