"use client"

import { useState } from "react"
import { CalendarView } from "@/components/calendar-view"
import { EventProvider } from "@/components/event-context"

export default function CalendarApp() {
  const [view, setView] = useState<"year" | "month" | "day">("year")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  return (
    <EventProvider>
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-10 items-center">
            <div className="mr-4 flex">
              <a className="mr-6 flex items-center space-10-2" href="/">
                <span className="font-bold">Forte Sales Calendar</span>
              </a>
            </div>
          </div>
        </header>
        <main className="container py-6">
          <CalendarView view={view} setView={setView} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </main>
      </div>
    </EventProvider>
  )
}

