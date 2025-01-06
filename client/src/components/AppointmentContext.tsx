import React, { createContext, useState, ReactNode } from 'react';
import type { UserTypeData, ServiceTypeData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/serviceInterfaces';
import { DescriptionsData } from '../interfaces/detailInterfaces';
import type { AddressData, PropertyData } from '../interfaces/appointmentInterfaces';


interface AppointmentContextType {
  userTypes: UserTypeData[];
  setUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;
  thisUserType: UserTypeData | undefined;
  setThisUserType: React.Dispatch<React.SetStateAction<UserTypeData | undefined>>;

  availableServices: ServiceTypeData[];
  setAvailableServices: React.Dispatch<React.SetStateAction<ServiceTypeData[]>>;
  thisService: ServiceTypeData | undefined;
  setThisService: React.Dispatch<React.SetStateAction<ServiceTypeData | undefined>>;

  availableAdditionalServiceTypes: AdditionalServiceData[];
  setAvailableAdditionalServiceTypes: React.Dispatch<React.SetStateAction<AdditionalServiceData[]>>;
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

  thisAddress: AddressData | undefined;
  setThisAddress: React.Dispatch<React.SetStateAction<AddressData | undefined>>;

  thisProperty: PropertyData | undefined;
  setThisProperty: React.Dispatch<React.SetStateAction<PropertyData | undefined>>;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [userTypes, setUserTypes] = useState<UserTypeData[]>([]);
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  const [availableServices, setAvailableServices] = useState<ServiceTypeData[]>([]);
  const [thisService, setThisService] = useState<ServiceTypeData | undefined>();
  const [availableAdditionalServiceTypes, setAvailableAdditionalServiceTypes] = useState<AdditionalServiceData[]>([]);
  const [thisAdditionalService, setThisAdditionalService] = useState<AdditionalServiceData | undefined>();
  const [availableAvailabilityOptions, setAvailableAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [thisAvailabilityOption, setThisAvailabilityOption] = useState<AvailabilityOptionData | undefined>();
  const [dwellingAdjustments, setDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  const [thisDwellingAdjustment, setThisDwellingAdjustment] = useState<DwellingAdjustmentData | undefined>();
  const [serviceDescriptions, setServiceDescriptions] = useState<DescriptionsData[]>([]);
  const [thisAddress, setThisAddress] = useState<AddressData>();
  const [thisProperty, setThisProperty] = useState<PropertyData>();
  

  return (
    <AppointmentContext.Provider value={{ userTypes, setUserTypes, thisUserType, setThisUserType, availableServices, setAvailableServices, thisService, setThisService, availableAdditionalServiceTypes, setAvailableAdditionalServiceTypes, thisAdditionalService, setThisAdditionalService, availableAvailabilityOptions, setAvailableAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption, dwellingAdjustments, setDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment, serviceDescriptions, setServiceDescriptions, thisAddress, setThisAddress, thisProperty, setThisProperty}}>
      {children}
    </AppointmentContext.Provider>
  );
};
