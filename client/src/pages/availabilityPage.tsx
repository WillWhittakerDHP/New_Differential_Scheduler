import { useNavigate } from 'react-router-dom'; 
import Calendar from "../components/calendar.js";
import {inspectorTimes, clientTimes} from "../data/timeData.js"

// import {getRandomData} from "../data/timeData.js"

// const inspectorTimes = {daysMap : getRandomData()}
// const clientTimes = {daysMap : getRandomData()}
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