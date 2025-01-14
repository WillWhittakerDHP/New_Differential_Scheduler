import React, { createContext, useState, ReactNode } from 'react';
import useFetch from '../hooks/useFetch';
import { ADMIN_ROUTES } from './apiRoutes';
import {
  AdditionalServiceData,
  AvailabilityOptionData,
  DwellingAdjustmentData,
  ServiceData,
  UserTypeData,
} from '../interfaces/apiInterfaces';

export interface AdminContextType {
    fetchedUserTypes: UserTypeData[];
    fetchedServices: ServiceData[];
    fetchedDwellingAdjustments: DwellingAdjustmentData[];
    fetchedAdditionalServices: AdditionalServiceData[];
    fetchedAvailabilityOptions: AvailabilityOptionData[];
    loading: boolean;
    error: string | null;
    associationData: Record<keyof typeof ADMIN_ROUTES, any[]>; // Corrected type[];
}

export const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: fetchedUserTypes, loading: loadingUserTypes, error: errorUserTypes } = useFetch<UserTypeData[]>(ADMIN_ROUTES.userTypes);
  const { data: fetchedServices, loading: loadingServices, error: errorServices } = useFetch<ServiceData[]>(ADMIN_ROUTES.serviceTypes);
  const { data: fetchedDwellingAdjustments, loading: loadingDwellingAdjustments, error: errorDwellingAdjustments } = useFetch<DwellingAdjustmentData[]>(ADMIN_ROUTES.dwellingAdjustmentTypes);
  const { data: fetchedAdditionalServices, loading: loadingAdditionalServices, error: errorAdditionalServices } = useFetch<AdditionalServiceData[]>(ADMIN_ROUTES.additionalServiceTypes);
  const { data: fetchedAvailabilityOptions, loading: loadingAvailabilityOptions, error: errorAvailabilityOptions } = useFetch<AvailabilityOptionData[]>(ADMIN_ROUTES.availabilityOptionTypes);

  // Consolidated loading and error states
  const loading = loadingUserTypes || loadingServices || loadingDwellingAdjustments || loadingAdditionalServices || loadingAvailabilityOptions;
  const error = errorUserTypes || errorServices || errorDwellingAdjustments || errorAdditionalServices || errorAvailabilityOptions;

  const associationData = Object.keys(ADMIN_ROUTES).reduce((acc, key) => {
    acc[key as keyof typeof ADMIN_ROUTES] =
      key === 'serviceTypes'
        ? fetchedServices || []
        : key === 'additionalServiceTypes'
        ? fetchedAdditionalServices || []
        : key === 'availabilityOptionTypes'
        ? fetchedAvailabilityOptions || []        
        : key === 'dwellingAdjustmentTypes'
        ? fetchedDwellingAdjustments || []        
        : key === 'userTypes'
        ? fetchedUserTypes || []
        : [];
    return acc;
  }, {} as Record<keyof typeof ADMIN_ROUTES, any[]>);
  


  // Memoize the context value
  const contextValue = React.useMemo(
    () => ({
      fetchedUserTypes: fetchedUserTypes || [],
      fetchedServices: fetchedServices || [],
      fetchedDwellingAdjustments: fetchedDwellingAdjustments || [],
      fetchedAdditionalServices: fetchedAdditionalServices || [],
      fetchedAvailabilityOptions: fetchedAvailabilityOptions || [],
      loading,
      error,
      associationData
    }),
    [fetchedUserTypes, fetchedServices, fetchedDwellingAdjustments, fetchedAdditionalServices, fetchedAvailabilityOptions, loading, error, associationData]
  );

  return <AdminContext.Provider value={contextValue}>{children}</AdminContext.Provider>;
};