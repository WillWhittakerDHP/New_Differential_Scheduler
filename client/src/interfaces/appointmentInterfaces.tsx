
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

export interface TimeContentData{
  on_site: boolean;
base_sq_ft: number;
base_time: number;
rate_over_base_time: number;
base_fee: number;
rate_over_base_fee: number;
}