import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useContext } from "react"
import { EventContext } from "@/components/event-context"
import { format } from "date-fns"

export function EventForm({ date, onClose }: { date: Date; onClose: () => void }) {
  const { addEvent } = useContext(EventContext)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState(format(date, "yyyy-MM-dd"))
  const [endDate, setEndDate] = useState(format(date, "yyyy-MM-dd"))
  const [color, setColor] = useState("blue")
  const [createdBy, setCreatedBy] = useState("User") // Example; change this to actual user context if necessary

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addEvent({
      title,
      description,
      startDate,
      endDate,
      createdBy,
      color,
      id: crypto.randomUUID(),
    })

    onClose()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label>Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          />
        </div>

        <div>
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label>Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label>Created By</label>
          <input
            type="text"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            className="input"
          />
        </div>

        <Button type="submit">Add Event</Button>
      </div>
    </form>
  )
}
