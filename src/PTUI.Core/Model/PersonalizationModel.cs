using System.ComponentModel.DataAnnotations;

namespace PTUI.Core.Model;

public class PersonalizationModel
{
    [Required]
    public string Username { get; set; }
    public string Interface { get; set; }
    public string Os { get; set; }
    public string Time { get; set; }
    public string Element { get; set; }
    public string ColorCharacter { get; set; }
    public string Eyesight { get; set; }
    public string Font { get; set; }
}