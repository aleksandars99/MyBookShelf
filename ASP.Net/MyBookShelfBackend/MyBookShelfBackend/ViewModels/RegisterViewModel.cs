using System.ComponentModel.DataAnnotations;

namespace MyBookShelfBackend.ViewModels
{
    public class RegisterViewModel
    {
        [Display(Name ="Email Adress")]
        [Required(ErrorMessage = "Wrong credentials")]
        public string EmailAdress { get; set; }
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Wrong credentials")]
        public string Password { get; set; }
        [Display(Name ="Confirm Password")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage ="Passwords do not match")]
        public string ConfirmPassword { get; set; }

    }
}
