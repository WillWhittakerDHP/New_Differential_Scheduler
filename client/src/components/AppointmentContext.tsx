import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { UserTypeData, ServiceData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/apiInterfaces';
import { DescriptionsData } from '../interfaces/detailInterfaces';
import { Appointment } from '../interfaces/appointmentInterfaces';

interface AppointmentContextType {
  thisAppointment: Appointment | undefined;
  setThisAppointment: React.Dispatch<React.SetStateAction<Appointment | undefined>>;

  allUserTypes: UserTypeData[];
  setAllUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;
  availableUserTypes: UserTypeData[];
  setAvailableUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;
  thisUserType: UserTypeData | undefined;
  setThisUserType: React.Dispatch<React.SetStateAction<UserTypeData | undefined>>;

  allServices: ServiceData[];
  setAllServices: React.Dispatch<React.SetStateAction<ServiceData[]>>;
  availableServices: ServiceData[];
  setAvailableServices: React.Dispatch<React.SetStateAction<ServiceData[]>>;
  thisService: ServiceData | undefined;
  setThisService: React.Dispatch<React.SetStateAction<ServiceData | undefined>>;

  allAdditionalServices: AdditionalServiceData[];
  setAllAdditionalServices: React.Dispatch<React.SetStateAction<AdditionalServiceData[]>>;availableAdditionalServices: AdditionalServiceData[];
  setAvailableAdditionalServices: React.Dispatch<React.SetStateAction<AdditionalServiceData[]>>;
  thisAdditionalService: AdditionalServiceData | undefined;
  setThisAdditionalService: React.Dispatch<React.SetStateAction<AdditionalServiceData | undefined>>;

  allAvailabilityOptions: AvailabilityOptionData[];
  setAllAvailabilityOptions: React.Dispatch<React.SetStateAction<AvailabilityOptionData[]>>;availableAvailabilityOptions: AvailabilityOptionData[];
  setAvailableAvailabilityOptions: React.Dispatch<React.SetStateAction<AvailabilityOptionData[]>>;
  thisAvailabilityOption: AvailabilityOptionData | undefined;
  setThisAvailabilityOption: React.Dispatch<React.SetStateAction<AvailabilityOptionData | undefined>>;

  allDwellingAdjustments: DwellingAdjustmentData[];
  setAllDwellingAdjustments: React.Dispatch<React.SetStateAction<DwellingAdjustmentData[]>>;availableDwellingAdjustments: DwellingAdjustmentData[];
  setAvailableDwellingAdjustments: React.Dispatch<React.SetStateAction<DwellingAdjustmentData[]>>;
  thisDwellingAdjustment: DwellingAdjustmentData | undefined;
  setThisDwellingAdjustment: React.Dispatch<React.SetStateAction<DwellingAdjustmentData | undefined>>;

  serviceDescriptions: DescriptionsData[];
  setServiceDescriptions: React.Dispatch<React.SetStateAction<DescriptionsData[]>>;

  // thisAddress: Address | undefined;
  // setThisAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;

  // thisProperty: Property | undefined;
  // setThisProperty: React.Dispatch<React.SetStateAction<Property | undefined>>;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [thisAppointment, setThisAppointment] = useState<Appointment | undefined>();
  const [allUserTypes, setAllUserTypes] = useState<UserTypeData[]>([]);
  const [availableUserTypes, setAvailableUserTypes] = useState<UserTypeData[]>([]);
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  const [allServices, setAllServices] = useState<ServiceData[]>([]);
  const [availableServices, setAvailableServices] = useState<ServiceData[]>([]);
  const [thisService, setThisService] = useState<ServiceData | undefined>();
  const [allAdditionalServices, setAllAdditionalServices] = useState<AdditionalServiceData[]>([]);
  const [availableAdditionalServices, setAvailableAdditionalServices] = useState<AdditionalServiceData[]>([]);
  const [thisAdditionalService, setThisAdditionalService] = useState<AdditionalServiceData | undefined>();
  const [allAvailabilityOptions, setAllAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [availableAvailabilityOptions, setAvailableAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [thisAvailabilityOption, setThisAvailabilityOption] = useState<AvailabilityOptionData | undefined>();
  const [allDwellingAdjustments, setAllDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);const [availableDwellingAdjustments, setAvailableDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  const [thisDwellingAdjustment, setThisDwellingAdjustment] = useState<DwellingAdjustmentData | undefined>();
  const [serviceDescriptions, setServiceDescriptions] = useState<DescriptionsData[]>([]);
  // const [thisAddress, setThisAddress] = useState<Address>();
  // const [thisProperty, setThisProperty] = useState<Property>();
  
  useEffect(() => {
    const appointment = new Appointment();
    setThisAppointment(appointment);
  }, []);
  
  
  return (
    <AppointmentContext.Provider value={{ thisAppointment, setThisAppointment, allUserTypes, setAllUserTypes, availableUserTypes, setAvailableUserTypes, thisUserType, setThisUserType, allServices, setAllServices,  availableServices, setAvailableServices, thisService, setThisService,  allAdditionalServices, setAllAdditionalServices,availableAdditionalServices, setAvailableAdditionalServices, thisAdditionalService, setThisAdditionalService, allAvailabilityOptions, setAllAvailabilityOptions,availableAvailabilityOptions, setAvailableAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption, allDwellingAdjustments, setAllDwellingAdjustments,availableDwellingAdjustments, setAvailableDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment, serviceDescriptions, setServiceDescriptions
    // , thisAddress, setThisAddress, thisProperty, setThisProperty
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};
