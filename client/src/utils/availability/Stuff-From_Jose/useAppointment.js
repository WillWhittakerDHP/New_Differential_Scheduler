import {useCallback, useEffect, useState} from "react";
import {
    DwellingType,
    PartTypes,
    RequesterTypes,
    ServiceTypeNames,
    ServiceTypes
} from './Appointment';

import getTimeSlots from "./getTimeSlots";

const getSlotPart = (home_sq_ft, partType, serviceType) => {
    const { base_time, base_sq_ft, workRate } = PartTypeMap[partType][serviceType];
    const { minutes: base_timeMinutes } = base_time;
    const overBasehome_sq_ft = Number(home_sq_ft) < base_sq_ft ? 0 : home_sq_ft - base_sq_ft;
    const overBaseMinutes = overBasehome_sq_ft * workRate;
    const overBaseMinutesRounded = Math.ceil(overBaseMinutes / DEFAULT_INCREMENT) * DEFAULT_INCREMENT;
    const slotPartTime = base_timeMinutes + overBaseMinutesRounded;

    return slotPartTime;
}


const DEFAULT_SLOT_LENGTH = {hours: 2};

const useAppointment = () => {

    // Service Selection
    const [requester, setRequester] = useState(RequesterTypes.BUYER);
    const [serviceType, setServiceType] = useState(ServiceTypeNames.BUYERS_INSPECTION);
    const [additionalServices, setAdditionalServices] = useState([]);
    const [isClientPresent, setIsClientPresent] = useState(true);

    // Property Details
    const [dwellingType, setDwellingType] = useState(DwellingType.CONDO);
    const [home_sq_ft, sethome_sq_ft] = useState(0);
    const [numberOfUnits, setNumberOfUnits] = useState(0);

    // // Contact Information
    // const [contactInfo, setContactInfo] = useState({
    //     [ContactTypes.CLIENT]: {...DEFAULT_CONTACT_INFO},
    //     [ContactTypes.AGENT]: {...DEFAULT_CONTACT_INFO},
    //     [ContactTypes.ANOTHER_CLIENT]: {...DEFAULT_CONTACT_INFO},
    //     [ContactTypes.TRANSACTION_MANAGER]: {...DEFAULT_CONTACT_INFO},
    //     [ContactTypes.SELLER]: {...DEFAULT_CONTACT_INFO},
    // });

    // Schedule
    const [inspectorTimeSlot, setInspectorTimeSlot] = useState('');
    const [clientTimeSlot, setClientTimeSlot] = useState('');
    const [day, setDay] = useState('');
    const [minimizeInspectionTime, setMinimizeInspectionTime] = useState(false);
    const [additionalPresentationTime, setAdditionalPresentationTime] = useState(false);

    const [selectedTimeSlotPair, setSelectedTimeSlotPair] = useState();
    const [timeSlots, setTimeSlots] = useState([]);
    const [appointmentDetails, setAppointmentDetails] = useState({
        dataCollectionLength: {minutes: 0},
        reportWritingLength: {minutes: 0},
        clientPresentationLength: {minutes: 0},
        appointmentLength: {minutes: DEFAULT_SLOT_LENGTH}
    })

    useEffect(() => {
        const {appointmentParts} = ServiceTypes[serviceType];

        const isClientPresent = appointmentParts.includes(PartTypes.CLIENT_PRESENTATION);
        setIsClientPresent(isClientPresent);
    }, [serviceType])

    useEffect(() => {
        const {appointmentParts} = ServiceTypes[serviceType];
        const onsiteLength = appointmentParts.reduce((acc, partType) => {

            const slotPart = getSlotPart(home_sq_ft, partType, serviceType);
            acc.appointmentLength.minutes += slotPart;
            acc[`${partType}Length`] = {minutes: slotPart};

            return acc;
        }, {appointmentLength: {minutes: 0}})

        setAppointmentDetails(onsiteLength);

        console.log(`---- Appointment Details ----`);
        console.log(appointmentDetails)

    }, [serviceType, home_sq_ft]);

    useEffect(() => {
        setTimeSlots(getTimeSlots(day, {
            startTime: [7, 0],
            endTime: [21, 0],
            appointmentDetails
        }))
    }, [day, appointmentDetails]);

    const getInspectorTimeSlot = useCallback(inspectorTimeStart => {
        return timeSlots.find(({inspectorAppointment}) => inspectorAppointment.startLabel === inspectorTimeStart);
    }, [timeSlots]);

    const getClientTimeSlot = useCallback(clientTimeStart => {
        return timeSlots.find(({clientAppointment}) => clientAppointment.startLabel === clientTimeStart);
    }, [timeSlots]);

    const setTimeSlot = useCallback(({inspectorStart, clientStart}) => {
        const timeSlotPair = inspectorStart
            ? getInspectorTimeSlot(inspectorStart)
            : getClientTimeSlot(clientStart)

        setSelectedTimeSlotPair(timeSlotPair);
        setInspectorTimeSlot(timeSlotPair.inspectorAppointment.startLabel)
        setClientTimeSlot(timeSlotPair.clientAppointment.startLabel);
    }, [inspectorTimeSlot, clientTimeSlot, timeSlots]);

    const resetTimeSlot = () => {
        setSelectedTimeSlotPair(null);
        setInspectorTimeSlot('');
        setClientTimeSlot('');
    }

    return {
        // additionalServices,
        // setAdditionalServices,
        additionalPresentationTime,
        setAdditionalPresentationTime,
        clientTimeSlot,
        setClientTimeSlot,
        // day,
        // setDay,
        home_sq_ft,
        sethome_sq_ft,
        // dwellingType,
        // setDwellingType,
        inspectorTimeSlot,
        setInspectorTimeSlot,
        isClientPresent,
        minimizeInspectionTime,
        setMinimizeInspectionTime,
        numberOfUnits,
        setNumberOfUnits,
        // requester,
        // setRequester,
        selectedTimeSlotPair,
        serviceType,
        setServiceType,
        timeSlots,
        resetTimeSlot,
        setTimeSlot
    }
}

export default useAppointment;
