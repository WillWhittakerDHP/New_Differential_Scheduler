import { AppointmentBlock } from "./appointmentInterfaces";

export interface UserTypeData {
  id: number | null;
  name: string | null;
  icon: string | null;
  description: string | null;
  visibility: boolean | null;
  Services?: ServiceData | null;
}

export interface ServiceData {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  base_sq_ft: number;
  data_collection: AppointmentBlock;
  report_writing: AppointmentBlock;
  formal_presentation: AppointmentBlock;
  AdditionalServices?: AdditionalServiceData[] | null;
  AvailabilityOptions?: AvailabilityOptionData[] | null;
  DwellingAdjustments?: DwellingAdjustmentData[] | null;
}

export interface AdditionalServiceData {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  base_sq_ft: number;
  data_collection: AppointmentBlock;
  report_writing: AppointmentBlock;
  formal_presentation: AppointmentBlock;
}

export interface AvailabilityOptionData {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  base_sq_ft: number;
  data_collection: AppointmentBlock;
  report_writing: AppointmentBlock;
  formal_presentation: AppointmentBlock;
}

export interface DwellingAdjustmentData {
  id: number;
  name: string;
  visibility: boolean;
  base_sq_ft: number;
  data_collection: AppointmentBlock;
  report_writing: AppointmentBlock;
  formal_presentation: AppointmentBlock;
}