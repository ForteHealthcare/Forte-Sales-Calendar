"use client"

import { useContext } from "react"
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, getDay, addDays, isSameDay } from "date-fns"
import { EventContext } from "@/components/event-context"
import { cn } from "@/lib/utils"

interface MonthViewProps {
  date: Date
  onSelectDay: (day: number) => void
}

export function MonthView({ date, onSelectDay }: MonthViewProps) {
  const { events } = useContext(EventContext)
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = eachDayOfInterval({ start, end })

  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  const startingDayOfWeek = getDay(start)

  // Create array for all days to display including days from previous/next month to fill the grid
  const daysToDisplay = []

  // Add days from previous month
  for (let i = 0; i < startingDayOfWeek; i++) {
    daysToDisplay.push(addDays(start, -startingDayOfWeek + i))
  }

  // Add days from current month
  daysToDisplay.push(...days)

  // Add days from next month to complete the grid (6 rows of 7 days = 42 cells)
  const remainingDays = 42 - daysToDisplay.length
  for (let i = 1; i <= remainingDays; i++) {
    daysToDisplay.push(addDays(end, i))
  }

  // Function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd")
    return events.filter((event) => format(new Date(event.date), "yyyy-MM-dd") === dayStr)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-7 bg-muted">
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
          <div key={day} className="py-2 text-center font-medium text-sm">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-fr">
        {daysToDisplay.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, date)
          const dayEvents = getEventsForDay(day)
          const isToday = isSameDay(day, new Date())

          return (
            <div
              key={index}
              className={cn(
                "min-h-[100px] p-2 border border-border",
                !isCurrentMonth && "bg-muted/50 text-muted-foreground",
                isToday && "bg-primary/5",
              )}
              onClick={() => {
                if (isCurrentMonth) {
                  onSelectDay(day.getDate())
                }
              }}
            >
              <div
                className={cn("text-sm font-medium mb-1", isCurrentMonth ? "cursor-pointer hover:text-primary" : "")}
              >
                {format(day, "d")}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event, i) => (
                  <div
                    key={i}
                    className="text-xs truncate rounded px-1 py-0.5"
                    style={{ backgroundColor: `${event.color}20`, color: event.color }}
                  >
                    {event.title}
                  </div>
                ))}

                {dayEvents.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

