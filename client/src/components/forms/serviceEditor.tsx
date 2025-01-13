import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../AdminContext';
import { ADMIN_ROUTES } from '../../constants/apiRoutes.js';

interface ServiceEditorProps {
    handleSave: (type: keyof typeof ADMIN_ROUTES, id: number) => void;
    // other props
}


const ServiceEditor: React.FC<ServiceEditorProps> = ({ handleSave }) => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('ServiceEditor must be used within an AdminProvider');
    }

    const { allServices, setAllServices } = context;

    
    useEffect(() => {
        fetchServices('serviceTypes');
    }, []);
    
    const fetchServices = async (type: keyof typeof ADMIN_ROUTES) => {
        const endpoint = `${ADMIN_ROUTES[type]}`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            // console.log('Fetched Services:', data);
            setAllServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleInputChange = (id: number, field: string, value: string | number) => {
        const updatedServices = allServices.map((service) =>
            service.id === id ? { ...service, [field]: value } : service
        );
        setAllServices(updatedServices);
    };

    return (
        <div>
            <h1>Edit Services</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(!allServices || allServices.length === 0) ? (
                        <tr>
                            <td colSpan={4}>No services available</td>
                        </tr>
                    ) : (
                        allServices.map((service) => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={service.name || ''}
                                        onChange={(e) =>
                                            handleInputChange(service.id, 'name', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={service.description || ''}
                                        onChange={(e) =>
                                            handleInputChange(service.id, 'description', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSave('serviceTypes', service.id)}
                                    >
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceEditor;
