"use client"

import type React from "react"

import { useContext, useState } from "react"
import { EventContext } from "@/components/event-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

interface EventFormProps {
  date: Date
  onClose: () => void
}

const colorOptions = [
  { name: "Office", value: "#ef4444" },
  { name: "Bradley", value: "#3b82f6" },
  { name: "Denver", value: "#22c55e" },
  { name: "Greg", value: "#a855f7" },
  { name: "Nigel", value: "#f97316" },
  { name: "Katie", value: "#ec4899" },
  { name: "Hugh", value: "#14b8a6" },
  { name: "Bradley ", value: "#000000" },
  { name: "Crystal", value: "#fff200" },
]

export function EventForm({ date, onClose }: EventFormProps) {
  const { addEvent } = useContext(EventContext)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdBy: "",
    color: colorOptions[0].value,
    time: "12:00",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create a date object with the selected date and time
    const [hours, minutes] = formData.time.split(":").map(Number)
    const eventDate = new Date(date)
    eventDate.setHours(hours, minutes)

    addEvent({
      title: formData.title,
      description: formData.description,
      date: eventDate.toISOString(),
      createdBy: formData.createdBy,
      color: formData.color,
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <h2 className="text-lg font-medium">Add Event for {format(date, "MMMM d, yyyy")}</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Event Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="time">Time</Label>
        <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={3} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="color">Color</Label>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((color) => (
            <div key={color.value} className="flex items-center">
              <input
                type="radio"
                id={`color-${color.name}`}
                name="color"
                value={color.value}
                checked={formData.color === color.value}
                onChange={handleChange}
                className="sr-only"
              />
              <label
                htmlFor={`color-${color.name}`}
                className="flex items-center gap-1 cursor-pointer p-1 rounded-md"
                style={{
                  outline: formData.color === color.value ? `2px solid ${color.value}` : "none",
                  outlineOffset: "2px",
                }}
              >
                <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color.value }} />
                <span className="text-sm">{color.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Event</Button>
      </div>
    </form>
  )
}

