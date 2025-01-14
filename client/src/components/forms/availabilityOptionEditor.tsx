import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../constants_and_context/AdminContext';
import { ADMIN_ROUTES } from '../../constants_and_context/apiRoutes';

interface AvailabilityOptionEditorProps {
    handleSave: (type: keyof typeof ADMIN_ROUTES, id: number) => void;
    // other props
}


const AvailabilityOptionEditor: React.FC<AvailabilityOptionEditorProps> = ({ handleSave }) => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('AvailabilityOptionEditor must be used within an AdminProvider');
    }

    const { allAvailabilityOptions, setAllAvailabilityOptions } = context;

    
    useEffect(() => {
        fetchavailabilityOptions('availabilityOptionTypes');
    }, []);
    
    const fetchavailabilityOptions = async (type: keyof typeof ADMIN_ROUTES) => {
        const endpoint = `${ADMIN_ROUTES[type]}`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            // console.log('Fetched availabilityOptions:', data);
            setAllAvailabilityOptions(data);
        } catch (error) {
            console.error('Error fetching availabilityOptions:', error);
        }
    };

    const handleInputChange = (id: number, field: string, value: string | number) => {
        const updatedavailabilityOptions = allAvailabilityOptions.map((availabilityOption) =>
            availabilityOption.id === id ? { ...availabilityOption, [field]: value } : availabilityOption
        );
        setAllAvailabilityOptions(updatedavailabilityOptions);
    };

    return (
        <div>
            <h1>Edit availabilityOptions</h1>
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
                    {(!allAvailabilityOptions || allAvailabilityOptions.length === 0) ? (
                        <tr>
                            <td colSpan={4}>No availabilityOptions available</td>
                        </tr>
                    ) : (
                        allAvailabilityOptions.map((availabilityOption) => (
                            <tr key={availabilityOption.id}>
                                <td>{availabilityOption.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={availabilityOption.name || ''}
                                        onChange={(e) =>
                                            handleInputChange(availabilityOption.id, 'name', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={availabilityOption.description || ''}
                                        onChange={(e) =>
                                            handleInputChange(availabilityOption.id, 'description', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSave('availabilityOptionTypes', availabilityOption.id)}
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

export default AvailabilityOptionEditor;
