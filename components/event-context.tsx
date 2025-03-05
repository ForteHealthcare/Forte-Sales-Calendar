"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"

export interface Event {
  title: string
  description?: string
  date: string
  createdBy: string
  color: string
}

interface EventContextType {
  events: Event[]
  addEvent: (event: Event) => void
  removeEvent: (index: number) => void
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

  // Load events from localStorage on component mount
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

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events))
  }, [events])

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event])
  }

  const removeEvent = (index: number) => {
    setEvents((prev) => prev.filter((_, i) => i !== index))
  }

  return <EventContext.Provider value={{ events, addEvent, removeEvent }}>{children}</EventContext.Provider>
}

