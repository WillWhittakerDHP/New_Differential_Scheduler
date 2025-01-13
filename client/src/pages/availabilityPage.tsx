import { useNavigate } from 'react-router-dom'; 
import Calendar from '../utils/availability/calendar.js';
import {inspectorTimes, clientTimes} from "../utils/availability/timeData.js"

import AvailabilityOptionsList from '../components/lists/AvailabilityOptionsList.js';

const AvailabilityPage = () => {
    const navigate = useNavigate(); // Initialize navigate for navigation

    const handlePrevious = () => {
      navigate('/propertyDetails'); 
    };

    const handleNext = () => {
      navigate('/personalInformation'); 
    };

    return (
      <>
<AvailabilityOptionsList />
        <section>       
          <h1>Appointment Availability</h1>
          <Calendar
          inspectorTimes={inspectorTimes}
          clientTimes={clientTimes}
          /> 
        </section>

        <div className="button-container">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>

      </>
    );
  };
  
  export default AvailabilityPage;