import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../constants_and_context/AdminContext';
import { ADMIN_ROUTES } from '../../constants_and_context/apiRoutes';

interface AdditionalServiceEditorProps {
    handleSave: (type: keyof typeof ADMIN_ROUTES, id: number) => void;
    // other props
}


const AdditionalServiceEditor: React.FC<AdditionalServiceEditorProps> = ({ handleSave }) => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('AdditionalServiceEditor must be used within an AdminProvider');
    }

    const { allAdditionalServices, setAllAdditionalServices } = context;

    
    useEffect(() => {
        fetchadditionalServices('additionalServiceTypes');
    }, []);
    
    const fetchadditionalServices = async (type: keyof typeof ADMIN_ROUTES) => {
        const endpoint = `${ADMIN_ROUTES[type]}`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            // console.log('Fetched additionalServices:', data);
            setAllAdditionalServices(data);
        } catch (error) {
            console.error('Error fetching additionalServices:', error);
        }
    };

    const handleInputChange = (id: number, field: string, value: string | number) => {
        const updatedadditionalServices = allAdditionalServices.map((additionalService) =>
            additionalService.id === id ? { ...additionalService, [field]: value } : additionalService
        );
        setAllAdditionalServices(updatedadditionalServices);
    };

    return (
        <div>
            <h1>Edit additionalServices</h1>
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
                    {(!allAdditionalServices || allAdditionalServices.length === 0) ? (
                        <tr>
                            <td colSpan={4}>No additionalServices available</td>
                        </tr>
                    ) : (
                        allAdditionalServices.map((additionalService) => (
                            <tr key={additionalService.id}>
                                <td>{additionalService.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={additionalService.name || ''}
                                        onChange={(e) =>
                                            handleInputChange(additionalService.id, 'name', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={additionalService.description || ''}
                                        onChange={(e) =>
                                            handleInputChange(additionalService.id, 'description', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSave('additionalServiceTypes', additionalService.id)}
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

export default AdditionalServiceEditor;
