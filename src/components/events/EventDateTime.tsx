
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { format } from "date-fns";

interface EventDateTimeProps {
  onStartDateChange?: (date: Date) => void;
  onEndDateChange?: (date: Date) => void;
}

export function EventDateTime({
  onStartDateChange,
  onEndDateChange,
}: EventDateTimeProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [startTime, setStartTime] = useState("19:00");
  const [endTime, setEndTime] = useState("21:00");

  const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? "00" : "30";
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return {
      value: `${hour.toString().padStart(2, "0")}:${minute}`,
      label: `${displayHour}:${minute} ${period}`,
    };
  });

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDate(date);
    if (onStartDateChange && date) onStartDateChange(date);
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDate(date);
    if (onEndDateChange && date) onEndDateChange(date);
  };

  const formatDateTime = (date: Date | undefined, time: string) => {
    if (!date) return "Select date and time";
    const [hours, minutes] = time.split(":");
    const dateWithTime = new Date(date);
    dateWithTime.setHours(Number.parseInt(hours));
    dateWithTime.setMinutes(Number.parseInt(minutes));
    return format(dateWithTime, "EEE, dd MMM 'at' h:mm a");
  };

  return (
    <div className="space-y-2">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between w-full cursor-pointer">
            <div className="flex items-center gap-2">
              <ChevronUp className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Starts</span>
            </div>
            <div className="  border-gray-200  px-4 py-2 rounded-full">
              <span className="text-gray-700">
                {startDate
                  ? formatDateTime(startDate, startTime)
                  : "Select date and time"}
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
            <Select value={startTime} onValueChange={setStartTime}>
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
          <div className="flex items-center justify-between w-full cursor-pointer">
            <div className="flex items-center gap-2">
              <ChevronDown className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Ends</span>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-gray-700">
                {endDate
                  ? formatDateTime(endDate, endTime)
                  : "Select date and time"}
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
            <Select value={endTime} onValueChange={setEndTime}>
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
    </div>
  );
}
