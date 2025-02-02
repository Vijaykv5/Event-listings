import { ImageUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ImageUploadProps } from "../../types/event";

export function ImageUpload({ imageUrl, onImageChange }: ImageUploadProps) {
  return (
    <Card className="aspect-[4/5]  sm:aspect-square border-2 border-dashed border-gray-200 bg-gradient-to-br from-[#F8FAFF] via-[#E6EBFF] to-[#F8FAFF] hover:from-[#F5F8FF] hover:via-[#E3E8FF] hover:to-[#F5F8FF] transition-colors duration-200 rounded-xl sm:rounded-2xl overflow-hidden">
      {imageUrl ? (
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt="Event"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <Button
            variant="secondary"
            className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 shadow-lg text-sm sm:text-base z-10"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <ImageUp className="w-4 h-4 mr-2" />
            Replace Photo
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6">
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
              <img
                src="https://cdn-icons-png.flaticon.com/512/7603/7603138.png"
                alt="Upload placeholder"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <Button
              variant="secondary"
              className="bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-sm sm:text-base"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <ImageUp className="w-4 h-4 mr-2" />
              Add Photo
            </Button>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onImageChange}
            />
          </div>
        </div>
      )}
    </Card>
  );
} 