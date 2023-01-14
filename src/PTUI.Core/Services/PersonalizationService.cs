using System.Text.Json.Nodes;
using Microsoft.EntityFrameworkCore;
using PTUI.Core.Context;
using PTUI.Core.Entities;
using PTUI.Core.Enums;
using PTUI.Core.Interfaces;
using PTUI.Core.Model;

namespace PTUI.Core.Services;

public class PersonalizationService: IPersonalizationService
{
    private readonly ApplicationDbContext _context;
    
    public PersonalizationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<PersonalizationQuestion>> GetPersonalizationQuestions()
    {
        return await _context.PersonalizationQuestions.Include(x => x.Answers).ToListAsync();
    }

    public async Task<CalculatedPersonalizationModel> CalculatePersonalization(string userId, JsonObject answerObject)
    {
        var calculatedPersonalizationModel = new CalculatedPersonalizationModel();
        var cssSettingsList = new List<KeyValuePair<UserPreferenceFit, JsonObject>>();
        var navbarList = new List<KeyValuePair<UserPreferenceFit, NavbarLocation>>();
        var pageSelectorList = new List<KeyValuePair<UserPreferenceFit, string>>();
        var settingsObjGood = new JsonObject();
        var settingsObjAverage = new JsonObject();
        var settingsObjBad = new JsonObject();

        var bgBest = new HSLColor();
        var bgAverage = new HSLColor();
        var bgWorst = new HSLColor();
        
        // background color
        switch (answerObject["color"]?.ToString() ?? "")
        {
            case "red":
                bgBest.Hue = 0;
                bgAverage.Hue = 120;
                bgWorst.Hue = 240;
                break;
            case "blue":
                bgBest.Hue = 240;
                bgAverage.Hue = 120;
                bgWorst.Hue = 0;
                break;
            case "green":
                bgBest.Hue = 120;
                bgAverage.Hue = 240;
                bgWorst.Hue = 0;
                break;
            default:
                break;
        }
        
        switch (answerObject["saturation"]?.ToString() ?? "")
        {
            case "colorful":
                bgBest.Lightness = 50;
                bgAverage.Lightness = 70;
                bgWorst.Lightness = 80;
                break;
            case "medium":
                bgBest.Lightness = 70;
                bgAverage.Lightness = 80;
                bgWorst.Lightness = 50;
                break;
            case "colorless":
                bgBest.Lightness = 80;
                bgAverage.Lightness = 70;
                bgWorst.Lightness = 50;
                break;
            default:
                break;
        }

        settingsObjGood["bg-color"] = bgBest.GetValue();
        settingsObjAverage["bg-color"] = bgAverage.GetValue();
        settingsObjBad["bg-color"] = bgWorst.GetValue();
        
        // font
        switch (answerObject["font"]?.ToString() ?? "")
        {
            case "arial":
                settingsObjGood["font-family"] = "arial";
                settingsObjAverage["font-family"] = "helvetica";
                settingsObjBad["font-family"] = "times";
                break;
            case "helvetica":
                settingsObjGood["font-family"] = "helvetica";
                settingsObjAverage["font-family"] = "arial";
                settingsObjBad["font-family"] = "times";
                break;
            case "times":
                settingsObjGood["font-family"] = "times";
                settingsObjAverage["font-family"] = "helvetica";
                settingsObjBad["font-family"] = "arial";
                break;
            default:
                settingsObjGood["font-family"] = "arial";
                settingsObjAverage["font-family"] = "helvetica";
                settingsObjBad["font-family"] = "times";
                break;
        }
        
        // font size
        switch (answerObject["font-size"]?.ToString() ?? "")
        {
            case "small":
                settingsObjGood["font-size-multiplier"] = 0.75;
                settingsObjAverage["font-size-multiplier"] = 1;
                settingsObjBad["font-size-multiplier"] = 1.25;
                break;
            case "default":
                settingsObjGood["font-size-multiplier"] = 1;
                settingsObjAverage["font-size-multiplier"] = 0.75;
                settingsObjBad["font-size-multiplier"] = 1.25;
                break;
            case "big":
                settingsObjGood["font-size-multiplier"] = 1.25;
                settingsObjAverage["font-size-multiplier"] = 1;
                settingsObjBad["font-size-multiplier"] = 0.75;
                break;
            default:
                settingsObjGood["font-size-multiplier"] = 1;
                settingsObjAverage["font-size-multiplier"] = 0.75;
                settingsObjBad["font-size-multiplier"] = 1.25;
                break;
        }
        
        // navbar location
        switch (answerObject["navbar-location"]?.ToString() ?? "")
        {
            case "top":
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Good, NavbarLocation.Top));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Average, NavbarLocation.Left));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Bad, NavbarLocation.Right));
                break;
            case "right":
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Good, NavbarLocation.Right));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Average, NavbarLocation.Left));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Bad, NavbarLocation.Top));
                break;
            case "left":
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Good, NavbarLocation.Left));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Average, NavbarLocation.Right));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Bad, NavbarLocation.Top));
                break;
            default:
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Good, NavbarLocation.Top));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Average, NavbarLocation.Left));
                navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Bad, NavbarLocation.Right));;
                break;
        }
        
        // page selector
        switch (answerObject["page-selector-type"]?.ToString() ?? "")
        {
            case "command-line":
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Good, "command-line"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Average, "numbers"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Bad, "radio"));
                break;
            case "numbers":
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Good, "numbers"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Average, "radio"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Bad, "command-line"));
                break;
            case "arrows":
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Good, "arrows"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Average, "numbers"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Bad, "command-line"));
                break;
            case "dropdown":
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Good, "dropdown"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Average, "radio"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Bad, "arrows"));
                break;
            case "radio":
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Good, "radio"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Average, "dropdown"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Bad, "command-line"));
                break;
            default:
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Good, "numbers"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Average, "radio"));
                pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Bad, "command-line"));
                break;
        }
        
        // text color
        switch (answerObject["text-color"]?.ToString() ?? "")
        {
            case "black":
                settingsObjGood["text-color"] = "black";
                settingsObjAverage["text-color"] = "gray";
                settingsObjBad["text-color"] = "white";
                break;
            case "white":
                settingsObjGood["text-color"] = "white";
                settingsObjAverage["text-color"] = "gray";
                settingsObjBad["text-color"] = "black";
                break;
            default:
                settingsObjGood["text-color"] = "black";
                settingsObjAverage["text-color"] = "gray";
                settingsObjBad["text-color"] = "white";
                break;
        }
        

        cssSettingsList.Add(new KeyValuePair<UserPreferenceFit, JsonObject>(UserPreferenceFit.Good, settingsObjGood));
        cssSettingsList.Add(new KeyValuePair<UserPreferenceFit, JsonObject>(UserPreferenceFit.Average, settingsObjAverage));
        cssSettingsList.Add(new KeyValuePair<UserPreferenceFit, JsonObject>(UserPreferenceFit.Bad, settingsObjBad));

        calculatedPersonalizationModel.StyleObjectList = cssSettingsList;
        calculatedPersonalizationModel.NavBarObjectList = navbarList;
        calculatedPersonalizationModel.PageSelectorObjectList = pageSelectorList;
        
        return calculatedPersonalizationModel;
    }
}