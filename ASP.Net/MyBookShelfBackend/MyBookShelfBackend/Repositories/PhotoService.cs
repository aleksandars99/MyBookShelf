using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using MyBookShelfBackend.CloudinarySet;
using MyBookShelfBackend.Interfaces;
using dotenv.net;

namespace MyBookShelfBackend.Services
{
    public class PhotoService : IPhotoService
    {
        public readonly Cloudinary _cloudinary;

        public PhotoService(IOptions<CloudinarySettings> config)
        {
            Account account = new Account(
                "dl5u5xg4i",
                "673876775777496",
                "_5pHcErbv0totepyGMqdNd4VOkE"
            );

            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
            //var acc = new Account(
            //    config.Value.CloudName,
            //    config.Value.ApiKey,
            //    config.Value.ApiSecret
            //    );

            //_cloundinary = new Cloudinary(acc);
        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicUrl)
        {
            var publicId = publicUrl.Split('/').Last().Split('.')[0];
            var deleteParams = new DeletionParams(publicId);
            return await _cloudinary.DestroyAsync(deleteParams);
        }
    }
}