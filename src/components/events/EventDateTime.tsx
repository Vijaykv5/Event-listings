import { ChevronDown, ChevronUp } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { format, parse } from "date-fns";
import { EventDateTimeProps } from "../../types/event";

export function EventDateTime({ 
  startDate, 
  endDate, 
  startTime, 
  endTime,
  onStartDateChange, 
  onEndDateChange 
}: EventDateTimeProps) {
  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const period = hour < 12 ? "AM" : "PM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute}`,
      label: `${displayHour}:${minute} ${period}`,
    };
  });

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      onStartDateChange({ startDate: date.toISOString() });
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      onEndDateChange({ endDate: date.toISOString() });
    }
  };

  // formatting date to "Mon, 16 Dec at 5.00 PM" format
  const formatDateTime = (date?: Date, time?: string) => {
    if (!date) return "Select date and time";
    const dateStr = format(date, "EEE, MMM d");
    if (!time) return dateStr;
    return `${dateStr} at ${format(parse(time, "HH:mm", date), "h:mm a")}`;
  };

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between w-full cursor-pointer p-3  rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <ChevronUp className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700  font-medium">Starts</span>
            </div>
            <div className="px-4 py-2 rounded-3xl bg-gray-50 border border-gray-200">
              <span className="text-gray-700 ">
                {formatDateTime(startDate, startTime)}
              </span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={handleStartDateSelect}
            initialFocus
          />
          <div className="p-3 border-t">
            <Select
              value={startTime}
              onValueChange={(value) => onStartDateChange({ startTime: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between w-full cursor-pointer p-3  rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Ends</span>
            </div>
            <div className="px-4 py-2 rounded-3xl bg-gray-50 border border-gray-200">
              <span className="text-gray-700">
                {formatDateTime(endDate, endTime)}
              </span>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={handleEndDateSelect}
            initialFocus
          />
          <div className="p-3 border-t">
            <Select
              value={endTime}
              onValueChange={(value) => onEndDateChange({ endTime: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
      <span className="h-2 w-full bg-slate-300"></span>
    </div>
  );
}
