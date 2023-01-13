namespace PTUI.Core.Model;

public class HSLColor
{
    public int Hue { get; set; }
    public int Saturation { get; set; }
    public int Lightness { get; set; }
    public int Alpha { get; set; }

    public HSLColor()
    {
        Hue = 0;
        Saturation = 100;
        Lightness = 100;
        Alpha = 1;
    }

    public string GetValue()
    {
        return $"hsla({Hue},{Saturation}%,{Lightness}%,{Alpha})";
    }
}