import { ImageUp, Video } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { MediaUploadProps } from "../../types/event";

export function MediaUpload({ mediaUrl, onMediaChange, mediaType }: MediaUploadProps) {
  return (
    <Card className="aspect-[4/5] sm:aspect-[4/5] border-2 border-dashed border-gray-200 bg-gradient-to-br from-[#F8FAFF] via-[#E6EBFF] to-[#F8FAFF] hover:from-[#F5F8FF] hover:via-[#E3E8FF] hover:to-[#F5F8FF] transition-colors duration-200 rounded-xl sm:rounded-2xl overflow-hidden">
      {mediaUrl ? (
        <div className="relative w-full h-full">
          {mediaType === 'video' ? (
            <video
              src={mediaUrl}
              className="absolute inset-0 w-full h-full object-cover"
              controls
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Event"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <Button
            variant="secondary"
            className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 shadow-lg text-sm sm:text-base z-10"
            onClick={() => document.getElementById("media-upload")?.click()}
          >
            {mediaType === 'video' ? (
              <Video className="w-4 h-4 mr-2" />
            ) : (
              <ImageUp className="w-4 h-4 mr-2" />
            )}
            Replace {mediaType === 'video' ? 'Video' : 'Photo'}
          </Button>
          <input
            id="media-upload"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={onMediaChange}
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
              onClick={() => document.getElementById("media-upload")?.click()}
            >
              <ImageUp className="w-4 h-4 mr-2" />
              Add Media
            </Button>
            <p className="text-sm text-gray-500">
              Supports images and videos
            </p>
            <input
              id="media-upload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={onMediaChange}
            />
          </div>
        </div>
      )}
    </Card>
  );
} 