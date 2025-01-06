import React, { createContext, useState, ReactNode } from 'react';
import type { UserTypeData, ServiceTypeData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/serviceInterfaces';
import { DescriptionsData } from '../interfaces/detailInterfaces';


interface AppointmentContextType {
  userTypes: UserTypeData[];
  setUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;
  thisUserType: UserTypeData | undefined;
  setThisUserType: React.Dispatch<React.SetStateAction<UserTypeData | undefined>>;

  availableServiceTypes: ServiceTypeData[];
  setAvailableServiceTypes: React.Dispatch<React.SetStateAction<ServiceTypeData[]>>;
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

  availableDwellingAdjustments: DwellingAdjustmentData[];
  setAvailableDwellingAdjustments: React.Dispatch<React.SetStateAction<DwellingAdjustmentData[]>>;
  thisDwellingAdjustment: DwellingAdjustmentData | undefined;
  setThisDwellingAdjustment: React.Dispatch<React.SetStateAction<DwellingAdjustmentData | undefined>>;

  serviceDescriptions: DescriptionsData[];
  setServiceDescriptions: React.Dispatch<React.SetStateAction<DescriptionsData[]>>;

}

export const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [userTypes, setUserTypes] = useState<UserTypeData[]>([]);
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  const [availableServiceTypes, setAvailableServiceTypes] = useState<ServiceTypeData[]>([]);
  const [thisService, setThisService] = useState<ServiceTypeData | undefined>();
  const [availableAdditionalServiceTypes, setAvailableAdditionalServiceTypes] = useState<AdditionalServiceData[]>([]);
  const [thisAdditionalService, setThisAdditionalService] = useState<AdditionalServiceData | undefined>();
  const [availableAvailabilityOptions, setAvailableAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [thisAvailabilityOption, setThisAvailabilityOption] = useState<AvailabilityOptionData | undefined>();
  const [availableDwellingAdjustments, setAvailableDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  const [thisDwellingAdjustment, setThisDwellingAdjustment] = useState<DwellingAdjustmentData | undefined>();
  const [serviceDescriptions, setServiceDescriptions] = useState<DescriptionsData[]>([]);
  

  return (
    <AppointmentContext.Provider value={{ userTypes, setUserTypes, thisUserType, setThisUserType, availableServiceTypes, setAvailableServiceTypes, thisService, setThisService, availableAdditionalServiceTypes, setAvailableAdditionalServiceTypes, thisAdditionalService, setThisAdditionalService, availableAvailabilityOptions, setAvailableAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption, availableDwellingAdjustments, setAvailableDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment, serviceDescriptions, setServiceDescriptions}}>
      {children}
    </AppointmentContext.Provider>
  );
};
