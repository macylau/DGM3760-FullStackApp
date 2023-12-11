document.addEventListener("DOMContentLoaded", function () {
    let addEventBtn = document.getElementById("addEventBtn");
    let popupForm = document.getElementById("popupForm");
    let closeBtn = document.getElementById("closeBtn");
    let upcomingEventSection = document.getElementById("upComingEvent");
    let pastEventSection = document.getElementById("pastEvent");
  
    // Function to create and append an event element
    function appendEventToSection(event, section) {
        let eventElement = document.createElement("div");
        eventElement.className = "event";
        eventElement.innerHTML = `
        <h3>${event.eventName} - ${event.eventType}</h3>
        <p>Date: ${event.eventDate}</p>
        <p>Time: ${event.startTime} - ${event.endTime}</p>
        <p>Description: ${event.eventDescription}</p>
        `;
        section.appendChild(eventElement);

        // Add event listeners for edit and delete actions
    eventElement.addEventListener('click', function () {
        editEvent(event);
      });
  
      eventElement.addEventListener('mouseenter', function () {
        showDeleteButton(eventElement);
      });
  
      eventElement.addEventListener('mouseleave', function () {
        hideDeleteButton(eventElement);
      });
  
      section.appendChild(eventElement);
    }
  
    // Function to edit an event
    function editEvent(event) {
      // Populate the form with event data
      document.getElementById('eventName').value = event.eventName;
      document.getElementById('eventType').value = event.eventType;
      document.getElementById('eventDate').value = event.eventDate;
      document.getElementById('startTime').value = event.startTime;
      document.getElementById('endTime').value = event.endTime;
      document.getElementById('eventDescription').value = event.eventDescription;
  
      // Show the form
      popupForm.style.display = 'block';
    }
  
    // Function to show the delete button
    function showDeleteButton(eventElement) {
        let deleteButton = document.createElement('span');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>'; 
        deleteButton.addEventListener('click', function (event) {
          deleteEvent(eventElement);
          event.stopPropagation(); // Prevent the click event from triggering the edit action
        });
      
        eventElement.appendChild(deleteButton);
      }
  
    // Function to hide the delete button
    function hideDeleteButton(eventElement) {
      let deleteButton = eventElement.querySelector('.delete-button');
      if (deleteButton) {
        eventElement.removeChild(deleteButton);
      }
    }
  
    // Function to delete an event
    function deleteEvent(eventElement) {
      // Remove the event element from the DOM
      eventElement.parentNode.removeChild(eventElement);
    
    }

    


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
  
        // Create a new event element
        let eventElement = document.createElement("div");
        eventElement.className = "event";
        eventElement.innerHTML = `
            <h3>${eventName} - ${eventType}</h3>
            <p>Date: ${eventDate}</p>
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

    let events = [
        {
          eventName: "Macy's Birthday Party",
          eventType: "Birthday",
          eventDate: "2023-07-21",
          startTime: "10:00",
          endTime: "12:00",
          eventDescription: "Celebrating a special day!",
        },
        {
          eventName: "Dylan's Wedding",
          eventType: "Wedding",
          eventDate: "2024-01-04",
          startTime: "14:30",
          endTime: "16:30",
          eventDescription: "I'm going to eat the whole cake.",
        },
      ];
    
      events.forEach(function (event) {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        let eventDate = new Date(event.eventDate);
        eventDate.setHours(0, 0, 0, 0);
    
        if (currentDate < eventDate) {
          // Upcoming event
          appendEventToSection(event, upcomingEventSection);
        } else {
          // Past event
          appendEventToSection(event, pastEventSection);
        }
      });
    });

  