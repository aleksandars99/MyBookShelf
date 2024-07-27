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
                //Roles
                var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>(); 
                if (!await roleManager.RoleExistsAsync(Roles.admin))
                    await roleManager.CreateAsync(new IdentityRole(Roles.admin));
                if (!await roleManager.RoleExistsAsync(Roles.user))
                    await roleManager.CreateAsync(new IdentityRole(Roles.user));

                //Users
                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<Users>>();
                string adminUserEmail = "aleksandar@gmail.com";

                var adminUser = await userManager.FindByEmailAsync(adminUserEmail);
                if (adminUser == null)
                {
                    var newAdminUser = new Users()
                    {
                        UserName = "AleksandarDev",
                        Email = adminUserEmail,
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(newAdminUser, "Aleksandar@1234");
                    await userManager.AddToRoleAsync(adminUser, Roles.admin);
                }

                string regularUserEmail = "acostojanovic22@gmail.com";

                var regularUser = await userManager.FindByEmailAsync(regularUserEmail);
                if (regularUser == null)
                {
                    var regularNewUser = new Users()
                    {
                        UserName = "acostojanovic",
                        Email = regularUserEmail,
                        EmailConfirmed = true
                    };
                    await userManager.CreateAsync(regularUser, "Aleksandar@1234");
                    await userManager.AddToRoleAsync(regularUser, Roles.user);
                }
            }
        }
    }
}
