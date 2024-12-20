import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import { sequelize } from './config/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

// Use the calendarRouter for routes starting with '/calendar'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

// Your server's listening port

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
