import { useEffect, useState } from "react";
import { Settings, Plus, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Event } from "../types/event";
import EventCard from "./events/EventCard";

export default function EventListing() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    setEvents(storedEvents.reverse()); // Inorder to show the newest event at the top - reversing the object
  }, []);

  const formatDateTime = (date?: string, time?: string) => {
    if (!date) return "Date not set";

    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    let dateStr = "";
    if (eventDate.toDateString() === today.toDateString()) {
      dateStr = "Today";
    } else if (eventDate.toDateString() === tomorrow.toDateString()) {
      dateStr = "Tomorrow";
    } else {
      dateStr = eventDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }

    return `${dateStr}${time ? `, ${time}` : ""}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Delhi NCR</h1>
            <p className="text-muted-foreground">Welcome to the tribe!</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => navigate("/")}
            >
              <Plus className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full justify-start h-auto border-b rounded-none bg-transparent p-0">
            <TabsTrigger
              value="events"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-8 pb-4"
            >
              Events
            </TabsTrigger>
            <TabsTrigger
              value="communities"
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-8 pb-4 text-muted-foreground"
            >
              Communities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No events yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first event to get started
                </p>
                <Button
                  onClick={() => navigate("/")}
                  className="bg-[#7C76CC] hover:bg-[#6A64B8]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {events.map((event, index) => (
                  <EventCard
                    key={index}
                    event={event}
                    formatDateTime={formatDateTime}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="communities">
            <div className="text-center py-12 text-muted-foreground">
              No communities to display
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
