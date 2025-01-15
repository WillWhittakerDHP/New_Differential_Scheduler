import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { UserTypeData, ServiceData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/apiInterfaces';
import { Appointment, AppointmentPart } from '../interfaces/appointmentInterfaces';

export interface AggregatedTimeData {
  dataCollection: {
    totalTime: number;
    on_site: boolean;
    client_present: boolean;
  };
  reportWriting: {
    totalTime: number;
    on_site: boolean;
    client_present: boolean;
  };
  formalPresentation: {
    totalTime: number;
    on_site: boolean;
    client_present: boolean;
  };
}

interface AppointmentContextType {
  thisAppointment: Appointment | undefined;
  setThisAppointment: React.Dispatch<React.SetStateAction<Appointment | undefined>>;
  aggregatedTimeData: AggregatedTimeData;
  setAggregatedTimeData: () => Promise<void>; 

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

  fullAppointmentDuration: number;
  setFullAppointmentDuration: React.Dispatch<React.SetStateAction<number>>;
  onSiteDuration: number;
  setOnSiteDuration: React.Dispatch<React.SetStateAction<number>>;
  formalPresentationDuration: number;
  setFormalPresentationDuration: React.Dispatch<React.SetStateAction<number>>;
  offSiteDuration: number;
  setOffSiteDuration: React.Dispatch<React.SetStateAction<number>>;

  // thisAddress: Address | undefined;
  // setThisAddress: React.Dispatch<React.SetStateAction<Address | undefined>>;

  // thisProperty: Property | undefined;
  // setThisProperty: React.Dispatch<React.SetStateAction<Property | undefined>>;
}

export const AppointmentContext = createContext<AppointmentContextType | null>(null);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [thisAppointment, setThisAppointment] = useState<Appointment | undefined>();
  const [aggregatedTimeData, setAggregatedTimeData] = useState<AggregatedTimeData>({
    dataCollection: { totalTime: 0, on_site: true, client_present: false },
    reportWriting: { totalTime: 0, on_site: false, client_present: false },
    formalPresentation: { totalTime: 0, on_site: true, client_present: true  },
    });

    const updateAggregatedTimeData = async () => {
      if (!thisAppointment) return;
    
      const allParts = [
        thisAppointment.base_service,
        thisAppointment.dwelling_type,
        ...thisAppointment.additional_services,
        ...thisAppointment.availability_options,
      ].filter(Boolean);
    
      const aggregatePartTimes = (callback: (part: AppointmentPart) => number) =>
        allParts.reduce((sum, part) => sum + callback(part!), 0);
    
      const FullAppointmentDuration = aggregatePartTimes(
        (part) =>
          part.times.data_collection.totalTime +
          part.times.report_writing.totalTime +
          part.times.formal_presentation.totalTime
      );
    
      const onSiteDuration = aggregatePartTimes(
        (part) =>
          (part.times.data_collection.on_site ? part.times.data_collection.totalTime : 0) +
          (part.times.report_writing.on_site ? part.times.report_writing.totalTime : 0) +
          (part.times.formal_presentation.on_site ? part.times.formal_presentation.totalTime : 0)
      );
    
      const formalPresentationDuration = aggregatePartTimes(
        (part) =>
          (part.times.data_collection.client_present ? part.times.data_collection.totalTime : 0) +
          (part.times.report_writing.client_present ? part.times.report_writing.totalTime : 0) +
          (part.times.formal_presentation.client_present ? part.times.formal_presentation.totalTime : 0)
      );
    
      const offSiteDuration = aggregatePartTimes(
        (part) =>
          (!part.times.data_collection.on_site && !part.times.data_collection.client_present
            ? part.times.data_collection.totalTime
            : 0) +
          (!part.times.report_writing.on_site && !part.times.report_writing.client_present
            ? part.times.report_writing.totalTime
            : 0) +
          (!part.times.formal_presentation.on_site && !part.times.formal_presentation.client_present
            ? part.times.formal_presentation.totalTime
            : 0)
      );
    
      // Update aggregated time data
      const newAggregatedTimeData = {
        dataCollection: {
          totalTime: aggregatePartTimes((part) => part?.times.data_collection.totalTime),
          on_site: allParts.every((part) => part?.times.data_collection.on_site),
          client_present: allParts.every((part) => part?.times.data_collection.client_present),
        },
        reportWriting: {
          totalTime: aggregatePartTimes((part) => part?.times.report_writing.totalTime),
          on_site: allParts.every((part) => part?.times.report_writing.on_site),
          client_present: allParts.every((part) => part?.times.report_writing.client_present),
        },
        formalPresentation: {
          totalTime: aggregatePartTimes((part) => part?.times.formal_presentation.totalTime),
          on_site: allParts.every((part) => part?.times.formal_presentation.on_site),
          client_present: allParts.every((part) => part?.times.formal_presentation.client_present),
        },
      };
    
      // Update state
      setAggregatedTimeData(newAggregatedTimeData);
      setFullAppointmentDuration(FullAppointmentDuration);
      setOnSiteDuration(onSiteDuration);
      setFormalPresentationDuration(formalPresentationDuration);
      setOffSiteDuration(offSiteDuration);
    };

  const [fullAppointmentDuration, setFullAppointmentDuration] = useState<number>(0);
  const [onSiteDuration, setOnSiteDuration] = useState<number>(0);
  const [formalPresentationDuration, setFormalPresentationDuration] = useState<number>(0);
  const [offSiteDuration, setOffSiteDuration] = useState<number>(0);

  
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
  
  useEffect(() => {
    updateAggregatedTimeData();
  }, [thisAppointment, thisService, thisAdditionalService, thisAvailabilityOption, thisDwellingAdjustment]);
  

  return (
    <AppointmentContext.Provider value={{ thisAppointment, setThisAppointment, aggregatedTimeData, setAggregatedTimeData: updateAggregatedTimeData, fullAppointmentDuration, setFullAppointmentDuration, onSiteDuration, setOnSiteDuration, formalPresentationDuration, setFormalPresentationDuration, offSiteDuration, setOffSiteDuration, availableUserTypes, setAvailableUserTypes, thisUserType, setThisUserType,  availableServices, setAvailableServices, thisService, setThisService, availableAdditionalServices, setAvailableAdditionalServices, thisAdditionalService, setThisAdditionalService, availableAvailabilityOptions, setAvailableAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption,availableDwellingAdjustments, setAvailableDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
