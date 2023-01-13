using System.Text.Json.Nodes;
using PTUI.Core.Entities;
using PTUI.Core.Enums;
using PTUI.Core.Model;

namespace PTUI.Core.Interfaces;

public interface IPersonalizationService
{
    Task<IEnumerable<PersonalizationQuestion>> GetPersonalizationQuestions();
    Task<CalculatedPersonalizationModel> CalculatePersonalization(string userId, JsonObject answerObject);
}