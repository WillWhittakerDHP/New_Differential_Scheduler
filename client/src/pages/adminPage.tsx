import React, { useContext, useEffect } from 'react';
import { AppointmentContext } from '../components/AppointmentContext';
import { Container, Row, Card } from 'react-bootstrap';
import { AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData, ServiceData } from '../interfaces/apiInterfaces';

interface SectionProps {
  title: string;
  data: Array<ServiceData | AdditionalServiceData | AvailabilityOptionData | DwellingAdjustmentData>; // Adjust to your data's actual structure
  type: string;
  handleUpdate: (type: string, id: number, field: string, value: any) => void;
}


const AdminPage = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('ServicesList must be used within an AppointmentProvider');
  }

  const { allUserTypes, setAllUserTypes, allServices, setAllServices, allAdditionalServices, setAllAdditionalServices, allAvailabilityOptions, setAllAvailabilityOptions, allDwellingAdjustments, setAllDwellingAdjustments
  } = context;
  
    const Section: React.FC<SectionProps> = ({ title, data, type, handleUpdate }) => {
      return (
          <div>
              <h2>{title}</h2>
              <table>
                  <thead>
                      <tr>
                          {data.length > 0 && Object.keys(data[0]).map((key) => (
                              <th key={key}>{key}</th>
                          ))}
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.map((item) => (
                          <tr key={item.id}>
                              {Object.entries(item).map(([key, value]) => (
                                  <td key={key}>
                                      <input
                                          type={typeof value === 'number' ? 'number' : 'text'}
                                          value={value}
                                          onChange={(e) =>
                                            handleUpdate(type, item.id, key, typeof value === 'number' ? Number(e.target.value) : e.target.value)
                                        }                                        
                                      />
                                  </td>
                              ))}
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      );
  };
  

    // Fetch data when the component mounts
    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        // Fetch services, additional services, dwelling adjustments, and availability
        // Simulate API calls
        const fetchedServices = await fetch('/api/services').then(res => res.json());
        const fetchedAdditionalServices = await fetch('/api/additional-services').then(res => res.json());
        const fetchedDwellingAdjustments = await fetch('/api/dwelling-adjustments').then(res => res.json());
        const fetchedAvailabilityOptions = await fetch('/api/availability').then(res => res.json());

        setAllServices(fetchedServices);
        setAllAdditionalServices(fetchedAdditionalServices);
        setAllDwellingAdjustments(fetchedDwellingAdjustments);
        setAllAvailabilityOptions(fetchedAvailabilityOptions);
    };

    const handleUpdate = (
      type: string,
      id: number,
      updatedField: string,
      value: string | number
  ): void => {
      const updateState = (data: Array<Record<string, any>>, setData: React.Dispatch<React.SetStateAction<any>>) => {
          const updatedData = data.map(item =>
              item.id === id ? { ...item, [updatedField]: value } : item
          );
          setData(updatedData);
      };
  
      switch (type) {
          case 'service':
              updateState(allServices, setAllServices);
              break;
          case 'additionalService':
              updateState(allAdditionalServices, setAllAdditionalServices);
              break;
          case 'dwellingAdjustment':
              updateState(allDwellingAdjustments, setAllDwellingAdjustments);
              break;
          case 'availability':
              updateState(allAvailabilityOptions, setAllAvailabilityOptions);
              break;
          default:
              break;
      }
  };
  

    const handleSubmit = async () => {
        // Make API calls to save all changes
        await Promise.all([
            fetch('/api/services', { method: 'PUT', body: JSON.stringify(allServices) }),
            fetch('/api/additional-services', { method: 'PUT', body: JSON.stringify(allAdditionalServices) }),
            fetch('/api/dwelling-adjustments', { method: 'PUT', body: JSON.stringify(allDwellingAdjustments) }),
            fetch('/api/availability', { method: 'PUT', body: JSON.stringify(allAvailabilityOptions) })
        ]);
        alert('Data updated successfully!');
    };

    return (
        <div>
            <h1>Admin Page</h1>
            
            <Section 
            title="Services" 
            data={allServices} 
            type="service" 
            handleUpdate={handleUpdate} 
            />
            <Section 
            title="Additional Services" 
            data={allAdditionalServices} 
            type="additionalService" 
            handleUpdate={handleUpdate} 
            />
            <Section 
            title="Dwelling Adjustments" 
            data={allDwellingAdjustments} 
            type="dwellingAdjustment" 
            handleUpdate={handleUpdate} />
            <Section 
            title="Availability Options" 
            data={allAvailabilityOptions} 
            type="availability" 
            handleUpdate={handleUpdate} />
            
            <button onClick={handleSubmit}>Save Changes</button>
        </div>
    );
};

export default AdminPage