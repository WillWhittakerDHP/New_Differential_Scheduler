export interface UserTypeData {
  id: number | null;
  name: string | null;
  icon: string | null;
  description: string | null;
  visibility: boolean | null;
  Services?: ServiceData | null;
}

export interface ServiceData {
  id: number | null;
  name: string | null;
  description: string | null;
  visibility: boolean | null;
  AdditionalServices?: AdditionalServiceData[] | null;
  AvailabilityOptions?: AvailabilityOptionData[] | null;
  DwellingAdjustments?: DwellingAdjustmentData[] | null;
}

export interface AdditionalServiceData {
  id: number | null;
  name: string | null;
  visibility: boolean | null;
  description: string | null;
}

export interface AvailabilityOptionData {
  id: number | null;
  name: string | null;
  visibility: boolean | null;
  description: string | null;
}

export interface DwellingAdjustmentData {
  id: number | null;
  name: string | null;
  visibility: boolean | null;
}