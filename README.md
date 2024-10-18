# Safari Project 
## Travel App - Joy Muthoka
## Date : 14/10/2024

### Destination Post

Description: An application that allows user to compare multiple destinations and allows them to select their preferred destination according to their taste and budget.


### Problem Statement
Travellers are always in need to find accommodation that best suits them in terms of budget and convenience. They tend to visit multiple websites to compare destinations and hence can be very tiresome. This app provides a centralized place to display information about multiple destinations. 

### Solution statement
Create a Travels App that allows users to browse through multiple destinations and be able to easily compare prices and ambience.


### Project MVP/User Stories
A user:
- can view all the available destinations : The app sends GET request for all destinations from the api
- can view details of individual destinations: The app sends GET request for individual destination. The individual destination should have: id, name, image/s, date form, description, cost, availability, button for booking
- can book their stay at their preferred destination : The app sends a POST request to add a booking of a specific user 
- can cancel their stay at a specific destination : The app sends a DELETE request to cancel booking of a specific user 
- can change the dates to which they want to visit destination: The app sends a PATCH request to modify dates for the stay in the destination and update the api.

### Technologies Used
HTML
CSS
Javascript
Bootstrap
json-server

### Future Plans
1. Implement user comment section where reviews can be made and shared.
