using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PTUI.Core.Interfaces;
using PTUI.Core.Entities;
using PTUI.Core.Enums;
using PTUI.Core.Model;
using PTUI.Core.Models;
using PTUI.Core.Context;


namespace PTUI.Core.Services;

public class SettingsService : ISettingsService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _context;

    public SettingsService(UserManager<ApplicationUser> userManager, ApplicationDbContext context)
    {
        _userManager = userManager;
        _context = context;
    }
    
    public async Task<List<Setting>> GetSettings(string? type)
    {
        if (type != null)
        {
            if (int.TryParse(type, out var typeInt))
            {
                var list = await _context.Settings.Where(x => x.Type == (SettingType)typeInt).Include(s => s.Values)
                    .ToListAsync();
                return list;
            }
        }
        return await _context.Settings.Include(s => s.Values).ToListAsync();
    }
}