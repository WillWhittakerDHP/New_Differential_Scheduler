import { AppointmentPart } from "../../../models/index.js";

export const seedAppointmentParts = async () => {
  try{
    await AppointmentPart.bulkCreate([
      {"appointment_part_type_id": 1, "on_site": true, "time_block_set_id": 1},
      {"appointment_part_type_id": 1, "on_site": true, "time_block_set_id": 2},
      {"appointment_part_type_id": 2, "on_site": true, "time_block_set_id": 3},
      {"appointment_part_type_id": 3, "on_site": true, "time_block_set_id": 4},
      {"appointment_part_type_id": 3, "on_site": false, "time_block_set_id": 5},
      {"appointment_part_type_id": 4, "on_site": true, "time_block_set_id": 6},
      {"appointment_part_type_id": 4, "on_site": false, "time_block_set_id": 7},
      {"appointment_part_type_id": 2, "on_site": true, "time_block_set_id": 8}
    ],
    { individualHooks: true }
  );
} catch (error) { console.log(error)};
};
