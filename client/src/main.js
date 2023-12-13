document.addEventListener("DOMContentLoaded", function () {
    let addEventBtn = document.getElementById("addEventBtn");
    let popupForm = document.getElementById("popupForm");
    let closeBtn = document.getElementById("closeBtn");
    let upcomingEventSection = document.getElementById("upComingEvent");
    let pastEventSection = document.getElementById("pastEvent");
  
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
  
        // Create a new event element
        let eventElement = document.createElement("div");
        eventElement.className = "event";
        eventElement.innerHTML = `
            <h3>${eventName} - ${eventType}</h3>
            <p>Date: ${formattedEventDate}</p>
            <p>Time: ${startTime} - ${endTime}</p>
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
  
        // Close the form after saving
        popupForm.style.display = "none";
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });