using System.Text.Json.Nodes;
using PTUI.Core.Enums;

namespace PTUI.Core.Model;

public class CalculatedPersonalizationModel
{
    public List<KeyValuePair<UserPreferenceFit, JsonObject>> StyleObjectList { get; set; }
    public List<KeyValuePair<UserPreferenceFit,NavbarLocation>> NavBarObjectList { get; set; }
    public List<KeyValuePair<UserPreferenceFit,string>> PageSelectorObjectList { get; set; }
}