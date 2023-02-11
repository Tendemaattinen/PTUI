using PTUI.Core.Enums;

namespace PTUI.Core.Services;

public class HelperService
{
    public NavbarLocation GetNavbarLocationEnum(string location)
    {
        return location switch
        {
            "top" => NavbarLocation.Top,
            "left" => NavbarLocation.Left,
            "right" => NavbarLocation.Right,
            _ => NavbarLocation.Top
        };
    }
}