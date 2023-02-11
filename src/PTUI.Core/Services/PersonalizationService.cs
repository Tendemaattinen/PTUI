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
    private readonly HelperService _helperService;
    
    public PersonalizationService(ApplicationDbContext context, HelperService helperService)
    {
        _context = context;
        _helperService = helperService;
    }

    public async Task<IEnumerable<PersonalizationQuestion>> GetPersonalizationQuestions()
    {
        return await _context.PersonalizationQuestions.Include(x => x.Answers).ToListAsync();
    }

    public async Task<CalculatedPersonalizationModel> CalculateDynamicPersonalization(string userId,
        JsonObject answerObject)
    {
        var calculatedPersonalizationModel = new CalculatedPersonalizationModel();
        var cssSettingsList = new List<KeyValuePair<UserPreferenceFit, JsonObject>>();
        var navbarList = new List<KeyValuePair<UserPreferenceFit, NavbarLocation>>();
        var pageSelectorList = new List<KeyValuePair<UserPreferenceFit, string>>();
        var settingsObjGood = new JsonObject();
        var settingsObjAverage = new JsonObject();
        var settingsObjBad = new JsonObject();
        var colorsList = new List<KeyValuePair<string, ColorVersions>>();

        // Get all dynamic personalization
        var dynamicPersonalizationList = await _context.DynamicPersonalizations
            .Include(x => x.Answer)
            .Include(y => y.Answer.Question)
            .ToListAsync();

        // Loop through answers
        foreach (var answer in answerObject)
        {
            var personalization = dynamicPersonalizationList.FirstOrDefault(x =>
                x.Answer.Question.Name == answer.Key && x.Answer.Name == answer.Value.ToString());

            if (personalization == null)
            {
                continue;
            }
            
            switch (personalization.Type)
            {
                case "css":
                    switch (personalization.SubType)
                    {
                        case "color":
                            if (colorsList.FirstOrDefault(x => x.Key == personalization.Target).Value is null)
                            {
                                var colorVersion = new ColorVersions
                                {
                                    Best = new HSLColor
                                    {
                                        Hue = 0, Saturation = 0, Lightness = 70
                                    },
                                    Average = new HSLColor
                                    {
                                        Hue = 0, Saturation = 0, Lightness = 70
                                    },
                                    Worst = new HSLColor
                                    {
                                        Hue = 0, Saturation = 0, Lightness = 70
                                    }
                                };
                                colorsList.Add(new KeyValuePair<string, ColorVersions>(personalization.Target, colorVersion));
                            }
                            
                            var color = colorsList.FirstOrDefault(x => x.Key == personalization.Target).Value;
                            
                            switch (personalization.SubSubType)
                            {
                                case "hue":
                                    color.Best.Hue = int.Parse(personalization.BestValue);
                                    color.Average.Hue = int.Parse(personalization.AverageValue);
                                    color.Worst.Hue = int.Parse(personalization.WorstValue);
                                    break;
                                case "saturation":
                                    color.Best.Saturation = int.Parse(personalization.BestValue);
                                    color.Average.Saturation = int.Parse(personalization.AverageValue);
                                    color.Worst.Saturation = int.Parse(personalization.WorstValue);
                                    break;
                                case "lightness":
                                    color.Best.Lightness = int.Parse(personalization.BestValue);
                                    color.Average.Lightness = int.Parse(personalization.AverageValue);
                                    color.Worst.Lightness = int.Parse(personalization.WorstValue);
                                    break;
                                default:
                                    break;
                            }
                            break;
                        default:
                            settingsObjGood[personalization.Target] = personalization.BestValue;
                            settingsObjAverage[personalization.Target] = personalization.AverageValue;
                            settingsObjBad[personalization.Target] = personalization.WorstValue;
                            break;
                    }
                    break;
                case "navbar":
                    navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Good,
                        _helperService.GetNavbarLocationEnum(personalization.BestValue)));
                    navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Average,
                        _helperService.GetNavbarLocationEnum(personalization.AverageValue)));
                    navbarList.Add(new KeyValuePair<UserPreferenceFit, NavbarLocation>(UserPreferenceFit.Bad,
                        _helperService.GetNavbarLocationEnum(personalization.WorstValue)));
                    break;
                case "pageSelector":
                    pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Good,
                        personalization.BestValue));
                    pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Average,
                        personalization.AverageValue));
                    pageSelectorList.Add(new KeyValuePair<UserPreferenceFit, string>(UserPreferenceFit.Bad,
                        personalization.WorstValue));
                    break;
                default:
                    break;
            }
        }
        
        // Colors are special case, they are added later than other objects
        foreach (var color in colorsList)
        {
            settingsObjGood[color.Key] = color.Value.Best.GetValue();
            settingsObjAverage[color.Key] = color.Value.Average.GetValue();
            settingsObjBad[color.Key] = color.Value.Worst.GetValue();
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