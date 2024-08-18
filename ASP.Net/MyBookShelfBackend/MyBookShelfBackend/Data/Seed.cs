using Microsoft.AspNetCore.Identity;
using MyBookShelfBackend.Models;

namespace MyBookShelfBackend.Data
{
    public class Seed
    {
        public static async Task SeedUsersAndRoles(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                //roles
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                if (!await roleManager.RoleExistsAsync(Roles.Admin))
                    await roleManager.CreateAsync(new IdentityRole(Roles.Admin));
                if (!await roleManager.RoleExistsAsync(Roles.User))
                    await roleManager.CreateAsync(new IdentityRole(Roles.User));

                //users
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<Users>>();
                var adminUserEmail = "Aleksandar@dev.com";

                var adminUser = await userManager.FindByEmailAsync(adminUserEmail);
                if (adminUser == null)
                {
                    var hashedPassword = BCrypt.Net.BCrypt.HashPassword("Aleksandar@1234");
                    
                    var newAdminUser = new Users()
                    {
                        UserName = "Aleksandardev",
                        Email = adminUserEmail,
                        EmailConfirmed = true,
                        PasswordHash = hashedPassword
                    };

                    await userManager.CreateAsync(newAdminUser);
                    await userManager.AddToRoleAsync(newAdminUser, Roles.Admin);
                }

            }
        }
    }
}
