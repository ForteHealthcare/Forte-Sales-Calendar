"use client"

import { useContext, useState } from "react"
import { format } from "date-fns"
import { EventContext } from "@/components/event-context"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { EventForm } from "@/components/event-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface DayViewProps {
  date: Date
}

export function DayView({ date }: DayViewProps) {
  const { events } = useContext(EventContext)
  const [open, setOpen] = useState(false)

  // Get events for the selected day
  const dayEvents = events.filter((event) => format(new Date(event.date), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))

  // Sort events by time
  const sortedEvents = [...dayEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime()
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Events for {format(date, "MMMM d, yyyy")}</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <EventForm date={date} onClose={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {sortedEvents.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No events scheduled for this day. Click "Add Event" to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {sortedEvents.map((event, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border"
              style={{ borderLeftColor: event.color, borderLeftWidth: "4px" }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{format(new Date(event.date), "h:mm a")}</p>
                  {event.description && <p className="mt-2 text-sm">{event.description}</p>}
                </div>
                <div className="flex items-center text-sm" style={{ color: event.color }}>
                  <span className="font-medium">{event.createdBy}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

