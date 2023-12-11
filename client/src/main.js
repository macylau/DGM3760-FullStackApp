document.addEventListener('DOMContentLoaded', function() {
    let addEventBtn = document.getElementById('addEventBtn');
    let popupForm = document.getElementById('popupForm');
    let closeBtn = document.getElementById('closeBtn');
  
    // Show the pop-up form
    addEventBtn.addEventListener('click', function() {
      popupForm.style.display = 'block';
    });
  
    // Hide the pop-up form
    closeBtn.addEventListener('click', function() {
      popupForm.style.display = 'none';
    });
  
    // Hide the pop-up form if the user clicks outside of it
    window.addEventListener('click', function(event) {
      if (event.target == popupForm) {
        popupForm.style.display = 'none';
      }
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    let eventTypeSelect = document.getElementById('eventType');
    let addEventTypeButton = document.getElementById('addEventType');
    let saveEventButton = document.getElementById('saveEvent');
    let eventForm = document.getElementById('eventForm');
  
    let eventTypes = ["Birthday", "Wedding", "Baby Shower"];
  
    // Populate the event type dropdown
    eventTypes.forEach(function(type) {
        let option = document.createElement('option');
      option.value = type;
      option.text = type;
      eventTypeSelect.add(option);
    });
  
    // Add event type to the dropdown
    addEventTypeButton.addEventListener('click', function() {
        let newEventType = prompt("Enter a new event type:");
      if (newEventType) {
        const option = document.createElement('option');
        option.value = newEventType;
        option.text = newEventType;
        eventTypeSelect.add(option);
        eventTypeSelect.value = newEventType; // Set the new type as selected
      }
    });
  
    // Save event functionality
    saveEventButton.addEventListener('click', function() {
      if (eventForm.checkValidity()) {
        // Collect form data
        let eventName = document.getElementById('eventName').value;
        let eventType = eventTypeSelect.value;
        let eventDate = document.getElementById('eventDate').value;
        let startTime = document.getElementById('startTime').value;
        let endTime = document.getElementById('endTime').value;
        let eventDescription = document.getElementById('eventDescription').value;
  
        console.log("Event Name:", eventName);
        console.log("Event Type:", eventType);
        console.log("Event Date:", eventDate);
        console.log("Event Time:", startTime, "to", endTime);
        console.log("Event Description:", eventDescription);
  
        // will send this data to API later
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });
  
