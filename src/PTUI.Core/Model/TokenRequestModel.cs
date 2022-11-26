using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PTUI.Core.Models;

public class TokenRequestModel
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}
