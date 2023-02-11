using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PTUI.Core.Entities;
using PTUI.Core.Model;

namespace PTUI.Core.Context;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    private readonly IConfiguration _configuration;
    //public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    public DbSet<UserPreference> UserPreferences { get; set; }
    public DbSet<Setting> Settings { get; set; }
    public DbSet<UserRating> UserRatings { get; set; }
    public DbSet<SettingValue> SettingValues { get; set; }
    public DbSet<DefaultSetting> DefaultSettings { get; set; }
    public DbSet<PersonalizationQuestion> PersonalizationQuestions { get; set; }
    public DbSet<PersonalizationQuestionAnswer> PersonalizationQuestionAnswers { get; set; }
    public DbSet<UserBestSuitedAnswer> BestSuitedAnswers { get; set; }
    public DbSet<DynamicPersonalization> DynamicPersonalizations { get; set; }


    public ApplicationDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to postgres with connection string from app settings
        options.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
    }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<UserPreference>()
            .HasOne(ur => ur.ApplicationUser)
            .WithMany(au => au.UserPreferences)
            .HasForeignKey(ur => ur.UserId);
        
        modelBuilder.Entity<UserRating>()
            .HasOne(ur => ur.ApplicationUser)
            .WithMany(au => au.Ratings)
            .HasForeignKey(ur => ur.UserId);
        
        modelBuilder.Entity<UserBestSuitedAnswer>()
            .HasOne(u => u.ApplicationUser)
            .WithMany(au => au.BestSuitedAnswers)
            .HasForeignKey(u => u.UserId);

        modelBuilder.Entity<SettingValue>()
            .HasOne(sv => sv.Setting)
            .WithMany(s => s.Values)
            .HasForeignKey(sv => sv.SettingId);
        
        modelBuilder.Entity<PersonalizationQuestionAnswer>()
            .HasOne(pqa => pqa.Question)
            .WithMany(pq => pq.Answers)
            .HasForeignKey(pqa => pqa.QuestionId);
        
        modelBuilder.Entity<DynamicPersonalization>()
            .HasOne(dp => dp.Answer)
            .WithMany(a => a.DynamicPersonalizations)
            .HasForeignKey(da => da.AnswerId);

        base.OnModelCreating(modelBuilder);
    }
    
    
}