import React from 'react';

import type { ServiceData } from '../interfaces/appointmentInterfaces';

// Define the props for the component
interface ServicesListProps {
    Services: ServiceData[] | null; 
}

const ServicesList: React.FC<ServicesListProps> = ({ Services }) => {
    return (
    <>
        {Services && Services.map((Services) => (
            <div className="card mb-3" key={Services.service_id}>
                <h4 className="card-header bg-primary text-light p-2 m-0">{Services.title}</h4>
                <div className="card-body bg-light p-2">
                    <p>{Services.service_id}</p>
                </div>
            </div>
        ))}
        </>
    );
};

export default ServicesList;
