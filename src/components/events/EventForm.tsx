import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function EventForm() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-2">
        <Label className="text-gray-700 text-sm sm:text-base">
          Select Community
        </Label>
        <Select>
          <SelectTrigger className="w-full bg-white border-gray-200 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base">
            <SelectValue placeholder="Indiranagar Run Club" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="indiranagar">Indiranagar Run Club</SelectItem>
            <SelectItem value="koramangala">Koramangala Runners</SelectItem>
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
          className="bg-white border-gray-200 rounded-lg sm:rounded-xl h-10 sm:h-12 text-sm sm:text-base"
        />
      </div>
    </div>
  );
} 