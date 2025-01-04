import React, { createContext, useState, ReactNode } from 'react';
import type { UserTypeData, ServiceTypeData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/serviceInterfaces';

interface AppointmentContextType {
  userTypes: UserTypeData[];
  setUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;
  thisUserType: UserTypeData | undefined;
  setThisUserType: React.Dispatch<React.SetStateAction<UserTypeData | undefined>>;

  serviceTypes: ServiceTypeData[];
  setServiceTypes: React.Dispatch<React.SetStateAction<ServiceTypeData[]>>;
  thisServiceType: ServiceTypeData | undefined;
  setThisServiceType: React.Dispatch<React.SetStateAction<ServiceTypeData | undefined>>;

  additionalServices: AdditionalServiceData[];
  setAdditionalServices: React.Dispatch<React.SetStateAction<AdditionalServiceData[]>>;
  thisAdditionalService: AdditionalServiceData | undefined;
  setThisAdditionalService: React.Dispatch<React.SetStateAction<AdditionalServiceData | undefined>>;

  availabilityOptions: AvailabilityOptionData[];
  setAvailabilityOptions: React.Dispatch<React.SetStateAction<AvailabilityOptionData[]>>;
  thisAvailabilityOption: AvailabilityOptionData | undefined;
  setThisAvailabilityOption: React.Dispatch<React.SetStateAction<AvailabilityOptionData | undefined>>;

  dwellingAdjustments: DwellingAdjustmentData[];
  setDwellingAdjustments: React.Dispatch<React.SetStateAction<DwellingAdjustmentData[]>>;
  thisDwellingAdjustment: DwellingAdjustmentData | undefined;
  setThisDwellingAdjustment: React.Dispatch<React.SetStateAction<DwellingAdjustmentData | undefined>>;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [userTypes, setUserTypes] = useState<UserTypeData[]>([]);
  const [thisUserType, setThisUserType] = useState<UserTypeData | undefined>();
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeData[]>([]);
  const [thisServiceType, setThisServiceType] = useState<ServiceTypeData | undefined>();
  const [additionalServices, setAdditionalServices] = useState<AdditionalServiceData[]>([]);
  const [thisAdditionalService, setThisAdditionalService] = useState<AdditionalServiceData | undefined>();
  const [availabilityOptions, setAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [thisAvailabilityOption, setThisAvailabilityOption] = useState<AvailabilityOptionData | undefined>();
  const [dwellingAdjustments, setDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  const [thisDwellingAdjustment, setThisDwellingAdjustment] = useState<DwellingAdjustmentData | undefined>();

  return (
    <AppointmentContext.Provider value={{ userTypes, setUserTypes, thisUserType, setThisUserType, serviceTypes, setServiceTypes, thisServiceType, setThisServiceType, additionalServices, setAdditionalServices, thisAdditionalService, setThisAdditionalService, availabilityOptions, setAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption, dwellingAdjustments, setDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment, }}>
      {children}
    </AppointmentContext.Provider>
  );
};
