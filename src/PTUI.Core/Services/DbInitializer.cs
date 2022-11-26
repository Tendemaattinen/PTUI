using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PTUI.Core.Interfaces;
using PTUI.Core.Entities;
using PTUI.Core.Enums;
using PTUI.Core.Model;
using PTUI.Core.Models;
using PTUI.Core.Context;


namespace PTUI.Core.Services;

public class DbInitializer
{
    public static async Task<bool> InitializeSettings(ApplicationDbContext context)
    {

        if (context.Settings.Any())
        {
            return false;
        }
        
        context.Settings.Add(new Setting("bg-color", "background color", SettingType.Css));
        context.Settings.Add(new Setting("text-color", "color of texts", SettingType.Css));
        context.Settings.Add(new Setting("header-color", "color of headers", SettingType.Css));
        context.Settings.Add(new Setting("font-family", "font family", SettingType.Css));
        context.Settings.Add(new Setting("font-size-multiplier", "multiplier of default font size", SettingType.Css));
        context.Settings.Add(new Setting("navbar-location", "location of navbar", SettingType.Navbar));
        context.Settings.Add(new Setting("complementary-color", "complementary color", SettingType.Css));

        await context.SaveChangesAsync();
        return true;
    }
    
    public static async Task<bool> InitializeSettingValues(ApplicationDbContext context)
    {
        if (context.SettingValues.Any())
        {
            return false;
        }

        # region background color
        context.SettingValues.Add(new SettingValue("black", "black",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("white", "white",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("grey", "grey",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("light yellow", "hsla(61, 84%, 66%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("light blue", "hsla(225, 64%, 85%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("blue", "hsla(225, 33%, 48%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("light pink", "hsla(303, 67%, 84%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("pink", "hsla(326, 67%, 53%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "bg-color")!.Id));
        # endregion
        
        # region text color
        context.SettingValues.Add(new SettingValue("white", "white",
            context.Settings.FirstOrDefault(x => x.Name == "text-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("black", "black",
            context.Settings.FirstOrDefault(x => x.Name == "text-color")!.Id));
        # endregion
        
        # region header color
        context.SettingValues.Add(new SettingValue("white", "white",
            context.Settings.FirstOrDefault(x => x.Name == "header-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("black", "black",
            context.Settings.FirstOrDefault(x => x.Name == "header-color")!.Id));
        # endregion
        
        # region font family
        context.SettingValues.Add(new SettingValue("Arial", "arial",
            context.Settings.FirstOrDefault(x => x.Name == "font-family")!.Id));
        
        context.SettingValues.Add(new SettingValue("Verdana", "verdana",
            context.Settings.FirstOrDefault(x => x.Name == "font-family")!.Id));
        
        context.SettingValues.Add(new SettingValue("Tahoma", "tahoma",
            context.Settings.FirstOrDefault(x => x.Name == "font-family")!.Id));
        
        context.SettingValues.Add(new SettingValue("Georgia", "georgia",
            context.Settings.FirstOrDefault(x => x.Name == "font-family")!.Id));
        
        context.SettingValues.Add(new SettingValue("Sans-serif", "sans-serif",
            context.Settings.FirstOrDefault(x => x.Name == "font-family")!.Id));
        
        context.SettingValues.Add(new SettingValue("Times new roman", "times new roman",
            context.Settings.FirstOrDefault(x => x.Name == "font-family")!.Id));
        
        # endregion
        
        # region navbar location
        context.SettingValues.Add(new SettingValue("Top", "up",
            context.Settings.FirstOrDefault(x => x.Name == "navbar-location")!.Id));
        
        context.SettingValues.Add(new SettingValue("Left", "left",
            context.Settings.FirstOrDefault(x => x.Name == "navbar-location")!.Id));
        
        context.SettingValues.Add(new SettingValue("Right", "right",
            context.Settings.FirstOrDefault(x => x.Name == "navbar-location")!.Id));
        
        # endregion
        
        # region font size
        context.SettingValues.Add(new SettingValue("Smallest", "0.25",
            context.Settings.FirstOrDefault(x => x.Name == "font-size-multiplier")!.Id));
        
        context.SettingValues.Add(new SettingValue("Smaller", "0.5",
            context.Settings.FirstOrDefault(x => x.Name == "font-size-multiplier")!.Id));
        
        context.SettingValues.Add(new SettingValue("Small", "0.75",
            context.Settings.FirstOrDefault(x => x.Name == "font-size-multiplier")!.Id));
        
        context.SettingValues.Add(new SettingValue("Default", "1",
            context.Settings.FirstOrDefault(x => x.Name == "font-size-multiplier")!.Id));
        
        context.SettingValues.Add(new SettingValue("Big", "1.25",
            context.Settings.FirstOrDefault(x => x.Name == "font-size-multiplier")!.Id));
        
        context.SettingValues.Add(new SettingValue("Bigger", "1.5",
            context.Settings.FirstOrDefault(x => x.Name == "font-size-multiplier")!.Id));
        
        context.SettingValues.Add(new SettingValue("Biggest", "1.75",
            context.Settings.FirstOrDefault(x => x.Name == "font-size-multiplier")!.Id));
        
        # endregion
        
        # region complementary color
        context.SettingValues.Add(new SettingValue("black", "black",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("white", "white",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("grey", "grey",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("light yellow", "hsla(61, 84%, 66%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("light blue", "hsla(225, 64%, 85%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("blue", "hsla(225, 33%, 48%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("light pink", "hsla(303, 67%, 84%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        
        context.SettingValues.Add(new SettingValue("pink", "hsla(326, 67%, 53%, 1)",
            context.Settings.FirstOrDefault(x => x.Name == "complementary-color")!.Id));
        # endregion

        await context.SaveChangesAsync();


        return true;
    }
}