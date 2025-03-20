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

  // Get the first weekday of the month (skip weekends)
  let firstWeekday = start
  while (getDay(firstWeekday) === 0 || getDay(firstWeekday) === 6) {
    firstWeekday = addDays(firstWeekday, 1)
  }

  // Generate weekdays only
  let daysToDisplay = []
  let currentDay = firstWeekday

  while (currentDay <= end) {
    if (getDay(currentDay) !== 0 && getDay(currentDay) !== 6) {
      daysToDisplay.push(currentDay)
    }
    currentDay = addDays(currentDay, 1)
  }

  // Function to get events for a specific day
  const getEventsForDay = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd")
    return events.filter((event) => format(new Date(event.date), "yyyy-MM-dd") === dayStr)
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="grid grid-cols-5 bg-muted">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
          <div key={day} className="py-2 text-center font-medium text-sm">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 auto-rows-fr">
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
              <div className="text-sm font-medium mb-1">{format(day, "d")}</div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event, i) => (
                  <div
                    key={i}
                    className="truncate rounded px-1 py-0.5"
                    style={{ fontSize: "20px", backgroundColor: `${event.color}20`, color: event.color }}
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
