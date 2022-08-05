using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PTUI.Core.Model;

namespace PTUI.Core.Context;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    private readonly IConfiguration configuration;
    //public DbSet<ApplicationUser> ApplicationUsers { get; set; }
    

    public ApplicationDbContext(IConfiguration _configuration)
    {
        configuration = _configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        // connect to postgres with connection string from app settings
        options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"));
    }
    
    
}