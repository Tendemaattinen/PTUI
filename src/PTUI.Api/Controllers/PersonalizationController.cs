using System.Text.Json;
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
        var answersObject = JsonNode.Parse(model.Answers)!.AsObject();
        var calculatedPersonalizationModel =
            await _personalizationService.CalculateDynamicPersonalization(model.UserId,
                answersObject);
        
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

        await _userService.SaveUserAnswers(userId, answersObject);
        
        return Ok(model);
    }

    [HttpGet("personalizationQuestion")]
    [Authorize]
    public async Task<IActionResult> GetPersonalizationQuestions()
    {
        var questions = await _personalizationService.GetPersonalizationQuestions();
        return Ok(questions);
    }
}