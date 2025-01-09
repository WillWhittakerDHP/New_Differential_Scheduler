import React, { createContext, useState, ReactNode } from 'react';
import type { UserTypeData, ServiceData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/apiInterfaces';
import { DescriptionsData } from '../interfaces/detailInterfaces';
import { Appointment } from '../interfaces/appointmentInterfaces';

interface AppointmentContextType {
  thisAppointment: Appointment | undefined;
  setThisAppointment: React.Dispatch<React.SetStateAction<Appointment | undefined>>;

  userTypes: UserTypeData[];
  setUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;
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

  dwellingAdjustments: DwellingAdjustmentData[];
  setDwellingAdjustments: React.Dispatch<React.SetStateAction<DwellingAdjustmentData[]>>;
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
  const [userTypes, setUserTypes] = useState<UserTypeData[]>([]);
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  const [availableServices, setAvailableServices] = useState<ServiceData[]>([]);
  const [thisService, setThisService] = useState<ServiceData | undefined>();
  const [availableAdditionalServices, setAvailableAdditionalServices] = useState<AdditionalServiceData[]>([]);
  const [thisAdditionalService, setThisAdditionalService] = useState<AdditionalServiceData | undefined>();
  const [availableAvailabilityOptions, setAvailableAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [thisAvailabilityOption, setThisAvailabilityOption] = useState<AvailabilityOptionData | undefined>();
  const [dwellingAdjustments, setDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  const [thisDwellingAdjustment, setThisDwellingAdjustment] = useState<DwellingAdjustmentData | undefined>();
  const [serviceDescriptions, setServiceDescriptions] = useState<DescriptionsData[]>([]);
  // const [thisAddress, setThisAddress] = useState<Address>();
  // const [thisProperty, setThisProperty] = useState<Property>();
  

  return (
    <AppointmentContext.Provider value={{ thisAppointment, setThisAppointment, userTypes, setUserTypes, thisUserType, setThisUserType, availableServices, setAvailableServices, thisService, setThisService, availableAdditionalServices, setAvailableAdditionalServices, thisAdditionalService, setThisAdditionalService, availableAvailabilityOptions, setAvailableAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption, dwellingAdjustments, setDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment, serviceDescriptions, setServiceDescriptions
    // , thisAddress, setThisAddress, thisProperty, setThisProperty
    }}>
      {children}
    </AppointmentContext.Provider>
  );
};
