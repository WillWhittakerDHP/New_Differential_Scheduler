// import { AdditionalService } from "../../../models/index.js";

// export const seedAdditionalServices = async () => {
//   try{
//     await AdditionalService.bulkCreate(
//       [
//         {"title": "Blue Tape", "can_be_scheduled": true, "ui_description_set": 14, "appointment_part_1": 1, "appointment_part_2": 9, "appointment_part_3": 1, "appointment_part_4": 1},
//         {"title": "Radon", "can_be_scheduled": true, "ui_description_set": 15, "appointment_part_1": 1, "appointment_part_2": 10, "appointment_part_3": 1, "appointment_part_4": 1},
//         {"title": "Reinspection", "can_be_scheduled": true, "ui_description_set": 16, "appointment_part_1": 1, "appointment_part_2": 11, "appointment_part_3": 1, "appointment_part_4": 1},
//         {"title": "Accessory Dwelling Units", "can_be_scheduled": true, "ui_description_set": 17, "appointment_part_1": 1, "appointment_part_2": 12, "appointment_part_3": 1, "appointment_part_4": 1}
//       ],
//       { individualHooks: true }
//     );
//   } catch (error) { console.log(error)};
// };