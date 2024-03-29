﻿using System.Text.Json;
using System.Text.Json.Nodes;
using Microsoft.AspNetCore.Mvc;
using PTUI.Core.Interfaces;
using PTUI.Core.Model;
using Microsoft.AspNet.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using PTUI.Core.Context;
using PTUI.Core.Enums;

namespace PTUI.Api.Controllers;

[ApiController]
public class PersonalizationController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ISettingsService _settingsService;
    private readonly IPersonalizationService _personalizationService;
    private readonly ApplicationDbContext _context;

    public PersonalizationController(IUserService userService, ISettingsService settingsService,
        IPersonalizationService personalizationService, ApplicationDbContext context)
    {
        _userService = userService;
        _settingsService = settingsService;
        _personalizationService = personalizationService;
        _context = context;
    }
    
    // TODO: Rename after testing
    [HttpPost("personalization2")]
    public async Task<IActionResult> Personalization2Async(PersonalizationModel2 model)
    {
        var calculatedPersonalizationModel =
            await _personalizationService.CalculatePersonalization(model.UserId,
                JsonObject.Parse(model.Answers)!.AsObject());
        
        var userId = await _userService.GetUserIdByNameAsync(model.UserId);
        
        // Save user settings
        // Good
        await _userService.SetUserPreferences(userId, 
            JsonSerializer.Serialize(calculatedPersonalizationModel.StyleObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Good).Value), 
            calculatedPersonalizationModel.NavBarObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Good).Value,
            UserPreferenceFit.Good,
            calculatedPersonalizationModel.PageSelectorObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Good).Value);
        // Average
        await _userService.SetUserPreferences(userId,
            JsonSerializer.Serialize(calculatedPersonalizationModel.StyleObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Average).Value), 
            calculatedPersonalizationModel.NavBarObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Average).Value,
            UserPreferenceFit.Average,
            calculatedPersonalizationModel.PageSelectorObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Average).Value);
        // Bad
        await _userService.SetUserPreferences(userId,
            JsonSerializer.Serialize(calculatedPersonalizationModel.StyleObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Bad).Value), 
            calculatedPersonalizationModel.NavBarObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Bad).Value,
            UserPreferenceFit.Bad,
            calculatedPersonalizationModel.PageSelectorObjectList.FirstOrDefault(x => x.Key == UserPreferenceFit.Bad).Value);

        return Ok(model);
    }

    [HttpPost("personalization")]
    public async Task<IActionResult> PersonalizationAsync(PersonalizationModel model)
    {

        var settingsObject = new JsonObject();

        if (model.Time.ToLower() == "day" && model.Element.ToLower() == "fire" && model.ColorCharacter.ToLower() == "colorful")
        {
            settingsObject["bg-color"] = "hsla(9, 80%, 41%, 1)";
            settingsObject["complementary-color"] = "hsla(51, 80%, 47%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
            
        }
        else if (model.Time.ToLower() == "day" && model.Element.ToLower() == "water" && model.ColorCharacter.ToLower() == "colorful")
        {
            settingsObject["bg-color"] = "hsla(218, 80%, 45%, 1)";
            settingsObject["complementary-color"] = "hsla(193, 80%, 45%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
        }
        else if (model.Time.ToLower() == "day" && model.Element.ToLower() == "earth" && model.ColorCharacter.ToLower() == "colorful")
        {
            settingsObject["bg-color"] = "hsla(111, 80%, 42%, 1)";
            settingsObject["complementary-color"] = "hsla(72, 80%, 42%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
        }
        
        else if (model.Time.ToLower() == "day" && model.Element.ToLower() == "air" && model.ColorCharacter.ToLower() == "colorful")
        {
            settingsObject["bg-color"] = "hsla(184, 89%, 42%, 1)";
            settingsObject["complementary-color"] = "hsla(196, 89%, 42%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
        }
        
        else if (model.Time.ToLower() == "day" && model.Element.ToLower() == "fire" && model.ColorCharacter.ToLower() == "boring")
        {
            settingsObject["bg-color"] = "hsla(354, 89%, 73%, 1)";
            settingsObject["complementary-color"] = "hsla(60, 89%, 73%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
        }
        else if (model.Time.ToLower() == "day" && model.Element.ToLower() == "water" && model.ColorCharacter.ToLower() == "boring")
        {
            settingsObject["bg-color"] = "hsla(208, 89%, 77%, 1)";
            settingsObject["complementary-color"] = "hsla(208, 89%, 89%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
        }
        else if (model.Time.ToLower() == "day" && model.Element.ToLower() == "earth" && model.ColorCharacter.ToLower() == "boring")
        {
            settingsObject["bg-color"] = "hsla(150, 89%, 69%, 1)";
            settingsObject["complementary-color"] = "hsla(95, 89%, 69%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
        }
        
        else if (model.Time.ToLower() == "day" && model.Element.ToLower() == "air" && model.ColorCharacter.ToLower() == "boring")
        {
            settingsObject["bg-color"] = "hsla(176, 89%, 90%, 1)";
            settingsObject["complementary-color"] = "hsla(176, 89%, 85%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 0%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 0%, 1)";
        }
        
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "fire" && model.ColorCharacter.ToLower() == "colorful")
        {
            settingsObject["bg-color"] = "hsla(355, 89%, 10%, 1)";
            settingsObject["complementary-color"] = "hsla(51, 89%, 11%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 100%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 100%, 1)";
        }
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "water" && model.ColorCharacter.ToLower() == "colorful")
        {
            settingsObject["bg-color"] = "hsla(245, 100%, 10%, 1)";
            settingsObject["complementary-color"] = "hsla(192, 100%, 7%, 1)";
            settingsObject["text-color"] = "hsla(0, 100%, 100%, 1)";
            settingsObject["header-color"] = "hsla(0, 100%, 100%, 1)";
        }
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "earth" && model.ColorCharacter.ToLower() == "colorful")
        {
            
        }
        
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "air" && model.ColorCharacter.ToLower() == "colorful")
        {
            
        }
        
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "fire" && model.ColorCharacter.ToLower() == "boring")
        {
            
        }
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "water" && model.ColorCharacter.ToLower() == "boring")
        {
            
        }
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "earth" && model.ColorCharacter.ToLower() == "boring")
        {
            
        }
        
        else if (model.Time.ToLower() == "night" && model.Element.ToLower() == "air" &&
                 model.ColorCharacter.ToLower() == "boring")
        {

        }
        
        switch (model.Eyesight)
        {
            case "worst":
                settingsObject["font-size-multiplier"] = _context.Settings.Include(s => s.Values)
                    .FirstOrDefault(x => x.Name == "font-size-multiplier")
                    .Values.FirstOrDefault(y => y.Name.ToLower() == "biggest").Value;
                break;
            case "bad":
                settingsObject["font-size-multiplier"] = _context.Settings.Include(s => s.Values)
                    .FirstOrDefault(x => x.Name == "font-size-multiplier")
                        .Values.FirstOrDefault(y => y.Name.ToLower() == "bigger").Value;
                break;
            case "average":
                settingsObject["font-size-multiplier"] = _context.Settings.Include(s => s.Values)
                    .FirstOrDefault(x => x.Name == "font-size-multiplier")
                        .Values.FirstOrDefault(y => y.Name.ToLower() == "default").Value;
                break;
            case "good":
                settingsObject["font-size-multiplier"] = _context.Settings.Include(s => s.Values)
                    .FirstOrDefault(x => x.Name == "font-size-multiplier")
                        .Values.FirstOrDefault(y => y.Name.ToLower() == "small").Value;
                break;
            case "best":
                settingsObject["font-size-multiplier"] = _context.Settings.Include(s => s.Values)
                    .FirstOrDefault(x => x.Name == "font-size-multiplier")
                    .Values.FirstOrDefault(y => y.Name.ToLower() == "smaller").Value;
                break;
            default:
                settingsObject["font-size-multiplier"] = _context.Settings.Include(s => s.Values)
                    .FirstOrDefault(x => x.Name == "font-size-multiplier")
                        .Values.FirstOrDefault(y => y.Name.ToLower() == "default").Value;
                break;
        }
        
        // TODO: navbar logic and page selector login
        
        // TODO: Here set bad, average and good scenarios
        // How calculation is done (matrix?)

        var userId = await _userService.GetUserIdByNameAsync(model.Username);
        
        // Save user settings
        // Good
        await _userService.SetUserPreferences(userId, 
            JsonSerializer.Serialize(settingsObject), 
            NavbarLocation.Top,
            UserPreferenceFit.Good,
            "arrows");
        // Average
        await _userService.SetUserPreferences(userId,
            JsonSerializer.Serialize(settingsObject), 
            NavbarLocation.Left,
            UserPreferenceFit.Average,
            "numbers");
        // Bad
        await _userService.SetUserPreferences(userId,
            JsonSerializer.Serialize(settingsObject), 
            NavbarLocation.Right,
            UserPreferenceFit.Bad,
            "commandline");
        
        return Ok(settingsObject);
    }
    
    [HttpGet("personalizationQuestion")]
    [Authorize]
    public async Task<IActionResult> GetPersonalizationQuestions()
    {
        var questions = await _personalizationService.GetPersonalizationQuestions();
        return Ok(questions);
    }
}