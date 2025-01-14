import React, { useEffect, useContext, useState } from 'react';
import { AdminContext } from '../../constants_and_context/AdminContext';
import { ADMIN_ROUTES } from '../../constants_and_context/apiRoutes';

interface ServiceEditorProps {
    handleSave: (type: keyof typeof ADMIN_ROUTES, id: number) => void;
}

const ServiceEditor: React.FC<ServiceEditorProps> = ({ handleSave }) => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('ServiceEditor must be used within an AdminProvider');
    }

    const { allServices, setAllServices, allAdditionalServices, setAllAdditionalServices } = context;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
        fetchAdditionalServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch(`${ADMIN_ROUTES.serviceTypes}`);
            const data = await response.json();
            // console.log('Fetched Services:', data);
            setAllServices(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdditionalServices = async () => {
        try {
            const response = await fetch(`${ADMIN_ROUTES.additionalServiceTypes}`);
            const data = await response.json();
            // console.log('Fetched AdditionalServices:', data);
            setAllServices(data);
        } catch (error) {
            console.error('Error fetching additionalServices:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdditionalServicesChange = (serviceId: number, selectedIds: number[]) => {
        setAllServices((prev) =>
            prev.map((service) =>
                service.id === serviceId
                    ? {
                        ...service,
                        AdditionalServices: allAdditionalServices.filter((a) =>
                            selectedIds.includes(a.id)
                        ), // Update with selected services
                    }
                    : service
            )
        );
    };
    

    const handleInputChange = (serviceId: number, field: string, value: string | number) => {
        setAllServices((prev) =>
            prev.map((service) =>
                service.id === serviceId
                    ? { ...service, [field]: value }
                    : service
            )
        );
    };

    const handleVisibilityChange = (serviceId: number, isVisible: boolean) => {
        setAllServices((prev) =>
            prev.map((service) =>
                service.id === serviceId
                    ? { ...service, visibility: isVisible }
                    : service
            )
        );
    };
    
        const handleDataCollectionChange = (
            serviceId: number,
            field: string,
            value: string | number
        ) => {
            console.log(`Updating service ${serviceId}: ${field} -> ${value}`);
            setAllServices((prev) =>
                prev.map((service) =>
                    service.id === serviceId
                        ? {
                                ...service,
                                data_collection: {
                                    ...service.data_collection,
                                    [field]: value,
                                },
                            }
                        : service
                )
            );
        };

    const handleReportWritingChange = (
        serviceId: number,
        field: string,
        value: string | number
    ) => {
        console.log(`Updating service ${serviceId}: ${field} -> ${value}`);
        setAllServices((prev) =>
            prev.map((service) =>
                service.id === serviceId
                    ? {
                            ...service,
                            report_writing: {
                                ...service.report_writing,
                                [field]: value,
                            },
                        }
                    : service
            )
        );
    };
    


    const handleClientPresentationChange = (
        serviceId: number,
        field: string,
        value: string | number
    ) => {
        console.log(`Updating service ${serviceId}: ${field} -> ${value}`);
        setAllServices((prev) =>
            prev.map((service) =>
                service.id === serviceId
                    ? {
                            ...service,
                            client_presentation: {
                                ...service.client_presentation,
                                [field]: value,
                            },
                        }
                    : service
            )
        );
    };

    const saveChanges = async (serviceId: number) => {
        const serviceToUpdate = allServices.find((service) => service.id === serviceId);
        if (!serviceToUpdate) {
            console.error(`No service found with ID ${serviceId}`);
            return;
        }

        const { AdditionalServices, data_collection, report_writing, client_presentation, ...serviceData } = serviceToUpdate;

        try {
            const response = await fetch(`${ADMIN_ROUTES.serviceTypes}/${serviceId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    serviceData,
                    AdditionalServices,
                    dataCollectionData: data_collection,
                    reportWritingData: report_writing,
                    clientPresentationData: client_presentation,
                }),
            });

            if (response.ok) {
                alert(`Service with ID ${serviceId} updated successfully!`);
            } else {
                console.error(`Failed to update service: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    if (loading) {
        return <div>Loading services...</div>;
    }

    return (
        <div>
            <h1>Edit Services</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Visibility</th>
                        <th>Base SqFt</th>
                        <th>DC Base Fee</th>
                        <th>DC Fee Rate</th>
                        <th>DC Base Time</th>
                        <th>DC Time Rate</th>
                        <th>RW Base Fee</th>
                        <th>RW Fee Rate</th>
                        <th>RW Base Time</th>
                        <th>RW Time Rate</th>
                        <th>CP Base Fee</th>
                        <th>CP Fee Rate</th>
                        <th>CP Base Time</th>
                        <th>CP Time Rate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allServices.map((service) => (
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
                                        handleInputChange(
                                            service.id,
                                            'description',
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                            <td>
    <input
        type="checkbox"
        checked={service.visibility || false} // Default to false if undefined
        onChange={(e) =>
            handleVisibilityChange(service.id, e.target.checked)
        }
    />
</td>

                            <td>
                                <textarea
                                    value={service.base_sq_ft || ''}
                                    onChange={(e) =>
                                        handleInputChange(
                                            service.id,
                                            'baseSqFt',
                                            e.target.value
                                        )
                                    }
                                />
                            </td>
                            <td>
    <input
        type="number"
        value={service.data_collection?.base_fee ?? 0} // Default to 0
        onChange={(e) =>
            handleDataCollectionChange(
                service.id,
                'base_fee',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.data_collection?.rate_over_base_time ?? 0}
        onChange={(e) =>
            handleDataCollectionChange(
                service.id,
                'rate_over_base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.data_collection?.base_time ?? 0}
        onChange={(e) =>
            handleDataCollectionChange(
                service.id,
                'base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.data_collection?.rate_over_base_time ?? 0}
        onChange={(e) =>
            handleDataCollectionChange(
                service.id,
                'rate_over_base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.report_writing?.base_fee ?? 0} // Default to 0
        onChange={(e) =>
            handleReportWritingChange(
                service.id,
                'base_fee',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.report_writing?.rate_over_base_time ?? 0}
        onChange={(e) =>
            handleReportWritingChange(
                service.id,
                'rate_over_base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.report_writing?.base_time ?? 0}
        onChange={(e) =>
            handleReportWritingChange(
                service.id,
                'base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.report_writing?.rate_over_base_time ?? 0}
        onChange={(e) =>
            handleReportWritingChange(
                service.id,
                'rate_over_base_time',
                Number(e.target.value)
            )
        }
    />
</td>                            
<td>
    <input
        type="number"
        value={service.client_presentation?.base_fee ?? 0} // Default to 0
        onChange={(e) =>
            handleClientPresentationChange(
                service.id,
                'base_fee',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.client_presentation?.rate_over_base_time ?? 0}
        onChange={(e) =>
            handleClientPresentationChange(
                service.id,
                'rate_over_base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.client_presentation?.base_time ?? 0}
        onChange={(e) =>
            handleClientPresentationChange(
                service.id,
                'base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    <input
        type="number"
        value={service.client_presentation?.rate_over_base_time ?? 0}
        onChange={(e) =>
            handleClientPresentationChange(
                service.id,
                'rate_over_base_time',
                Number(e.target.value)
            )
        }
    />
</td>
<td>
    {/* Multi-select dropdown */}
    <select
        multiple
        value={service.AdditionalServices?.map((s) => s.id.toString()) || []} // Convert numbers to strings
        onChange={(e) => {
            const selectedIds = Array.from(e.target.selectedOptions).map(
                (option) => Number(option.value) // Convert back to numbers
            );
            handleAdditionalServicesChange(service.id, selectedIds);
        }}
    >
        {allAdditionalServices.map((additionalService) => (
            <option key={additionalService.id} value={additionalService.id.toString()}>
                {additionalService.name}
            </option>
        ))}
    </select>
</td>
                        <td>
                                <button onClick={() => saveChanges(service.id)}>Save</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceEditor;
