import { Pencil, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import { EventDescriptionProps } from "../../types/event";

export function EventDescription({ description, onDescriptionChange }: EventDescriptionProps) {
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  return (
    <div className="space-y-2 sm:space-y-3">
      {isEditingDescription ? (
        <div className="space-y-2">
          <Label className="text-gray-700 text-sm sm:text-base">
            Event Description
          </Label>
          <textarea
            className="w-full p-3 sm:p-4 border border-gray-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#7C76CC]"
            rows={3}
            placeholder="Enter event description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
          <Button
            variant="secondary"
            className="w-full bg-[#7C76CC] hover:bg-[#6A64B8] text-white text-sm sm:text-base"
            onClick={() => setIsEditingDescription(false)}
          >
            Save
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full justify-between p-3 sm:p-4 h-auto bg-white border-gray-200 rounded-lg sm:rounded-xl hover:border-gray-300 transition-colors duration-200"
          onClick={() => setIsEditingDescription(true)}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Pencil className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <div className="text-left">
              <div className="text-gray-700 font-medium text-sm sm:text-base">
                {description ? "Edit Description" : "Add Description"}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 font-normal">
                {description || "Add a brief description "}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
        </Button>
      )}
    </div>
  );
} 