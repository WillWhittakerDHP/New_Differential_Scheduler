import { AppointmentPart } from "./appointmentInterfaces";

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
  timeFeeContent: AppointmentPart;
  AdditionalServices?: AdditionalServiceData[] | null;
  AvailabilityOptions?: AvailabilityOptionData[] | null;
  DwellingAdjustments?: DwellingAdjustmentData[] | null;
}

export interface AdditionalServiceData {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  timeFeeContent: AppointmentPart;
}

export interface AvailabilityOptionData {
  id: number;
  name: string;
  description: string;
  visibility: boolean;
  timeFeeContent: AppointmentPart;
}

export interface DwellingAdjustmentData {
  id: number;
  name: string;
  visibility: boolean;
  timeFeeContent: AppointmentPart;
}