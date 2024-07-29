using System.ComponentModel.DataAnnotations;

namespace MyBookShelfBackend.ViewModels
{
    public class LoginViewModel
    {
        [Display(Name = "Email Adress")]
        [Required(ErrorMessage = "Wrong credentials")]
        public string EmailAdress { get; set; }
        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Wrong credentials")]
        public string Password { get; set; }
    }
}
