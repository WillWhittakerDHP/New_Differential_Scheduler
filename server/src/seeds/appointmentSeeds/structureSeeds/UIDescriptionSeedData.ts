import { UIDescription } from "../../../models/index.js";

export const seedUIDescriptions = async () => {
  try{
    await UIDescription.bulkCreate(
      [
        {"buyer_description": "Im buying a home", "agent_description":  "My client is buying a home", "owner_description": "I own a home"},
        {"buyer_description": "condo for buyers", "agent_description": "condo for agents", "owner_description": "condo for owners"},
        {"buyer_description": "co-op for buyers", "agent_description": "co-op for agents", "owner_description": "co-op for owners"},
        {"buyer_description": "townhouse for buyers", "agent_description": "townhouse for agents", "owner_description": "townhouse for owners"},
        {"buyer_description": "single family home for buyers", "agent_description": "single family home for agents", "owner_description": "single family home for owners"},
        {"buyer_description": "multi-family home for buyers", "agent_description": "multi-family home for agents", "owner_description": "multi-family home for owners"},
        
        {"buyer_description": "Buyers Inspection for buyers", "agent_description":"Buyers Inspection for agents", "owner_description":"Not for you"},
        {"buyer_description": "Investors Inspection for buyers", "agent_description": "Investors Inspection for agents", "owner_description": "Investors Inspection for owners"},
        {"buyer_description": "Walk and Talk for buyers", "agent_description": "Walk and Talk for agents", "owner_description": "Not for you"},
        {"buyer_description": "Not for you", "agent_description": "Home Check-up and Maintenance Planning for agents", "owner_description": "Home Check-up and Maintenance Planning for owners"},
        {"buyer_description": "Not for you", "agent_description": "Pre-sale Walkthrough for agents", "owner_description": "Pre-sale Walkthrough for owners"},
        {"buyer_description": "Not for you", "agent_description": "Developers Warranty Inspection for agents", "owner_description": "Developers Warranty Inspection for owners"},
        
        {"buyer_description": "Reinspection for buyers", "agent_description": "Reinspection for agents", "owner_description": "Reinspection for owners"},
        {"buyer_description": "Blue Tape for buyer", "agent_description": "Blue Tape for Agents", "owner_description": "Not for you"},
        {"buyer_description": "Radon for buyer", "agent_description": "Radon for Agents", "owner_description": "Radon for owners"},
        {"buyer_description": "Reinspection for buyers", "agent_description": "Reinspection for agents", "owner_description": "Not for you"},
        {"buyer_description": "Accessory Dwelling Units for buyers", "agent_description": "Accessory Dwelling Units for agents", "owner_description": "accessory Dwelling Units for owners"},
        
        {"buyer_description": "Minimize Time On-site for buyers", "agent_description": "Minimize Time On-site for agents", "owner_description": "Minimize Time On-site for owners"},
        {"buyer_description": "Additional Client Time for buyers", "agent_description": "Additional Client Time for agents", "owner_description": "Additional Client Time for owners"},{"buyer_description": "Client will not be present for buyers", "agent_description": "Client will not be present for agents", "owner_description": "Client will not be present for owners"},{"buyer_description": "First-time buyers for buyers", "agent_description": "First-time buyers for agents", "owner_description": "Not for you"}
        
      ],
      { individualHooks: true }
    );
  } catch (error) { console.log(error)};
};