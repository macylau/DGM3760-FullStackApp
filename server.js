const express = require("express");
const app = express();
const port = 3300;

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("client"));

let events = [
  {
    id: 0,
    eventName: "Yard Sale",
    eventType: "Work",
  },
  {
    id: 1,
    eventName: "Daisy's Wedding",
    eventType: "Wedding",
  },
  {
    id: 2,
    eventName: "Josh's Birthday",
    eventType: "Birthday",
  },
];

// Get all events
app.get('/api/events', (req, res) => {
  res.send(events)
})

// Post a new event
app.post('/api/event', (req, res) => {
  const newEvent = req.body;
  events.push(newEvent);
  res.json(newEvent);
});

app.put('/api/event/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedEvent = req.body;

  // Find the index of the event with the specified ID
  const eventIndex = events.findIndex((event) => event.id === id);

  // Update the event if found
  if (eventIndex !== -1) {
    if (updatedEvent.eventName && updatedEvent.eventType) {
      events[eventIndex].eventName = updatedEvent.eventName;
      events[eventIndex].eventType = updatedEvent.eventType;

      res.json(events[eventIndex]);
    } else {
      res.status(400).json({ error: 'Invalid request body for event update' });
    }
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

// Delete a event
app.delete('/api/event/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // Remove the event with the specified ID
  events = events.filter((event) => event.id !== id);

  res.json({ success: true });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

