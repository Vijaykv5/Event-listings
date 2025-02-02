import { ChangeEvent, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ImagePlus, Loader2 } from "lucide-react";
import { validateAndResizeImage } from "../../utils/mediaUtils";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageSelect: (base64Image: string) => void;
  className?: string;
}

export default function ImageUpload({
  onImageSelect,
  className = "",
}: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const base64Image = await validateAndResizeImage(file);

      // Remove existing image before adding a new one
      setPreviewUrl(null);
      setTimeout(() => setPreviewUrl(base64Image), 100); 

      onImageSelect(base64Image);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to process image"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div className="relative aspect-[1/1] w-full max-w-sm mx-auto rounded-xl overflow-hidden bg-gradient-to-b from-blue-50 to-blue-200 shadow-lg flex flex-col items-center justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Uploaded preview"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/7603/7603138.png"
            alt="Placeholder"
            className="h-24 w-24"
          />
        )}

        <Button
          variant="outline"
          className="absolute bottom-4 flex gap-2 bg-white/80 px-4 py-2 rounded-lg shadow-md backdrop-blur-md"
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <ImagePlus className="h-4 w-4" />
              <span className="text-sm">
                {previewUrl ? "Replace Photo" : "Add Photo"}
              </span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
