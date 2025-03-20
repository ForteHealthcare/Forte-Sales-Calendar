"use client"

import { useContext } from "react"
import {
  startOfYear,
  endOfYear,
  eachMonthOfInterval,
  format,
  getDaysInMonth,
  startOfMonth,
  getDay,
  isWeekend,
} from "date-fns"
import { EventContext } from "@/components/event-context"

interface YearViewProps {
  year: number
  onSelectMonth: (month: number) => void
}

export function YearView({ year, onSelectMonth }: YearViewProps) {
  const { events } = useContext(EventContext)
  const start = startOfYear(new Date(year, 0, 1))
  const end = endOfYear(new Date(year, 0, 1))
  const months = eachMonthOfInterval({ start, end })

  // Function to get events for a specific day
  const getEventsForDay = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd")
    return events.filter((event) => format(new Date(event.date), "yyyy-MM-dd") === dateStr)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-2"> 
      {months.map((month) => {
        const daysInMonth = getDaysInMonth(month)
        const firstDayOfMonth = startOfMonth(month)

        // Create array for days of the month (excluding weekends)
        const days = []

        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(year, month.getMonth(), i)
          // Only include weekdays (Monday to Friday)
          if (!isWeekend(date)) {
            days.push(date)
          }
        }

        return (
          <div
            key={month.getMonth()}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectMonth(month.getMonth())}
          >
            <h7 className="font-medium text-lg mb-2">{format(month, "MMMM")}</h7>
            <div className="grid grid-cols-5 gap-1 text-xs">
              {["Mo", "Tu", "We", "Th", "Fr"].map((day) => (
                <div key={day} className="text-center font-medium text-muted-foreground">
                  {day}
                </div>
              ))}

              {days.map((day) => {
                const dayEvents = getEventsForDay(day)
                const dayOfWeek = getDay(day)
                // Adjust for Monday as first day (0 = Sunday, 1 = Monday, etc.)
                const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1

                return (
                  <div
                    key={`day-${day.getDate()}`}
                    className="min-h-[35px] p-1"
                    style={{ gridColumnStart: day.getDate() === 1 ? adjustedDayOfWeek + 1 : undefined }}
                  >
                    <div className="text-[10px] text-muted-foreground mb-0.5">{day.getDate()}</div>
                    {dayEvents.length > 0 && (
                      <div className="space-y-0.5">
                        {dayEvents.slice(0, 2).map((event, i) => (
                          <div
                            key={i}
                            className="text-[15px] truncate rounded px-0.5"
                            style={{ backgroundColor: `${event.color}20`, color: event.color }}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[8px] text-muted-foreground">+{dayEvents.length - 2}</div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

