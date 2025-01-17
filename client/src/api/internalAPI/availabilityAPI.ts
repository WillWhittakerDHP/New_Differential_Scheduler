import { useContext } from 'react';
import { AppointmentContext } from '../../context/AppointmentContext';

const sendAppointmentDataToBackend = async () => {
  const context = useContext(AppointmentContext);

  if (!context || !context.thisAppointment) {
    console.error('No appointment data available in context.');
    return;
  }

  const response = await fetch('/internal/availability/batch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      appointment: context.thisAppointment
    }),
  });

  if (!response.ok) {
    console.error('Failed to send appointment data:', response.statusText);
    return;
  }

  const availabilities = await response.json();
  console.log('Received availabilities:', availabilities);
};
