import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { UserTypeData, ServiceData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/apiInterfaces';
import { Appointment } from '../interfaces/appointmentInterfaces';

interface AppointmentContextType {
  thisAppointment: Appointment | undefined;
  setThisAppointment: React.Dispatch<React.SetStateAction<Appointment | undefined>>;

  availableUserTypes: UserTypeData[];
  setAvailableUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;
  thisUserType: UserTypeData | undefined;
  setThisUserType: React.Dispatch<React.SetStateAction<UserTypeData | undefined>>;

  availableServices: ServiceData[];
  setAvailableServices: React.Dispatch<React.SetStateAction<ServiceData[]>>;
  thisService: ServiceData | undefined;
  setThisService: React.Dispatch<React.SetStateAction<ServiceData | undefined>>;

  availableAdditionalServices: AdditionalServiceData[];
  setAvailableAdditionalServices: React.Dispatch<React.SetStateAction<AdditionalServiceData[]>>;
  thisAdditionalService: AdditionalServiceData | undefined;
  setThisAdditionalService: React.Dispatch<React.SetStateAction<AdditionalServiceData | undefined>>;

  availableAvailabilityOptions: AvailabilityOptionData[];
  setAvailableAvailabilityOptions: React.Dispatch<React.SetStateAction<AvailabilityOptionData[]>>;
  thisAvailabilityOption: AvailabilityOptionData | undefined;
  setThisAvailabilityOption: React.Dispatch<React.SetStateAction<AvailabilityOptionData | undefined>>;

  availableDwellingAdjustments: DwellingAdjustmentData[];
  setAvailableDwellingAdjustments: React.Dispatch<React.SetStateAction<DwellingAdjustmentData[]>>;
  thisDwellingAdjustment: DwellingAdjustmentData | undefined;
  setThisDwellingAdjustment: React.Dispatch<React.SetStateAction<DwellingAdjustmentData | undefined>>;

  // thisAddress: Address | undefined;
  // setThisAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;

  // thisProperty: Property | undefined;
  // setThisProperty: React.Dispatch<React.SetStateAction<Property | undefined>>;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [thisAppointment, setThisAppointment] = useState<Appointment | undefined>();
  const [availableUserTypes, setAvailableUserTypes] = useState<UserTypeData[]>([]);
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  const [availableServices, setAvailableServices] = useState<ServiceData[]>([]);
  const [thisService, setThisService] = useState<ServiceData | undefined>();
  const [availableAdditionalServices, setAvailableAdditionalServices] = useState<AdditionalServiceData[]>([]);
  const [thisAdditionalService, setThisAdditionalService] = useState<AdditionalServiceData | undefined>();
  const [availableAvailabilityOptions, setAvailableAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [thisAvailabilityOption, setThisAvailabilityOption] = useState<AvailabilityOptionData | undefined>();
  const [availableDwellingAdjustments, setAvailableDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  const [thisDwellingAdjustment, setThisDwellingAdjustment] = useState<DwellingAdjustmentData | undefined>();
  // const [thisAddress, setThisAddress] = useState<Address>();
  // const [thisProperty, setThisProperty] = useState<Property>();
  
  useEffect(() => {
    const appointment = new Appointment();
    setThisAppointment(appointment);
  }, []);
  
  
  return (
    <AppointmentContext.Provider value={{ thisAppointment, setThisAppointment, availableUserTypes, setAvailableUserTypes, thisUserType, setThisUserType,  availableServices, setAvailableServices, thisService, setThisService, availableAdditionalServices, setAvailableAdditionalServices, thisAdditionalService, setThisAdditionalService, availableAvailabilityOptions, setAvailableAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption,availableDwellingAdjustments, setAvailableDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
