"use client"
import { YearView } from "@/components/year-view"
import { MonthView } from "@/components/month-view"
import { DayView } from "@/components/day-view"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CalendarViewProps {
  view: "year" | "month" | "day"
  setView: (view: "year" | "month" | "day") => void
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export function CalendarView({ view, setView, selectedDate, setSelectedDate }: CalendarViewProps) {
  const handlePrevious = () => {
    const newDate = new Date(selectedDate)
    if (view === "year") {
      newDate.setFullYear(newDate.getFullYear() - 1)
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setSelectedDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(selectedDate)
    if (view === "year") {
      newDate.setFullYear(newDate.getFullYear() + 1)
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setSelectedDate(newDate)
  }

  const getViewTitle = () => {
    if (view === "year") {
      return format(selectedDate, "yyyy")
    } else if (view === "month") {
      return format(selectedDate, "MMMM yyyy")
    } else {
      return format(selectedDate, "EEEE, MMMM d, yyyy")
    }
  }

  const handleBack = () => {
    if (view === "day") {
      setView("month")
    } else if (view === "month") {
      setView("year")
    }
  }

  return (
    <div className="space-y-4 pt-6 pr-3 pl-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {view !== "year" && (
            <Button variant="ghost" onClick={handleBack}>
              Back to {view === "day" ? "Month" : "Year"}
            </Button>
          )}
          <h1 className="text-2xl font-bold">{getViewTitle()}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={handlePrevious}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleNext}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {view === "year" && (
        <YearView
          year={selectedDate.getFullYear()}
          onSelectMonth={(month) => {
            const newDate = new Date(selectedDate)
            newDate.setMonth(month)
            setSelectedDate(newDate)
            setView("month")
          }}
        />
      )}

      {view === "month" && (
        <MonthView
          date={selectedDate}
          onSelectDay={(day) => {
            const newDate = new Date(selectedDate)
            newDate.setDate(day)
            setSelectedDate(newDate)
            setView("day")
          }}
        />
      )}

      {view === "day" && <DayView date={selectedDate} />}
    </div>
  )
}

