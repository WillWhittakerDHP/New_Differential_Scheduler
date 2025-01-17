import {add} from 'date-fns/add';
import {isWithinInterval} from 'date-fns/isWithinInterval';
import {format} from "date-fns/format";
import {sub} from 'date-fns/sub';

import {DEFAULT_INCREMENT} from './Appointment';

/* -------- Helpers -------- */

const getLabel = date => format(date, 'h:mmaaa');

const getSlot = (date, {minutesIncrement, appointmentLength}) => {
    if (!appointmentLength) {
        return {}
    }

    const newStart = minutesIncrement
        ? add(new Date(date.getTime()), {minutes: minutesIncrement})
        : date;

    const start = new Date(newStart.getTime());
    const end = add(new Date(newStart.getTime()), appointmentLength);

    return {
        start,
        startLabel: getLabel(start),
        end,
        endLabel: getLabel(end)
    }
}

const getClientSlot = (currentSlot, appointmentDetails) => {
    const { clientPresentationLength, dataCollectionLength, reportWritingLength } = appointmentDetails;

    return getSlot(currentSlot.start, {
        minutesIncrement: dataCollectionLength.minutes + reportWritingLength.minutes,
        appointmentLength: clientPresentationLength
    });
}

const isWithinWorkingHours = (slot, dayInterval) => {
    return isWithinInterval(slot.end, dayInterval);
}

const isAvailableSlot = (candidateAppointment, appointmentIntervals = []) => {
    return !appointmentIntervals.some(appointmentInterval => {
        const { start, end } = appointmentInterval;
        const paddedStart = sub(start, { minutes: 30 });
        const paddedEnd = add(end, { minutes: 30 });

        return isWithinInterval(candidateAppointment.start, { start: paddedStart, end: paddedEnd }) ||
            isWithinInterval(candidateAppointment.end, { start: paddedStart, end: paddedEnd });
    })
}

const getMockAppointment = (date, startHour) => {
    return {
        start: add(new Date(date.getTime()), {hours: startHour}),
        end: add(new Date(date.getTime()), {hours: startHour + 2})
    }
}

const getMockAppointmentIntervals = date => {
    return [
        // getMockAppointment(date, 10),
        getMockAppointment(date, 14)
    ]
}

/* -------- Entry -------- */

const getTimeSlots = (date, {startTime, endTime, appointmentDetails}) => {

    if (!date) {
        return [];
    }

    const mockAppointments = getMockAppointmentIntervals(date);

    const { appointmentLength } = appointmentDetails;
    const [startingHours, startingMinutes] = startTime;
    const [endHours, endMinutes] = endTime;

    const dayInterval = {
        start: add(new Date(date.getTime()), {hours: startingHours, minutes: startingMinutes}),
        end: add(new Date(date.getTime()), {hours: endHours, minutes: endMinutes + 1})
    }

    const timeSlots = [];
    let inspectorAppointment = getSlot(dayInterval.start, { appointmentLength });

    while (isWithinWorkingHours(inspectorAppointment, dayInterval)) {
        if (isAvailableSlot(inspectorAppointment, mockAppointments)) {
            timeSlots.push({
                inspectorAppointment,
                clientAppointment: getClientSlot(inspectorAppointment, appointmentDetails)
            });
        }

        inspectorAppointment = getSlot(inspectorAppointment.start, {
            minutesIncrement: DEFAULT_INCREMENT,
            appointmentLength: appointmentLength
        });
    }

    return timeSlots;
}

export default getTimeSlots;
