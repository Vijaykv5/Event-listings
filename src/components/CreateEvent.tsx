import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ImageUpload } from "./events/ImageUpload";
import { EventForm } from "./events/EventForm";
import { EventDateTime } from "./events/EventDateTime";
import { EventLocation } from "./events/EventLocation";
import { EventDescription } from "./events/EventDescription";
import { useEvent } from "../context/EventContext";

export default function CreateEvent() {
  const navigate = useNavigate();
  const { eventData, setEventData, saveEvent } = useEvent();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (eventData.imageUrl) {
        URL.revokeObjectURL(eventData.imageUrl);
      }
      const url = URL.createObjectURL(file);
      setEventData({ imageUrl: url });
    }
  };

  const handleSubmit = () => {
    saveEvent();
    navigate("/events");
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
          <ImageUpload
            imageUrl={eventData.imageUrl}
            onImageChange={handleImageChange}
          />

          <EventForm
            value={eventData.title}
            onChange={(e) => setEventData({ title: e.target.value })}
            community={eventData.community}
            onCommunityChange={(community) => setEventData({ community })}
          />

          <EventDateTime
            startDate={
              eventData.startDate ? new Date(eventData.startDate) : undefined
            }
            endDate={
              eventData.endDate ? new Date(eventData.endDate) : undefined
            }
            startTime={eventData.startTime}
            endTime={eventData.endTime}
            onStartDateChange={setEventData}
            onEndDateChange={setEventData}
          />

          <div className="space-y-2 sm:space-y-3">
            <EventLocation
              location={eventData.location}
              onLocationChange={(e) =>
                setEventData({ location: e.target.value })
              }
            />
            <EventDescription
              description={eventData.description}
              onDescriptionChange={(description) =>
                setEventData({ description })
              }
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full py-4 sm:py-6 text-base sm:text-lg font-medium rounded-lg sm:rounded-xl bg-[#7C76CC] hover:bg-[#6A64B8] text-white transition-colors duration-200"
          >
            Create Event
          </Button>
        </div>
      </div>
    </div>
  );
}
