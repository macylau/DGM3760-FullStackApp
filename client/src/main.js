document.addEventListener("DOMContentLoaded", function () {
  let addEventBtn = document.getElementById("addEventBtn");
  let popupForm = document.getElementById("popupForm");
  let closeBtn = document.getElementById("closeBtn");
  let upcomingEventSection = document.getElementById("upComingEvent");
  let pastEventSection = document.getElementById("pastEvent");
  let eventLocationInput = document.getElementById("eventLocation");
  let editedEvent = null;

  eventLocationInput.addEventListener("click", function () {
    const autocomplete = new google.maps.places.Autocomplete(
      eventLocationInput
    );
  });

  // Show the pop-up form
  addEventBtn.addEventListener("click", function () {
    popupForm.style.display = "block";
  });

  // Hide the pop-up form
  closeBtn.addEventListener("click", function () {
    popupForm.style.display = "none";
  });

  // Hide the pop-up form if the user clicks outside of it
  window.addEventListener("click", function (event) {
    if (event.target == popupForm) {
      popupForm.style.display = "none";
    }
  });

  let eventTypeSelect = document.getElementById("eventType");
  let addEventTypeButton = document.getElementById("addEventType");
  let saveEventButton = document.getElementById("saveEvent");
  let eventForm = document.getElementById("eventForm");

  let eventTypes = ["Birthday", "Wedding", "Baby Shower"];
  // Populate the event type dropdown
  eventTypes.forEach(function (type) {
    let option = document.createElement("option");
    option.value = type;
    option.text = type;
    eventTypeSelect.add(option);
  });

  // Add event type to the dropdown
  addEventTypeButton.addEventListener("click", function () {
    let newEventType = prompt("Enter a new event type:");
    if (newEventType) {
      const option = document.createElement("option");
      option.value = newEventType;
      option.text = newEventType;
      eventTypeSelect.add(option);
      eventTypeSelect.value = newEventType; // Set the new type as selected
    }
  });

  // Save event functionality
  saveEventButton.addEventListener("click", function () {
    if (eventForm.checkValidity()) {
      // Collect form data
      let eventName = document.getElementById("eventName").value;
      let eventType = eventTypeSelect.value;
      let eventDate = document.getElementById("eventDate").value;
      let startTime = document.getElementById("startTime").value;
      let endTime = document.getElementById("endTime").value;
      let eventDescription = document.getElementById("eventDescription").value;
      let eventLocation = eventLocationInput.value;

      // Convert 24-hour format to 12-hour format
      let formatTime = function (timeString) {
        let [hours, minutes] = timeString.split(":");
        let period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${period}`;
      };

      startTime = formatTime(startTime);
      endTime = formatTime(endTime);

      // Convert eventDate to mm-dd-yyyy format
      let formattedEventDate = new Date(eventDate);
      formattedEventDate = `${
        formattedEventDate.getMonth() + 1
      }-${formattedEventDate.getDate()}-${formattedEventDate.getFullYear()}`;

      if (!editedEvent) {
        // Create a new event element
        let eventElement = document.createElement("div");
        eventElement.className = "event";
        eventElement.innerHTML = `
            <h3>${eventName} - ${eventType}</h3>
            <p>Date: ${formattedEventDate}</p>
            <p>Time: ${startTime} - ${endTime}</p>
            <p>Location: ${eventLocation}</p>
            <p>Description: ${eventDescription}</p>
          `;

        // Determine if the event is upcoming or past
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (currentDate < new Date(eventDate)) {
          // Upcoming event
          upcomingEventSection.appendChild(eventElement);
        } else {
          // Past event
          pastEventSection.appendChild(eventElement);
        }
      } else {
        // Update the existing event with the new data
        editedEvent.querySelector(
          "h3"
        ).textContent = `${eventName} - ${eventType}`;
        editedEvent.querySelector(
          "p:nth-child(2)"
        ).textContent = `Date: ${formattedEventDate}`;
        editedEvent.querySelector(
          "p:nth-child(3)"
        ).textContent = `Time: ${startTime} - ${endTime}`;
        editedEvent.querySelector(
          "p:nth-child(4)"
        ).textContent = `Location: ${eventLocation}`;
        editedEvent.querySelector(
          "p:nth-child(5)"
        ).textContent = `Description: ${eventDescription}`;

        // Reset the editedEvent variable after updating
        editedEvent = null;
      }
      // Close the form after saving
      popupForm.style.display = "none";
    } else {
      alert("Please fill in all required fields.");
    }
  });

  // Click on events for editing
  document.addEventListener("click", function (event) {
    let clickedElement = event.target.closest(".event");
    if (clickedElement) {
      // Set the editedEvent variable to the clicked event for editing
      editedEvent = clickedElement;

      // Extract data from the clicked event and pre-fill the form
      let eventData = {
        name: editedEvent.querySelector("h3").textContent,
        type: editedEvent.querySelector("h3").textContent.split(" - ")[1],
        date: editedEvent
          .querySelector("p:nth-child(2)")
          .textContent.split(": ")[1],
        time: editedEvent
          .querySelector("p:nth-child(3)")
          .textContent.split(": ")[1],
        location: editedEvent
          .querySelector("p:nth-child(4)")
          .textContent.split(": ")[1],
        description: editedEvent
          .querySelector("p:nth-child(5)")
          .textContent.split(": ")[1],
      };

      document.getElementById("eventName").value = eventData.name;
      eventTypeSelect.value = eventData.type;
      document.getElementById("eventDate").value = eventData.date;
      let [startTime, endTime] = eventData.time.split(" - ");
      document.getElementById("startTime").value = startTime;
      document.getElementById("endTime").value = endTime;
      document.getElementById("eventLocation").value = eventData.location;
      document.getElementById("eventDescription").value = eventData.description;

      // Open the form for editing
      popupForm.style.display = "block";
    }
  });
});
