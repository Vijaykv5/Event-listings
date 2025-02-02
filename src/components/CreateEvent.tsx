import { useState } from "react";
import { Button } from "./ui/button";
import { ImageUpload } from "./events/ImageUpload";
import { EventForm } from "./events/EventForm";
import { EventDateTime } from "./events/EventDateTime";
import { EventLocation } from "./events/EventLocation";
import { EventDescription } from "./events/EventDescription";

export default function CreateEvent() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-md mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-6 sm:mb-8">
          <div className="w-8 h-1 bg-gray-200 rounded-full mx-auto mb-4 sm:mb-6" />
          <h1 className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
            Create New Event
          </h1>
        </div>

        <div className="space-y-6 sm:space-y-8">
          <ImageUpload imageUrl={imageUrl} onImageChange={handleImageChange} />

          <EventForm />

          <EventDateTime />

          <div className="space-y-2 sm:space-y-3">
            <EventLocation />
            <EventDescription
              description={description}
              onDescriptionChange={setDescription}
            />
          </div>

          <Button className="w-full py-4 sm:py-6 text-base sm:text-lg font-medium rounded-lg sm:rounded-xl bg-[#7C76CC] hover:bg-[#6A64B8] text-white transition-colors duration-200">
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
}
