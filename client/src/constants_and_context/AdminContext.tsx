import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { UserTypeData, ServiceData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/apiInterfaces';
// import { DescriptionsData } from '../interfaces/detailInterfaces';

interface AdminContextType {
  userType: UserTypeData | undefined;
  setUserType: React.Dispatch<React.SetStateAction<UserTypeData | undefined>>;
  allUserTypes: UserTypeData[];
  setAllUserTypes: React.Dispatch<React.SetStateAction<UserTypeData[]>>;

  service: ServiceData | undefined;
  setService: React.Dispatch<React.SetStateAction<ServiceData | undefined>>;
  allServices: ServiceData[];
  setAllServices: React.Dispatch<React.SetStateAction<ServiceData[]>>;

  additionalService: AdditionalServiceData | undefined;
  setAdditionalService: React.Dispatch<React.SetStateAction<AdditionalServiceData | undefined>>;
  allAdditionalServices: AdditionalServiceData[];
  setAllAdditionalServices: React.Dispatch<React.SetStateAction<AdditionalServiceData[]>>;

  availabilityOption: AvailabilityOptionData | undefined;
  setAvailabilityOption: React.Dispatch<React.SetStateAction<AvailabilityOptionData | undefined>>;
  allAvailabilityOptions: AvailabilityOptionData[];
  setAllAvailabilityOptions: React.Dispatch<React.SetStateAction<AvailabilityOptionData[]>>;

  dwellingAdjustment: DwellingAdjustmentData | undefined;
  setDwellingAdjustment: React.Dispatch<React.SetStateAction<DwellingAdjustmentData | undefined>>;
  allDwellingAdjustments: DwellingAdjustmentData[];
  setAllDwellingAdjustments: React.Dispatch<React.SetStateAction<DwellingAdjustmentData[]>>;

  // serviceDescriptions: DescriptionsData[];
  // setServiceDescriptions: React.Dispatch<React.SetStateAction<DescriptionsData[]>>;

}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [userType, setUserType] = useState<UserTypeData>();
  const [allUserTypes, setAllUserTypes] = useState<UserTypeData[]>([]);
  const [service, setService] = useState<ServiceData>();
  const [allServices, setAllServices] = useState<ServiceData[]>([]);
  const [additionalService, setAdditionalService] = useState<AdditionalServiceData>();
  const [allAdditionalServices, setAllAdditionalServices] = useState<AdditionalServiceData[]>([]);
  const [availabilityOption, setAvailabilityOption] = useState<AvailabilityOptionData>();
  const [allAvailabilityOptions, setAllAvailabilityOptions] = useState<AvailabilityOptionData[]>([]);
  const [dwellingAdjustment, setDwellingAdjustment] = useState<DwellingAdjustmentData>();
  const [allDwellingAdjustments, setAllDwellingAdjustments] = useState<DwellingAdjustmentData[]>([]);
  // const [description, setDescription] = useState<DescriptionsData>();
  // const [allDescriptions, setAllDescriptions] = useState<DescriptionsData[]>([]);
  
  // useEffect(() => {
  //   const admin = new Admin();
  //   setThisAdmin(admin);
  // }, []);
  
  
  return (
    <AdminContext.Provider value={{userType, setUserType, allUserTypes, setAllUserTypes, service, setService, allServices, setAllServices, additionalService, setAdditionalService, allAdditionalServices, setAllAdditionalServices, availabilityOption, setAvailabilityOption, allAvailabilityOptions, setAllAvailabilityOptions, dwellingAdjustment, setDwellingAdjustment, allDwellingAdjustments, setAllDwellingAdjustments }}>
      {children}
    </AdminContext.Provider>
  );
};
