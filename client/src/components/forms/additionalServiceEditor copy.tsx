import React, { useEffect, useContext } from 'react';
import { AdminContext } from '../../constants_and_context/AdminContext';
import { ADMIN_ROUTES } from '../../constants_and_context/apiRoutes';

interface DwellingAdjustmentEditorProps {
    handleSave: (type: keyof typeof ADMIN_ROUTES, id: number) => void;
    // other props
}


const DwellingAdjustmentEditor: React.FC<DwellingAdjustmentEditorProps> = ({ handleSave }) => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('DwellingAdjustmentEditor must be used within an AdminProvider');
    }

    const { allDwellingAdjustments, setAllDwellingAdjustments } = context;

    
    useEffect(() => {
        fetchDwellingAdjustments('dwellingAdjustmentTypes');
    }, []);
    
    const fetchDwellingAdjustments = async (type: keyof typeof ADMIN_ROUTES) => {
        const endpoint = `${ADMIN_ROUTES[type]}`;
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            // console.log('Fetched DwellingAdjustments:', data);
            setAllDwellingAdjustments(data);
        } catch (error) {
            console.error('Error fetching DwellingAdjustments:', error);
        }
    };

    const handleInputChange = (id: number, field: string, value: string | number) => {
        const updatedDwellingAdjustments = allDwellingAdjustments.map((DwellingAdjustment) =>
            DwellingAdjustment.id === id ? { ...DwellingAdjustment, [field]: value } : DwellingAdjustment
        );
        setAllDwellingAdjustments(updatedDwellingAdjustments);
    };

    return (
        <div>
            <h1>Edit DwellingAdjustments</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {/* <th>Description</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {(!allDwellingAdjustments || allDwellingAdjustments.length === 0) ? (
                        <tr>
                            <td colSpan={4}>No DwellingAdjustments available</td>
                        </tr>
                    ) : (
                        allDwellingAdjustments.map((DwellingAdjustment) => (
                            <tr key={DwellingAdjustment.id}>
                                <td>{DwellingAdjustment.id}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={DwellingAdjustment.name || ''}
                                        onChange={(e) =>
                                            handleInputChange(DwellingAdjustment.id, 'name', e.target.value)
                                        }
                                    />
                                </td>
                                {/* <td>
                                    <textarea
                                        value={DwellingAdjustment.description || ''}
                                        onChange={(e) =>
                                            handleInputChange(DwellingAdjustment.id, 'description', e.target.value)
                                        }
                                    />
                                </td> */}
                                <td>
                                    <button
                                        onClick={() => handleSave('dwellingAdjustmentTypes', DwellingAdjustment.id)}
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

export default DwellingAdjustmentEditor;
