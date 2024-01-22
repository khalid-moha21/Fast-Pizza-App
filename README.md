#This is a simple demo Pizza deivery project with the following features:
1, users input their names before using the app
2, the pizza menu is loaded from an external API
3, users can add mutltiple pizzas to a cart before ordering
4, ordering requires just the user's name, phone number, and address
5, The address can be inputted either manually or automatically obtained through GPS(Geolocation and Reverse Geolocation API)
6, user's can mark their order as 'priority' for an additional 20% of the cart price
7, orders are made by sending a POST request with the order data (user data and cart data) to the "restaurant's" API
8, no payment process are intergated in the app, payments are made on delivery😉
9, each order gets a uniqe ID which is displayed along with other order details after ordering, the user can later keep track of the order based on the ID.

#Technical focus:
1, Redux and RTK with thunks
2, React router(V6) with data loading
3, Tailwind CSS for styling
3, Setting up proffesional features based file structure 
4, Interacting with API
