using CloudinaryDotNet.Actions;

namespace MyBookShelfBackend.Interfaces
{
    public interface IPhotoService
    {
        Task<ImageUploadResult> AddPhotoAsync(string file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
    }
}
