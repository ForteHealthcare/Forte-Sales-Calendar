"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

export interface Event {
  id: string // <-- Add an ID
  title: string
  description?: string
  date: string
  createdBy: string
  color: string
}

interface EventContextType {
  events: Event[]
  addEvent: (event: Omit<Event, "id">) => void
  removeEvent: (id: string) => void // <-- Remove by ID
}

export const EventContext = createContext<EventContextType>({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
})

interface EventProviderProps {
  children: ReactNode
}

export function EventProvider({ children }: EventProviderProps) {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    const storedEvents = localStorage.getItem("calendarEvents")
    if (storedEvents) {
      try {
        setEvents(JSON.parse(storedEvents))
      } catch (error) {
        console.error("Failed to parse stored events:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events))
  }, [events])

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = { ...event, id: crypto.randomUUID() } // <-- Generate unique ID
    setEvents((prev) => [...prev, newEvent])
  }

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  return <EventContext.Provider value={{ events, addEvent, removeEvent }}>{children}</EventContext.Provider>
}
