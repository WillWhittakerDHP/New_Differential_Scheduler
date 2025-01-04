import express from 'express';
import { sequelize } from './config/connection.js';
import dotenv from 'dotenv';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const forceDatabaseRefresh = false;

// Use the calendarRouter for routes starting with '/calendar'
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));


sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
