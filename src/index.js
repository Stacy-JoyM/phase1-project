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
    // http://localhost:3000/destinations
    // http://localhost:3000/bookings
    // http://localhost:3000/users
    //Function that gets destinations
    function getDestinations(){
        fetch("http://localhost:3000/destinations")
        .then((res)=> res.json())
        .then((data)=>{
            scrollContentsDiv= document.getElementById("scrollable-content")
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
                        <!-- <button id="changeButton" class="btn btn-info btn-sm ms-3"
                          onclick="updateBooking(${hotel.id})">
                            Change
                         </button> !-->
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
                    button.addEventListener("click", function (e) {
                        e.preventDefault()
                        // Get the hotel ID from the data-id attribute
                        const hotelName = this.getAttribute("data-destination-name")
                        console.log(hotelName)
                        const hotelId = parseInt(this.getAttribute("data-destination-id"));
                        
                        // Pass the hotel ID to the booking form when clicked
                        setupBookingForm(hotelId, hotelName);
                    });
                });

            }
        })
    }
    //Function that gets clicked destination and displays on main div , on DOM reload displays the first destination
    function getMainDisplay(destinationId =1 ){
        fetch(`http://localhost:3000/destinations/${destinationId}`)
        .then((response) => response.json())
        .then((data) => {
            //Display the main div with destination selected
            mainDiv = document.getElementById("main-description")
            mainDiv.innerHTML = `
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
                <button class="booking-btn btn btn-success"
                    data-destination-id ="${data.id}" 
                    data-destination-name = "${data.name}" 
                    data-bs-toggle="modal" 
                    data-bs-target="#exampleModal">
                    Book Us Now
                </button>                        
                <div id="updatedBooking-${hotel.id}">
                   
                </div> 
            `
            mainSectionImg = document.getElementById("main-section")
            mainSectionImg.style.backgroundImage = `url('${data.imageUrl}')`;


        }); 
    } 
    
    //Function that handles click of any description div to display main
    function handleDescriptionDiv() {
        // After destinations are rendered, attach click listeners to each .description-mini
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
        fetch('http://localhost:3000/bookings')
            .then((response) => response.json())
            .then((data) => {
                for(let item of data){
                    bookingsId.push(parseInt(item.id)) //adds ids to bookingId array
                    
                }
            })
            .catch((error) => {
                console.error('Error fetching bookings:', error);
            });
    }


        //function that posts new booking 
        function setupBookingForm(hotelId, hotelName) {
        //get values from date form submit
        document.getElementById("bookingForm").addEventListener("submit" ,function(e) {
            e.preventDefault(); // Prevent default form submission
    
            let startDate = document.getElementById("startDate").value;
            let endDate = document.getElementById("endDate").value;

            //get the highest id from array using reduce
            //Sets max as 0, then compares with booking id to return the highest value
            let highestId = bookingsId.reduce((max, booking) => booking > max ? booking : max, 0);

             // Fetch the modal element in order to close on submit
            const modalElement = document.getElementById('exampleModal');
            const modal = bootstrap.Modal.getInstance(modalElement); 
            modal.hide()

    
            // Post it to booking, booking needs destination id
            fetch('http://localhost:3000/bookings', {
                method: 'POST',
                body: JSON.stringify({
                    destinationId: hotelId,
                    destinationName:hotelName, 
                    startDate: startDate,
                    endDate: endDate,
                    id: highestId+ 1
                }),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => response.json())
            .then((json) => {
                alert(`You have successfully made a booking at ${hotelName}`)

            })
        })
        
    }

    //Function that delete booking
    function deleteBooking(id){
        fetch(`http://localhost:3000/bookings/${id}`, {
            method: 'DELETE',
        });


    }
    //Function that updates 
    function updateBooking(id){
        //Get the modal form appear
        let modalForm = new bootstrap.Modal(document.getElementById('exampleModal'));
        modalForm.show();  // This will show the modal
        //Listen to form submit event
        document.getElementById("bookingForm").addEventListener("submit" ,function(e) {
            e.preventDefault(); // Prevent default form submission
    
            let startDate = document.getElementById("startDate").value;
            let endDate = document.getElementById("endDate").value;

            fetch(`http://localhost:3000/bookings/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                startDate: startDate,
                endDate:endDate
                }),
                headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
            

        })
    }

//Call the functions
getDestinations()
getMainDisplay()
fetchBookings()
handleDescriptionDiv()

scrollToLeft()
scrollToRight()

})
