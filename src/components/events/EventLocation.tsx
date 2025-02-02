import { useState } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function EventLocation() {
  const [location, setLocation] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <div className="w-full">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Enter event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7C76CC]"
          />
          <Button
            variant="secondary"
            className="w-full bg-[#7C76CC] hover:bg-[#6A64B8] text-white text-sm sm:text-base"
            onClick={() => setIsEditing(false)}
          >
            Save
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full justify-between p-3 sm:p-4 h-auto bg-white border-gray-200 rounded-lg sm:rounded-xl hover:border-gray-300 transition-colors duration-200 text-sm sm:text-base"
          onClick={() => setIsEditing(true)}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <span className="text-gray-700 font-medium">
              {location || "Choose location"}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </Button>
      )}
    </div>
  );
}
