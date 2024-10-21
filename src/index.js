//Manipulating DOM, Using Event Listeners, Using array methods, Using API request

document.addEventListener("DOMContentLoaded", function(){

    //Add scroll functionality to the arrows
    scrollableContent = document.querySelector(".scrollable-content")

     // Left scroll button functionality
     const leftButton = document.getElementById('scroll-left'); 
     leftButton.addEventListener('click', () => {
         scrollableContent.scrollBy({
             left: -300,
             behavior: "smooth"
         });
     });
 
     // Right scroll button functionality
     const rightButton = document.getElementById('scroll-right'); 
     rightButton.addEventListener('click', () => {
         scrollableContent.scrollBy({
             left: 300,
             behavior: "smooth"
         });
     });

    //Function that gets destinations
    function getDestinations(){
        fetch("https://phase1-project-gfgp.onrender.com/destinations")
        .then((res)=> res.json())
        .then((data)=>{
            scrollContentsDiv= document.getElementById("scrollable-content")

             // Clear the container before populating it
             scrollContentsDiv.innerHTML = '';
            //Loop through data and display on DOM
            for (hotel of data){
                console.log(hotel)
                scrollContentsDiv.innerHTML += ` 
                    <div class="description-mini position-relative" 
                        id="mini-description-${hotel.id}" 
                        data-destination-id ="${hotel.id}">
                    <img src="${hotel.imageUrl}" alt="Picture1" class="img-thumbnail">
                    <h6 class="small-text fw-bold">${hotel.name}</h6>
                    <div class="description-labels">
                        <p class="small-text fw-light">${hotel.location}</p>
                        <p class="small-text fw-light">$${hotel.cost}</p>
                    </div>
                    <div class="para-details">
                        <p class="small-text"> ${hotel.description}.
                        </p>
                    </div>
                    <div class="buttons">
                        <button class="btn btn-success btn-sm booking-button" 
                            data-destination-id ="${hotel.id}" 
                            data-destination-name = "${hotel.name}" 
                            data-bs-toggle="modal" 
                            data-bs-target="#exampleModal"> 
                            Book Now
                        </button> 
                    </div> 
                    </div>                    
                `

                // Attach event listener to each booking button
                document.querySelectorAll(".booking-button").forEach((button) => {
                    button.addEventListener("click", function() {
                        // Call setupBookingForm when the button is clicked with data attributes from div
                        setupBookingForm(this.getAttribute("data-destination-id"), this.getAttribute("data-destination-name"));
                    });
                });
            }
            //call mainDisplay function with default id of first destination
            getMainDisplay(data[0].id)
        })
    }
    //Function that gets main display destination details
    function getMainDisplay(destinationId){
        fetch(`https://phase1-project-gfgp.onrender.com/destinations/${destinationId}`)
        .then((response) => response.json())
        .then((data) => {

            mainDiv = document.getElementById("main-description") //Access the mainDiv
            mainDiv.innerHTML = "" //Clear previous content
            mainDiv.innerHTML += `
            <h2 class="fw-bold">${data.name}</h2>
                <div class="description-labels">
                    <p class="fs-6 fw-bold">${data.location}</p>
                    <p class="fs-6 fw-bold">$${data.cost}</p>
                </div>
                <div class="para-details">
                    <p class="fs-6">
                    ${data.description}It includes features such as ${data.amenities.join()}. 
                    With a rating of ${data.rating}, be sure you'll enjoy your stay at ${data.name}
                    </p>

                </div>
                <button class="booking-btn btn btn-success" id="mainBookingBtn"
                    data-destination-id ="${data.id}" 
                    data-destination-name = "${data.name}" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal">
                    Book Us Now
                </button>                        
                <div id="updatedBooking-${hotel.id}">
                   
                </div> 
            `
            //Change the background image
            mainSectionImg = document.getElementById("main-section")
            mainSectionImg.style.backgroundImage = `url('${data.imageUrl}')`;

            //Attach event listener to booking button
            let mainBookingButton = document.getElementById("mainBookingBtn")
            mainBookingButton.addEventListener("click", function() {
                // Call setupBookingForm with data attributes from div
                setupBookingForm(this.getAttribute("data-destination-id"), this.getAttribute("data-destination-name"));
            });
            
        }); 
    } 
    
    //Function that handles the click of destinations and calls mainDisplay function
    function handleDescriptionDiv() {
        // Attach click listeners to each .description-mini
        const container = document.getElementById("scrollable-content");
    
        // Event delegation: Attach event listener to the parent container
        container.addEventListener("click", function(e) {
            const div = e.target.closest(".description-mini");
            if (div) {
                e.preventDefault();
                // Extract the destination ID using the data attribute
                const destinationId = div.dataset.destinationId;

                // Call the function to display the main description
                getMainDisplay(destinationId);
                };
            });
    }

    //Define global variable that will store bookings id for increment
    let bookingsId= []

    // Function to fetch bookings from the server
    function fetchBookings() {
        fetch('https://phase1-project-gfgp.onrender.com/bookings')
            .then((response) => response.json())
            .then((data) => {
                //loop through data then for each data.id push it to the bookingId array
                data.forEach(booking => bookingsId.push(parseInt(booking.id)))
            })
    }


    //function that listens to form submit event then calls postBooking function
    function setupBookingForm(hotelId, hotelName) {
        const bookingForm = document.getElementById("bookingForm");
        bookingForm.removeEventListener("submit", postBooking);
        bookingForm.addEventListener("submit", function(e) {
            postBooking(e, hotelId, hotelName);  // Pass the hotel ID and name directly
        });
    }

    //function that posts new booking
    function postBooking(e, hotelId, hotelName) {
        e.preventDefault(); // Prevent default form submission

        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        // Check that startDate, endDate, hotelId, and hotelName are valid
        if (!startDate || !endDate) {
            alert("Please fill in all booking details.");
            return;
        }

        // Get the highest id from the bookings array to add id in db.json
        let highestId = bookingsId.reduce((max, booking) => booking > max ? booking : max, 0);

        // Post it to booking
        fetch('https://phase1-project-gfgp.onrender.com/bookings', {
            method: 'POST',
            body: JSON.stringify({
                destinationId: hotelId,
                destinationName: hotelName, 
                startDate: startDate,
                endDate: endDate,
                id: highestId + 1
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => {
            alert(`You have successfully made a booking at ${hotelName}`);

            // Add the new id in the bookingid
            bookingsId.push(highestId + 1);


             // Close the modal using Bootstrap's modal API
            const modalElement = document.getElementById('exampleModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
          
        })
    }

//Call the functions
getDestinations()
fetchBookings()
handleDescriptionDiv()
scrollToLeft()
scrollToRight()

})
