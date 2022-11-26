using PTUI.Core.Entities;
using PTUI.Core.Model;
using PTUI.Core.Models;

namespace PTUI.Core.Interfaces;

public interface ISettingsService
{
    Task<List<Setting>> GetSettings(string? type);
}