import { TimeBlockSet } from "../../../models/index.js";

export const seedTimeBlockSets = async () => {
  try{
    await TimeBlockSet.bulkCreate(
      [
        {"base_time": 0, "rate_over_base_time": 0, "base_fee": 0, "rate_over_base_fee": 0},
        {"base_time": 15, "rate_over_base_time": 100, "base_fee": 0, "rate_over_base_fee": 10},
        {"base_time": 30, "rate_over_base_time": 100, "base_fee": 50, "rate_over_base_fee": 10},
        {"base_time": 30, "rate_over_base_time": 100, "base_fee": 75, "rate_over_base_fee": 10},
        {"base_time": 15, "rate_over_base_time": 100, "base_fee": 50, "rate_over_base_fee": 10},
        {"base_time": 45, "rate_over_base_time": 100, "base_fee": 75, "rate_over_base_fee": 50},
        {"base_time": 60, "rate_over_base_time": 100, "base_fee": 50, "rate_over_base_fee": 10},
        {"base_time": 60, "rate_over_base_time": 150, "base_fee": 50, "rate_over_base_fee": 100},
        {"base_time": 75, "rate_over_base_time": 100, "base_fee": 125, "rate_over_base_fee": 200},
        {"base_time": 175, "rate_over_base_time": 0, "base_fee": 0, "rate_over_base_fee": 0},
        {"base_time": 30, "rate_over_base_time": 50, "base_fee": 50, "rate_over_base_fee": 120},
        {"base_time": 100, "rate_over_base_time": 100, "base_fee": 100, "rate_over_base_fee": 100}
      ],
      { individualHooks: true }
    );
  } catch (error) { console.log(error)};
};
