# Synopsis

This is a test to create a booking API. We'll be using doctolib as an example. 

***A Doctor does not have enough time to answer all his phone calls to take new appointments.*** 

### Guidelines

1. Develop a web service to obtain all the availabilities from the medical cabinet for a specific date. 
* URL: http://localhost:3000/visits
* Method used: GET
* Query params: "date" (example: "2019-01-31")
* GET: http://localhost:3000/visits?date=2019-01-31 will return a status 200 with an object including all the times slots available for this date. 

2. The second web service will be used to book a time slot. 
* URL: http://localhost:3000/visits 
* Method used: POST
* Query params: 
  * "date" (example: "2019-01-31")
  * "slot" (example: "1500" for 3pm)
  * "name" (example: "John")
* POST : we will post an object to http://localhost:3000/visits using the query params specified above. It will return a status 200 with a message saying "successfully booked"
* If the time slot is unaivalable, we will receive a status 400 with the message "slot already booked". 

## Directory Structure

```bash

doctolib_api
├── .git
├── .gitignore
├── index.js
├── package.json
└── README.md

```

## Built With

* [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
* [Node.js](https://nodejs.org/en/)
* [Express.js](https://expressjs.com/)
* [Postman](https://www.getpostman.com/)

## Dependencies

* [body-parser](https://www.npmjs.com/package/body-parser)
* [Nodemon](https://www.npmjs.com/package/nodemon)

## Acknowledgments

* This is part of a FullStack Developer Bootcamp [@Le Reacteur](https://www.lereacteur.io)
