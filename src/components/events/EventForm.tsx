import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { EventFormProps } from "../../types/event";

export function EventForm({ value, onChange, community, onCommunityChange }: EventFormProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-gray-700 text-sm sm:text-base">
          Select Community <span className="text-red-500">*</span>
        </Label>
        <Select value={community} onValueChange={onCommunityChange}>
          <SelectTrigger className="w-full bg-white border-gray-200 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base">
            <SelectValue placeholder="Select a community" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="indiranagar">Indiranagar Run Club</SelectItem>
            <SelectItem value="koramangala">Koramangala Runners</SelectItem>
            <SelectItem value="cochin">Kochi city Club</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-gray-700 text-sm sm:text-base">
          Event Title <span className="text-red-500">*</span>
        </Label>
        <Input
          placeholder="Enter event title"
          required
          value={value}
          onChange={onChange}
          className="bg-white border-gray-200 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base"
        />
      </div>
    </div>
  );
} 