import { AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData, ServiceTypeData } from "./serviceInterfaces";

export interface AddressData {
  address1: string;
  address2: string;
  unitNumber?: number;
  city: string;
  state: string;
  zipCode: number;
}

export interface PropertyData{
  sqFt: number;
  bedrooms?: number;
  foundationAccess?: string;
}

export interface AppointmentData{
  service: ServiceTypeData;
  additional_services: AdditionalServiceData[] | null;
  availability_options: AvailabilityOptionData[] | null;
  dwelling_adjustment: DwellingAdjustmentData;
  property_data: PropertyData;
  address: AddressData;
}