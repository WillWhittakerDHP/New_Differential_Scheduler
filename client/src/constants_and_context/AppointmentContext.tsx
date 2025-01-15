import React, { createContext, useState, ReactNode, useEffect } from 'react';
import type { UserTypeData, ServiceData, DwellingAdjustmentData, AdditionalServiceData, AvailabilityOptionData } from '../interfaces/apiInterfaces';
import { Appointment, AppointmentBlock } from '../interfaces/appointmentInterfaces';

interface AggregatedAppointmentData {
  dataCollection: {
    totalTime: number;
    onSite: boolean;
  };
  reportWriting: {
    totalTime: number;
    onSite: boolean;
  };
  clientPresentation: {
    totalTime: number;
    onSite: boolean;
  };
}

interface AppointmentContextType {
  thisAppointment: Appointment | undefined;
  setThisAppointment: React.Dispatch<React.SetStateAction<Appointment | undefined>>;
  aggregatedData: AggregatedAppointmentData;
  setAggregatedData: () => Promise<void>; 

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
  const [aggregatedData, setAggregatedData] = useState<AggregatedAppointmentData>({
    dataCollection: { totalTime: 0, onSite: true },
    reportWriting: { totalTime: 0, onSite: true },
    clientPresentation: { totalTime: 0, onSite: true },
    });

    const updateAggregatedData = async () => {
      if (!thisAppointment) return;
  
  // Helper function to check if all blocks are on-site
  const areAllBlocksOnSite = (blocks: AppointmentBlock[]): boolean => {
    return blocks.every((block) => block.on_site);
  };

  // Aggregated Data Collection
  const allDataCollectionBlocks = [
    thisAppointment.base_service?.data_collection,
    thisAppointment.dwelling_type?.data_collection,
    ...thisAppointment.additional_services.map((part) => part.data_collection),
    ...thisAppointment.availability_options.map((part) => part.data_collection),
  ].filter(Boolean); // Filter out undefined or null blocks

  const allReportWritingBlocks = [
    thisAppointment.base_service?.report_writing,
    thisAppointment.dwelling_type?.report_writing,
    ...thisAppointment.additional_services.map((part) => part.report_writing),
    ...thisAppointment.availability_options.map((part) => part.report_writing),
  ].filter(Boolean);

  const allClientPresentationBlocks = [
    thisAppointment.base_service?.client_presentation,
    thisAppointment.dwelling_type?.client_presentation,
    ...thisAppointment.additional_services.map((part) => part.client_presentation),
    ...thisAppointment.availability_options.map((part) => part.client_presentation),
  ].filter(Boolean);

  const newAggregatedData = {
    dataCollection: {
      totalTime: allDataCollectionBlocks.reduce((sum, block) => sum + block!.base_time, 0),
      onSite: areAllBlocksOnSite(allDataCollectionBlocks as AppointmentBlock[]),
    },
    reportWriting: {
      totalTime: allReportWritingBlocks.reduce((sum, block) => sum + block!.base_time, 0),
      onSite: areAllBlocksOnSite(allReportWritingBlocks as AppointmentBlock[]),
    },
    clientPresentation: {
      totalTime: allClientPresentationBlocks.reduce((sum, block) => sum + block!.base_time, 0),
      onSite: areAllBlocksOnSite(allClientPresentationBlocks as AppointmentBlock[]),
    },
  };

  
      setAggregatedData(newAggregatedData);
    };
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
    updateAggregatedData();
  }, [thisAppointment, thisService, thisAdditionalService, thisAvailabilityOption, thisDwellingAdjustment]);
  

  return (
    <AppointmentContext.Provider value={{ thisAppointment, setThisAppointment, aggregatedData, setAggregatedData: updateAggregatedData, availableUserTypes, setAvailableUserTypes, thisUserType, setThisUserType,  availableServices, setAvailableServices, thisService, setThisService, availableAdditionalServices, setAvailableAdditionalServices, thisAdditionalService, setThisAdditionalService, availableAvailabilityOptions, setAvailableAvailabilityOptions, thisAvailabilityOption, setThisAvailabilityOption,availableDwellingAdjustments, setAvailableDwellingAdjustments, thisDwellingAdjustment, setThisDwellingAdjustment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
