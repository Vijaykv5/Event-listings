// context/EventContext.tsx
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
import { Event } from "../types/event";

export interface EventData {
  title: string;
  location: string;
  description: string;
  imageUrl: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  community: string;
}

interface EventContextType {
  eventData: Event;
  setEventData: (newData: Partial<Event>) => void;
  saveEvent: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [eventData, setEventDataState] = useState<EventData>({
    title: "",
    location: "",
    description: "",
    imageUrl: "",
    startDate: undefined,
    endDate: undefined,
    startTime: undefined,
    endTime: undefined,
    community: ""
  });

  const setEventData = (newData: Partial<EventData>) => {
    setEventDataState(prev => ({ ...prev, ...newData }));
  };

  //store the events objects to local storage
  const saveEvent = () => {
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");
    storedEvents.push(eventData);
    localStorage.setItem("events", JSON.stringify(storedEvents));
  };

  const value = useMemo(
    () => ({ eventData, setEventData, saveEvent }),
    [eventData]
  );

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvent must be used within an EventProvider");
  }
  return context;
};
