import React, { useState, useEffect, useMemo, useContext } from 'react';
import { AdminContext, AdminContextType } from '../../context/AdminContext';
import { ADMIN_ROUTES } from '../../api/internalAPI/apiRoutes';
import { AppointmentBlock } from '../../interfaces/appointmentInterfaces';
import useFetch from '../../hooks/useFetch';
import ErrorBoundary from '../errorBoundary';

const GenericEditor = <T extends Record<string, any>>({
    type,
    entityName,
    fields,
    associations = [],
    hasAppointmentBlocks = false,
}: {
    type: keyof typeof ADMIN_ROUTES;
    entityName: string;
    fields: Array<keyof T>;
    associations?: Array<{
        type: keyof typeof ADMIN_ROUTES;
        label: string;
        key: keyof AdminContextType['associationData'];
    }>;
    hasAppointmentBlocks?: boolean;
}) => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('GenericEditor must be used within an AdminProvider');
    }

    const { associationData } = context;
    
    const [entities, setEntities] = useState<T[]>([]);
    const { data: fetchedEntities, loading, error } = useFetch<T[]>(ADMIN_ROUTES[type]);

    // Populate entities once fetched
    useEffect(() => {
        if (Array.isArray(fetchedEntities) && fetchedEntities.length > 0) {
            setEntities(fetchedEntities);
        }
    }, [fetchedEntities]);
    
    // Handle association changes for multi-select dropdowns

    const handleAssociationChange = (
        id: number,
        key: keyof AdminContextType['associationData'],
        selectedIds: number[]
    ) => {
        // Explicitly assert key as string for indexing
        const relatedData = associationData[key];
        setEntities((prev) =>
            prev.map((entity) =>
                entity.id === id
                    ? {
                          ...entity,
                          [key]: relatedData.filter((item: any) =>
                              selectedIds.includes(item.id)
                          ),
                      }
                    : entity
            )
        );
    };
    

    // Handle input changes for entity fields
    const handleFieldChange = (id: number, field: keyof T, value: string | number | boolean) => {
        setEntities((prev) =>
            prev.map((entity) =>
                entity.id === id ? { ...entity, [field]: value } : entity
            )
        );
    };

    // Handle appointment block changes
    const handleAppointmentBlockChange = (
        entityId: number,
        blockType: 'data_collection' | 'report_writing' | 'client_presentation',
        field: keyof AppointmentBlock,
        value: string | number | boolean
    ) => {
        setEntities((prev) =>
            prev.map((entity) =>
                entity.id === entityId
                    ? {
                          ...entity,
                          [blockType]: {
                              ...entity[blockType],
                              [field]: value,
                          },
                      }
                    : entity
            )
        );
    };

    // Save changes to the server
    const saveChanges = async (id: number) => {
        const entityToUpdate = entities.find((entity) => entity.id === id);
        if (!entityToUpdate) {
            console.error(`No ${entityName} found with ID ${id}`);
            return;
        }

        try {
            const response = await fetch(`${ADMIN_ROUTES[type]}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entityToUpdate),
            });

            if (response.ok) {
                alert(`${entityName} with ID ${id} updated successfully!`);
            } else {
                console.error(`Failed to update ${entityName}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error updating ${entityName}:`, error);
        }
    };

    // Render input fields
    const RenderInputField = ({
        value,
        type,
        onChange,
    }: {
        value: string | number | boolean | undefined;
        type: 'text' | 'number' | 'checkbox';
        onChange: (value: string | number | boolean) => void;
    }) => {
        if (type === 'checkbox') {
            return (
                <input
                    type="checkbox"
                    checked={!!value}
                    onChange={(e) => onChange(e.target.checked)}
                />
            );
        }
        return (
            <input
                type={type}
                value={value !== undefined ? String(value) : ''}
                onChange={(e) =>
                    onChange(type === 'number' ? Number(e.target.value) : e.target.value)
                }
            />
        );
    };

    // Render appointment block fields
    const renderAppointmentBlockFields = (
        entity: T,
        blockType: 'data_collection' | 'report_writing' | 'client_presentation'
    ) => {
        const block = entity[blockType];
        if (!block) return null;
        
        return (
            <>
                <td>
                    <input
                        type="checkbox"
                        checked={!!block.on_site}
                        onChange={(e) =>
                            handleAppointmentBlockChange(
                                entity.id,
                                blockType,
                                'on_site',
                                e.target.checked
                            )
                        }
                    />
                </td>                <td>
                    <input
                        type="checkbox"
                        checked={!!block.client_present}
                        onChange={(e) =>
                            handleAppointmentBlockChange(
                                entity.id,
                                blockType,
                                'client_present',
                                e.target.checked
                            )
                        }
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={block.base_time || 0}
                        onChange={(e) =>
                            handleAppointmentBlockChange(
                                entity.id,
                                blockType,
                                'base_time',
                                Number(e.target.value)
                            )
                        }
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={block.rate_over_base_time || 0}
                        onChange={(e) =>
                            handleAppointmentBlockChange(
                                entity.id,
                                blockType,
                                'rate_over_base_time',
                                Number(e.target.value)
                            )
                        }
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={block.base_fee || 0}
                        onChange={(e) =>
                            handleAppointmentBlockChange(
                                entity.id,
                                blockType,
                                'base_fee',
                                Number(e.target.value)
                            )
                        }
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={block.rate_over_base_fee || 0}
                        onChange={(e) =>
                            handleAppointmentBlockChange(
                                entity.id,
                                blockType,
                                'rate_over_base_fee',
                                Number(e.target.value)
                            )
                        }
                    />
                </td>
            </>
        );
    };

    if (loading) return <div>Loading {entityName.toLowerCase()}...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <ErrorBoundary>
<div className="container-fluid">
    <div className="row">
        {/* Add a spacer column to push content to the right */}
        <div className="col-md-8"></div>

        {/* Editor Table */}
        <div className="col-md-4">
                <h1>{entityName} Editor</h1>
                <table className="table table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            {fields.map((field) => (
                                <th key={String(field)}>{String(field)}</th>
                            ))}
                            {associations.map(({ label }) => (
                                <th key={label}>{label}</th>
                            ))}
                            {hasAppointmentBlocks && (
                                <>
                                    <th>On Site</th>
                                    <th>Base Time</th>
                                    <th>Time Rate</th>
                                    <th>Base Fee</th>
                                    <th>Fee Rate</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {entities.map((entity) => (
                            <tr key={entity.id}>
                                <td>{entity.id}</td>
                                {fields.map((field) => (
                                    <td key={String(field)}>
                                        <RenderInputField
                                            type={
                                                typeof entity[field] === 'boolean'
                                                    ? 'checkbox'
                                                    : 'text'
                                            }
                                            value={
                                                entity[field] as
                                                    | string
                                                    | number
                                                    | boolean
                                                    | undefined
                                            }
                                            onChange={(value) =>
                                                handleFieldChange(
                                                    entity.id,
                                                    field,
                                                    value
                                                )
                                            }
                                        />
                                    </td>
                                ))}
                                {associations.map(({ key, type }) => (
                                    <td key={String(key)}>
                                        <select
                                            multiple
                                            className="form-select"
                                            value={
                                                (entity[key] as any[])?.map((item: any) =>
                                                    item.id.toString()
                                                ) || []
                                            }
                                            onChange={(e) => {
                                                const selectedIds = Array.from(
                                                    e.target.selectedOptions
                                                ).map((option) =>
                                                    Number(option.value)
                                                );
                                                handleAssociationChange(
                                                    entity.id,
                                                    key,
                                                    selectedIds
                                                );
                                            }}
                                        >
                                            {(associationData[type] || []).map(
                                                (assocItem: any) => (
                                                    <option
                                                        key={assocItem.id}
                                                        value={assocItem.id.toString()}
                                                    >
                                                        {assocItem.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </td>
                                ))}
                                {hasAppointmentBlocks && (
                                    <>
                                        {renderAppointmentBlockFields(
                                            entity,
                                            'data_collection'
                                        )}
                                        {renderAppointmentBlockFields(
                                            entity,
                                            'report_writing'
                                        )}
                                        {renderAppointmentBlockFields(
                                            entity,
                                            'client_presentation'
                                        )}
                                    </>
                                )}
                                <td>
                                <button className="btn btn-primary" onClick={() => saveChanges(entity.id)}>
                                        Save
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
            </div>
        </ErrorBoundary>
    );
};

export default React.memo(GenericEditor);
