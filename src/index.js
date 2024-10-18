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
                <div class="description-mini" id="mini-description">
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
                <button class="btn btn-success btn-sm booking-button" data-bs-toggle="modal" data-bs-target="#exampleModal" data-destination-id="${hotel.id}">Book Now</button>
                <div id="updatedBooking"></div>  
                 </div>                         
            `

        }
    })
}
//Function that gets first destination
function getFirstDestination(){
    fetch('http://localhost:3000/destinations/1')
    .then((response) => response.json())
    .then((data) => {
        mainDiv = document.getElementById("main-description")
        mainDiv.innerHTML = `
           <h2 class="fw-bold">${data.name}</h2>
            <div class="description-labels">
                <p class="fs-6 fw-bold">${data.location}</p>
                <p class="fs-6 fw-bold">$${data.cost}</p>
            </div>
            <div class="para-details">
                <p class="fs-6">
                   ${data.description}It includes features such as ${data.amenities.join()}. With a rating of ${data.rating}, be sure you'll enjoy your stay at ${data.name}
                </p>

            </div>
            <button class="booking-btn btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" data-destination-id="${hotel.id}">
                Book Us Now
            </button>                        
            <div id="updatedBooking">
                <!-- <span>Booked for : {date}</span><button class="btn btn-info btn-sm">Change</button> -->
            </div> 
        `
        mainSectionImg = document.getElementById("main-section")
        mainSectionImg.style.backgroundImage = `url('${data.imageUrl}')`;


    }); 

}

//function to show booking form 
function createForm(){
    // Create the Bootstrap modal instance
    const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
        keyboard: false
      });

      // Show the modal when the button is clicked
      myModal.show();

}
//function that creates booking while updating on available rooms
function makeBooking(id){
    //Pop up form

   


}
//Function that updates available rooms on posting a booking
//Function that delete booking
//function that creates user

//Call the functions
getDestinations()
getFirstDestination()

scrollToLeft()
scrollToRight()
})

// var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
// myModal.show();
