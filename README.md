# Event Management Application

## Overview
A React-based event management application that allows users to create and manage events with local storage persistence.


## Demo



https://github.com/user-attachments/assets/ee2935b6-9f6f-4a28-90f6-6df249a7e93e

Incase if you find any difficulty, you can also watch [here](https://youtu.be/j_4a3w9tQWw) 




## Features
- Create new events with titles, dates, times, and images
- Local storage integration for data persistence
- Image upload functionality
- Responsive design using Tailwind CSS

## Tech Stack
- React JS (vite)
- TypeScript
- Tailwind CSS
- ShadCn ( for UI enhancement )

## Project Structure

```
src/
├── components/
    ├── CreateEvent.tsx        # Main event creation container
    ├── EventListing.tsx       #Listing all the events stored in local storage
    
    ├── events/
      ├── EventForm.tsx         # Form for event details
      ├── EventDateTime.tsx     # Date and time picker component
      ├── ImageUpload.tsx       # Image upload component
      ├── EventForm.tsx         # Display list of created events
      └── EventCard.tsx         # Individual event display card

    ├── ui/
        # All Reusable  component like button,card,label,input etc

├── context/
│   └── EventContext.tsx     # Handling states across different components and storing values to localstorage
├── types/
│   └── event.ts             # TypeScript interfaces and types
├── utils/
│   ├── mediaUtils.ts        # media helper functions
├── App.tsx                  # Root application component
├── main.tsx                 # Application entry point
└── vite-env.d.ts            # Vite type declarations


```


## Challenges Faced

While working on this application, I encountered a few key challenges:

### 1. **Issue with Integrating Google maps**
I first tried of adding google maps API (https://developers.google.com/maps/documentation), so when user gives the location, it automatically displays a preview of the location.
But since It requires a billing inorder to use the API, I tried `Gomaps`(https://gomaps.pro/), but it was also not able to integrate which I later commented out in [EventLocation.tsx](https://github.com/Vijaykv5/Event-listings/blob/main/src/components/events/EventLocation.tsx#L7C1) . 

### 2. **Video handling**
Initially I struggled with managing video upload by the user, but still didn't figured out how to show preview of video in the `Event listing` section. 





