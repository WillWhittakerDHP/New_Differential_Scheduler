import React, { useContext, useMemo } from 'react';
import { AdminContext, AdminContextType, AdminProvider } from '../context/AdminContext.js';
import { ADMIN_ROUTES } from '../api/internalAPI/apiRoutes.js';
import GenericEditor from '../components/forms/genericEditor.js';

import { UserTypeData, ServiceData, AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData } from '../interfaces/apiInterfaces.js';

const AdminPageContent = () => {
    const context = useContext(AdminContext);

    // Check if the context exists
    if (!context) {
        throw new Error('AdminPageContent must be used within an AdminProvider');
    }

    const userTypeFields = useMemo(() => ['name', 'description', 'visibility'] as (keyof UserTypeData)[], []);
    const serviceTypeFields = useMemo(() => ['name', 'description', 'visibility', 'base_sq_ft'] as (keyof ServiceData)[], []);
    const dwellingAdjustmentFields = useMemo(() => ['name', 'visibility', 'base_sq_ft'] as (keyof DwellingAdjustmentData)[], []);
    const additionalServiceFields = useMemo(() => ['name', 'description', 'visibility', 'base_sq_ft'] as (keyof AdditionalServiceData)[], []);
    const availabilityOptionFields = useMemo(() => ['name', 'description', 'visibility', 'base_sq_ft'] as (keyof AvailabilityOptionData)[], []);


    interface AssociationType {
        type: keyof typeof ADMIN_ROUTES; // Valid keys from ADMIN_ROUTES
        label: string; // Label for the UI
        key: keyof AdminContextType['associationData']; // Must match keys in associationData
    }

    const userTypeAssociations: AssociationType[] = useMemo(() => [
        { 
            type: 'serviceTypes', 
            label: 'Associated Services', 
            key: 'serviceTypes' },
    ], []);
    const serviceTypeAssociations: AssociationType[] = useMemo (() => [
        {
            type: 'additionalServiceTypes',
            label: 'Additional Services',
            key: 'additionalServiceTypes',
        },
        {
            type: 'availabilityOptionTypes',
            label: 'Availability Options',
            key: 'availabilityOptionTypes',
        },
    ], [])

    return (
        <div>
            <h1>Admin Page</h1>

            {/* User Type Editor */}
            <GenericEditor
                type="userTypes"
                entityName="User Type"
                fields={userTypeFields}
                hasAppointmentBlocks={false}
                associations={userTypeAssociations}
                
            />

            {/* Service Type Editor */}
            <GenericEditor
                type="serviceTypes"
                entityName="Service"
                fields={serviceTypeFields}
                hasAppointmentBlocks={true}
                associations={serviceTypeAssociations}
            />

            {/* Dwelling Adjustment Editor */}
            <GenericEditor
                type="dwellingAdjustmentTypes"
                entityName="Dwelling Adjustment"
                hasAppointmentBlocks={true}
                fields={dwellingAdjustmentFields}
            />

            {/* Additional Service Editor */}
            <GenericEditor
                type="additionalServiceTypes"
                entityName="Additional Service"
                hasAppointmentBlocks={true}
                fields={additionalServiceFields}
            />

            {/* Availability Option Editor */}
            <GenericEditor
                type="availabilityOptionTypes"
                entityName="Availability Options"
                hasAppointmentBlocks={true}
                fields={availabilityOptionFields}
            />
        </div>
    );
};

const AdminPage = () => {
    return (
        <AdminProvider>
            <AdminPageContent />
        </AdminProvider>
    );
};

export default AdminPage;
