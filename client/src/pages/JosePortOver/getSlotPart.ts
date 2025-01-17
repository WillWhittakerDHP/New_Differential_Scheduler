import { DEFAULT_INCREMENT } from "./Appointment";
import { PartTypeMap } from "./Appointment";

const getSlotPart = (dwellingSize, partType, serviceType) => {
    const { baseTime, baseSqft, workRate } = PartTypeMap[partType][serviceType];
    const { minutes: baseTimeMinutes } = baseTime;
    const overBaseDwellingSize = Number(dwellingSize) < baseSqft ? 0 : dwellingSize - baseSqft;
    const overBaseMinutes = overBaseDwellingSize * workRate;
    const overBaseMinutesRounded = Math.ceil(overBaseMinutes / DEFAULT_INCREMENT) * DEFAULT_INCREMENT;
    const slotPartTime = baseTimeMinutes + overBaseMinutesRounded;

    return slotPartTime;
}

export default getSlotPart;
