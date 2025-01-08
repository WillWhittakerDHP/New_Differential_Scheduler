export interface UserTypeData {
  id: number | null;
  name: string | null;
  icon: string | null;
  description: string | null;
  visibility: boolean | null;
  Services?: ServiceData | null;
}

export interface TimeContentData{
  on_site: boolean;
  base_sq_ft: number;
  base_time: number;
  rate_over_base_time: number;
  base_fee: number;
  rate_over_base_fee: number;
  }

export interface ServiceData {
  id: number | null;
  name: string | null;
  differential_scheduling: boolean | null;
  description: string | null;
  visibility: boolean | null;
  data_collection: TimeContentData | null;
  report_writing: TimeContentData | null;
  client_presentation: TimeContentData | null;
  AdditionalServices?: AdditionalServiceData[] | null;
  AvailabilityOptions?: AvailabilityOptionData[] | null;
  DwellingAdjustments?: DwellingAdjustmentData[] | null;
}

export interface AdditionalServiceData {
  id: number | null;
  name: string | null;
  differential_scheduling: boolean | null;
  visibility: boolean | null;
  description: string | null;
  data_collection: TimeContentData | null;
  report_writing: TimeContentData | null;
  client_presentation: TimeContentData | null;
}

export interface AvailabilityOptionData {
  id: number | null;
  name: string | null;
  differential_scheduling: boolean | null;
  visibility: boolean | null;
  description: string | null;
  data_collection: TimeContentData | null;
  report_writing: TimeContentData | null;
  client_presentation: TimeContentData | null;
}

export interface DwellingAdjustmentData {
  id: number | null;
  name: string | null;
  visibility: boolean | null;
  data_collection: TimeContentData | null;
  report_writing: TimeContentData | null;
  client_presentation: TimeContentData | null;
}