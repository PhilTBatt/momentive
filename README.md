# [Momentive](https://momentive.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js-000?style=plastic&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=plastic&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=plastic&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=plastic&logo=postgresql&logoColor=white)
![Apollo Server](https://img.shields.io/badge/Apollo_Server-311C87?style=plastic&logo=apollo-graphql&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=plastic&logo=graphql&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=plastic)
![Neon](https://img.shields.io/badge/Neon-000000?style=plastic&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled--Components-db7093?style=plastic&logo=styled-components&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=plastic&logo=fontawesome&logoColor=white)

This platform was contracted for by Tech Returners.

Momentive is a community-driven events platform where staff can share events with members of the community. Staff members can make an account, create and manage events, and see who is attending, whilst guests can easily browse and register for events without needing an account. They can also add it straight to their Google calender.

## Prerequisites
Node.js (v18 or higher)

npm (v9 or higher)

PostgreSQL (v12 or higher)

## To run this project locally

 1. Open your terminal and run the following command to clone the repository to your local machine:
`git clone https://github.com/PhilTBatt/nc-news`

2. Navigate into the cloned repository and run the following command to install the required dependencies:
`npm install`

3. Create a `.env` file in the root of your project directory. You will need to define your `DATABASE_URL` for your PostgreSQL connection: `postgres://<username>:<password>@localhost:5432/<database-name>`

4. In the terminal use `npm run setup` to create teh database schema

5. Run the application so you can access it at http://localhost:5173
`npm run dev`

6. Sign up and use staff code 1234 when creating an account to start managing events
