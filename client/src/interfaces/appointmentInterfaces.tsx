export interface UserTypeData {
  id: number | null;
  type: string | null;
  incon: string | null;
  description: string | null;
  visibility: boolean | null;
}

export interface ServiceData {
  id: number | null;
  name: string | null;
  can_be_scheduled: boolean | null;
  differential_scheduling: boolean | null;
}

export interface UIDescriptionsData {
  ui_description_set_id: number | null;
  buyer_description: string | null;
  agent_description: string | null;
  owner_description: string | null;
}