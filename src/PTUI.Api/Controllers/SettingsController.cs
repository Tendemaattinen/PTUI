using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PTUI.Api.Settings;
using PTUI.Core.Interfaces;
using PTUI.Core.Entities;
using PTUI.Core.Model;
using PTUI.Core.Models;
using Microsoft.AspNet.Identity;

namespace PTUI.Api.Controllers;

[ApiController]
public class SettingsController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ISettingsService _settingsService;

    public SettingsController(IUserService userService, ISettingsService settingsService)
    {
        _userService = userService;
        _settingsService = settingsService;
    }

    [HttpGet("settings")]
    public async Task<IActionResult> Get([FromQuery] string? type)
    {

        var settings = await _settingsService.GetSettings(type);
        var settingDtos = new List<SettingsModel>();
        foreach (var setting in settings)
        {
            var settingDto = new SettingsModel()
            {
                Id = setting.Id,
                Name = setting.Name,
                Definition = setting.Definition,
                Type = (int)setting.Type,
                Values = new List<SettingValueModel>()
            };

            foreach (var value in setting.Values)
            {
                var valueDto = new SettingValueModel()
                {
                    Id = value.Id,
                    Name = value.Name,
                    Value = value.Value
                };
                
                settingDto.Values.Add(valueDto);
            }
            settingDtos.Add(settingDto);
        }

        return Ok(settingDtos);
    }

    [HttpGet("settings/{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        Console.WriteLine(id);
        return Accepted();
    }
}