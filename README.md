# Development Guide

## Dependencies

Install Git Large File Storage. https://git-lfs.com/

Install Docker.

Install Nodejs.

## Project Setup

Clone the repo.

Build and run the project using `docker compose up`.

### Seed Data

- Navigate to `/backend` directory

- install dependencies `npm i`

- Copy contents of `.env.template` to `.env` file.

- Run the migrations `npm run migrate up`

- Seed the data `npm run seed`

### Run the project

Navigate to `http://127.0.0.1:3000/` to access webserver and `http://127.0.0.1:4200/` to access API server.
