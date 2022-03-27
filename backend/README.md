To run the backend you will need to have a MySQLWorkbench and mySQL installed
You will have to create a schema called 2Use
The information to connect to the database is in backend/config/config.json under development.

You will need to create a .env file in the backend directory, with: 
STRIPE_PRIVATE_KEY=<your stripe private key>
JWT_SECRET=<jwt secret>
CLIENT_URL=http://localhost:3000

You will have two terminal windows, one for the frontend and one for the backend
To run the back end:

### `cd backend`

### `npm run devStart`

