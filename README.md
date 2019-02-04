# Synopsis

This is a booking API. We'll be using doctolib as an example.

**_A Doctor does not have enough time to answer all his phone calls to take new appointments._**

### Guidelines

1. Develop a web service to obtain all the availabilities from the medical cabinet for a specific date.

- Route

```bash
/visits
```

2. The second web service will be used to book a time slot.

- Route

```bash
/visits/booking
```

Functionality:

- a patient cannot view, nor reserve a date in the past, nor on Sundays.

## Directory Structure

```bash

doctolib_api
├── .gitignore
├── index.js
├── package.json
├── slotsTemplate.json
└── README.md

```

## Running the project

Clone this repository :

```bash
git clone https://github.com/alexdisdier/doctolib-api.git

cd doctolib-api
```

Install packages

```bash
npm install
```

When installation is complete, start the server using this command.

```bash
nodemon index.js
```

ps. I recommend to install [Postman](https://www.getpostman.com/) to improve the API development

## Built With

- [JavaScript](https://developer.mozilla.org/bm/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/) -> Create a robust API
- [Postman](https://www.getpostman.com/) -> Improves API development

## Dependencies

- [body-parser](https://www.npmjs.com/package/body-parser)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [date-fns](https://www.npmjs.com/package/date-fns)

## Acknowledgments

- This is part of a FullStack Developer Bootcamp [@Le Reacteur](https://www.lereacteur.io)
