# [Momentive](https://momentive.vercel.app)
This platform was contracted for by Tech Returners.

Momentive is a community-driven events platform where staff can share events with members of the community. Staff members can make an account, create and manage events, and see who is attending, whilst guests can easily browse and register for events without needing an account. They can also add it straight to their Google calender.


## Code Stack
Language: TypeScript

Frontend & API: Next.js

Styling: Styled Components

Database: PostgreSQL

Linting: ESLint

Deployment: Vercel

## Prerequisites
Node.js (v18 or higher)

npm (v9 or higher)

## To run this project locally

 1. Open your terminal and run the following command to clone the repository to your local machine:
`git clone https://github.com/PhilTBatt/nc-news`

2. Navigate into the cloned repository and run the following command to install the required dependencies:
`npm install`

3. Create a `.env` file in the root of your project directory. You will need to define your `DATABASE_URL` for your PostgreSQL connection: `postgres://<username>:<password>@localhost:5432/<database-name>`

4. In the terminal use `npm run setup` to create teh database schema

5. Run the application so you can access it at http://localhost:5173
`npm run dev`

6. Use staff code 1234 to create a staff account and start managing events. 