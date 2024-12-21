export interface UserTypeData {
  user_type_id: number | null;
  user_type: string | null;
  user_description: string | null;
  visibility: boolean | null;
  available_service_1: number | null;
  available_service_2: number | null;
  available_service_3: number | null;
  available_service_4: number | null;
}

export interface ServiceData {
  service_id: number | null;
  title: string | null;
  can_be_scheduled: boolean | null;
  differential_scheduling: boolean | null;
  ui_description_set_id: number | null;
  appointment_part_1: number | null;
  appointment_part_2: number | null;
  appointment_part_3: number | null;
  appointment_part_4: number | null;
}

export interface UIDescriptionsData {
  ui_description_set_id: number | null;
  buyer_description: string | null;
  agent_description: string | null;
  owner_description: string | null;
}