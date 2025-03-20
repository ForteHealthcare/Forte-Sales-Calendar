"use client"

import { useContext, useState } from "react"
import { format } from "date-fns"
import { EventContext } from "@/components/event-context"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash } from "lucide-react"
import { EventForm } from "@/components/event-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface DayViewProps {
  date: Date
}

export function DayView({ date }: DayViewProps) {
  const { events, removeEvent } = useContext(EventContext)
  const [open, setOpen] = useState(false)

  const dayEvents = events.filter((event) => {
    const eventStart = new Date(event.startDate)
    const eventEnd = new Date(event.endDate)
    return eventStart <= date && eventEnd >= date // Check if date is within the event range
  })

  const sortedEvents = [...dayEvents].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
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
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg border flex justify-between items-start"
              style={{ borderLeftColor: event.color, borderLeftWidth: "4px" }}
            >
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{format(new Date(event.startDate), "h:mm a")} - {format(new Date(event.endDate), "h:mm a")}</p>
                {event.description && <p className="mt-2 text-sm">{event.description}</p>}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => removeEvent(event.id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
