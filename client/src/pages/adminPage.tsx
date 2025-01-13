import React, { useContext, useCallback, useEffect } from 'react';
import { AdminContext, AdminProvider } from '../components/AdminContext';
import ServiceEditor from '../components/forms/serviceEditor';
import { ADMIN_ROUTES } from '../constants/apiRoutes.js';

const AdminPageContent = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('AdminPageContent must be used within an AdminProvider');
    }

    const {
        allServices,
        setAllServices,
        allAdditionalServices,
        setAllAdditionalServices,
        allDwellingAdjustments,
        setAllDwellingAdjustments,
        allAvailabilityOptions,
        setAllAvailabilityOptions,
    } = context;

    // Fetch all data once on mount
    const fetchAllData = useCallback(async () => {
        try {
            const [services, additionalServices, dwellingAdjustments, availabilityOptions] =
                await Promise.all([
                    fetch('/internal/admin/serviceTypes').then((res) => res.json()),
                    fetch('/internal/admin/additionalServiceTypes').then((res) => res.json()),
                    fetch('/internal/admin/dwellingAdjustmentTypes').then((res) => res.json()),
                    fetch('/internal/admin/availabilityOptionTypes').then((res) => res.json()),
                ]);

            setAllServices(services);
            setAllAdditionalServices(additionalServices);
            setAllDwellingAdjustments(dwellingAdjustments);
            setAllAvailabilityOptions(availabilityOptions);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    }, [setAllServices, setAllAdditionalServices, setAllDwellingAdjustments, setAllAvailabilityOptions]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Handle Save for Individual Sections
    const handleSave = async (type: keyof typeof ADMIN_ROUTES, id: number) => {
        const endpoint = `${ADMIN_ROUTES[type]}/${id}`;
        
        let dataToUpdate;
        const arrayToSearch =
            type === 'serviceTypes' ? allServices
            : type === 'additionalServiceTypes' ? allAdditionalServices
            : type === 'dwellingAdjustmentTypes' ? allDwellingAdjustments
            : type === 'availabilityOptionTypes' ? allAvailabilityOptions
            : null;
    
        if (!arrayToSearch) {
            console.error(`Unknown type: ${type}`);
            return;
        }
        
        dataToUpdate = arrayToSearch.find((item) => {
            // console.log(`Comparing item.id (${item.id}) with id (${id})`);
            return item.id === id;
        });
    
        if (!dataToUpdate) {
            console.error(`No data found for ID: ${id} in ${type}`);
            return;
        }
        
        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToUpdate),
            });
    
            if (response.ok) {
                alert(`Data with ID ${id} updated successfully!`);
            } else {
                console.error(`Failed to update data:`, response.statusText);
            }
        } catch (error) {
            console.error(`Error updating data:`, error);
        }
    };
    

    return (
        <div>
            <h1>Admin Page</h1>
            <ServiceEditor
                handleSave={handleSave}
            />
            {/* <Section
                title="Additional Services"
                data={allAdditionalServices}
                type="additionalService"
                handleUpdate={(type, id, field, value) => {
                    const updatedData = allAdditionalServices.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    );
                    setAllAdditionalServices(updatedData);
                }}
                handleSave={handleSave}
            />

            <Section
                title="Dwelling Adjustments"
                data={allDwellingAdjustments}
                type="dwellingAdjustment"
                handleUpdate={(type, id, field, value) => {
                    const updatedData = allDwellingAdjustments.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    );
                    setAllDwellingAdjustments(updatedData);
                }}
                handleSave={handleSave}
            />

            <Section
                title="Availability Options"
                data={allAvailabilityOptions}
                type="availability"
                handleUpdate={(type, id, field, value) => {
                    const updatedData = allAvailabilityOptions.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    );
                    setAllAvailabilityOptions(updatedData);
                }}
                handleSave={handleSave}
            /> */}
        </div>
    );
};

const AdminPage =() => {
    return (
    <AdminProvider>
        <AdminPageContent />
    </AdminProvider>);
};

export default AdminPage;