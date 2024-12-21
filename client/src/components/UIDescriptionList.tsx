import React from 'react';

import type { UIDescriptionsData } from '../interfaces/appointmentInterfaces';

// Define the props for the component
interface UIDescriptionsListProps {
    UIDescriptions: UIDescriptionsData[] | null; 
}

const UIDescriptionsList: React.FC<UIDescriptionsListProps> = ({ UIDescriptions }) => {
    return (
    <>
        {UIDescriptions && UIDescriptions.map((UIDescriptions) => (
            <div className="card mb-3" key={UIDescriptions.ui_description_set_id}>
                <h4 className="card-header bg-primary text-light p-2 m-0">{UIDescriptions.buyer_description}</h4>
                <h4 className="card-header bg-primary text-light p-2 m-0">{UIDescriptions.agent_description}</h4>
                <h4 className="card-header bg-primary text-light p-2 m-0">{UIDescriptions.owner_description}</h4>
                <div className="card-body bg-light p-2">
                    <p>{UIDescriptions.ui_description_set_id}</p>
                </div>
            </div>
        ))}
        </>
    );
};

export default UIDescriptionsList;
