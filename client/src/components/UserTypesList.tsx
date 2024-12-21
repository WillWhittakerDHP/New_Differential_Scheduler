import React from 'react';

import type { UserTypeData } from '../interfaces/appointmentInterfaces';

// Define the props for the component
interface UserTypesListProps {
    UserTypes: UserTypeData[] | null; 
}

const UserTypesList: React.FC<UserTypesListProps> = ({ UserTypes }) => {
    return (
    <>
        {UserTypes && UserTypes.map((UserTypes) => (
            <div className="card mb-3" key={UserTypes.user_type_id}>
                <h4 className="card-header bg-primary text-light p-2 m-0">{UserTypes.user_type}</h4>
                <div className="card-body bg-light p-2">
                    <p>{UserTypes.user_type_id}</p>
                </div>
            </div>
        ))}
        </>
    );
};

export default UserTypesList;
