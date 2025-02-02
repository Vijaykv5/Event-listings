import { MapPin, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Event } from "../../types/event";

interface EventCardProps {
  event: Event;
  formatDateTime: (date?: string, time?: string) => string;
}

export default function EventCard({ event, formatDateTime }: EventCardProps) {
  return (
    <div className="flex-none">
      <div className="rounded-2xl overflow-hidden bg-card">
        <div className="aspect-[1/1] relative">
          <img
            src={event.imageUrl || "/placeholder.svg"}
            alt={event.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              {event.community}
            </span>
          </div>
          <h3 className="font-medium text-sm mb-2 line-clamp-2">
            {event.title}
          </h3>
          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>
                {formatDateTime(event.startDate, event.startTime)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 