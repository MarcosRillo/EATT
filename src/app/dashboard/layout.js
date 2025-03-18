// app/dashboard/layout.js
"use client";

import { EventsProvider } from "@/app/context/EventContext";

export default function DashboardLayout({ children }) {
  return (
    <EventsProvider> 
      {children}
    </EventsProvider>
  );
}