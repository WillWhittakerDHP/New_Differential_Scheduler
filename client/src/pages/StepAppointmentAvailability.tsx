// ** React Imports
import {useState} from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'

// ** Custom Components Imports
import { DatePicker } from '@mui/lab'

// ** Styled Component
import DatePickerWrapper from '../@core/styles/libs/react-datepicker'
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from '@mui/material/IconButton';
import Icon from "../@core/components/icon";
import Slider from '@mui/material/Slider';

// import parse from 'date-fns/parse';

const StepAppointmentAvailability = props => {

    const {
        appointment,
        appointment: {
            additionalPresentationTime,
            day,
            inspectorTimeSlot,
            isClientPresent,
            clientTimeSlot,
            minimizeInspectionTime,
            selectedTimeSlotPair,
            timeSlots
        }
    } = props;

    const [startTimeType, setStartTimeType] = useState('inspector');

    const getTimeSlots = startTimeType => {
        if (startTimeType === 'inspector') {
            return getInspectorTimes();
        } else {
            return getClientTimes();
        }
    }

    const getInspectorTimes = () => {
        return timeSlots.map(({inspectorAppointment}) => inspectorAppointment.startLabel);
    }

    const getClientTimes = () => {
        return timeSlots.map(({clientAppointment}) => clientAppointment.startLabel);
    }

    /* -------- Handlers -------- */

    const handleInspectorClick = () => {
        setStartTimeType('inspector')
    }

    const handleClientClick = () => {
        setStartTimeType('client')
    }

    const handleTimeSlotClick = (slot, startTimeType) => {
        if (startTimeType === 'inspector') {
            appointment.setTimeSlot({inspectorStart: slot});
        } else {
            appointment.setTimeSlot({clientStart: slot});
        }
    }

    const handleDateChange = date => {
        appointment.setDay(date);
        appointment.resetTimeSlot();
    }

    const handleMinimizeInspectorTimeToggle = () => {
        appointment.setMinimizeInspectionTime(!minimizeInspectionTime);
    }

    const handleAdditionalClientTimeToggle = () => {
        appointment.setAdditionalPresentationTime(!additionalPresentationTime);
    }

    /* -------- Renderers -------- */

    const renderTimeSlots = () => {
        const selectedTimeSlot = startTimeType === 'inspector' ? inspectorTimeSlot : clientTimeSlot;

        const timeSlots = getTimeSlots(startTimeType).map((slot, index) => (slot ?
                <Button
                    color={startTimeType === 'inspector' ? 'primary' : 'warning'}
                    key={index}
                    variant={selectedTimeSlot === slot ? 'contained' : 'outlined'} size='small'
                    onClick={() => handleTimeSlotClick(slot, startTimeType)}>
                    {slot}
                </Button> : <div>&nbsp;</div>
        ))

        return (
            <Box sx={{
                padding: '30px 0',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(7, 1fr)',
                gridColumnGap: '10px',
                gridRowGap: '10px',
                gridAutoFlow: 'column'
            }}>
                {timeSlots}
            </Box>
        )
    }

    const renderTimeBars = () => {
        if (!selectedTimeSlotPair) {
            return null;
        }

        const {inspectorAppointment, clientAppointment} = selectedTimeSlotPair;

        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
                marginBottom: '30px',
                rowGap: '5px',
            }}>
                <Button sx={{width: '100%', minWidth: '250px', justifyContent: 'right'}} variant='contained'
                        onClick={handleInspectorClick}>
                    {isClientPresent ? 'Inspector' : 'Time onsite'}: {inspectorAppointment.startLabel} → {inspectorAppointment.endLabel}
                </Button>
                {isClientPresent &&
                    <Button sx={{width: '50%', minWidth: '250px', justifyContent: 'right'}} color='warning'
                            variant='contained'
                            onClick={handleClientClick}>
                        Client: {clientAppointment.startLabel} → {clientAppointment.endLabel}
                    </Button>}
            </Box>
        )
    }

    const renderChoices = () => {
        return (
            <Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <FormControlLabel control={<Checkbox
                        checked={minimizeInspectionTime}
                        onChange={handleMinimizeInspectorTimeToggle}
                        sx={{padding: '3px'}} defaultChecked/>}
                                      label='Minimize inspector time in property'/>
                    <Tooltip arrow placement='right'
                             title='Your inspector accesses the property early to examine the property and test the equipment before the client presentation. The report will be written AFTER the client presentation'>
                        <IconButton sx={{padding: '3px'}} aria-label='capture screenshot' color='primary'>
                            <Icon icon='ph:info-light'/>
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <FormControlLabel control={<Checkbox
                        checked={additionalPresentationTime}
                        onChange={handleAdditionalClientTimeToggle}
                        sx={{padding: '3px'}} defaultChecked/>}
                                      label='Additional client presentation time'/>
                    <Tooltip arrow
                             placement='right'
                             title='If client would like to spend additional time on the property with the inspector, time will be extended on site to accommodate. Additional costs apply'>
                        <IconButton sx={{padding: '3px'}} aria-label='capture screenshot' color='primary'>
                            <Icon color='primary' icon='ph:info-light'/>
                        </IconButton>
                    </Tooltip>
                </Box>
                {
                    <Slider
                        step={null}
                        // marks={marks}
                        defaultValue={20}
                        valueLabelDisplay='auto'
                        // getAriaValueText={valuetext}
                        // valueLabelFormat={valueLabelFormat}
                        aria-labelledby='restricted-values-slider'
                    />
                }
            </Box>
        )
    }

    const renderParticipantSelection = () => {
        if (!isClientPresent) {
            return null;
        }

        return (
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
                flexWrap: 'wrap'
            }}>
                <Typography variant='body2' sx={{mr: 3}}>
                    Show start times for:
                </Typography>
                <Button variant={startTimeType === 'inspector' ? 'contained' : 'outlined'}
                        color={startTimeType === 'inspector' ? 'primary' : 'warning'} size='small'
                        onClick={handleInspectorClick}>
                    Inspector
                </Button>
                <Button variant={startTimeType !== 'inspector' ? 'contained' : 'outlined'}
                        color={startTimeType === 'inspector' ? 'primary' : 'warning'} size='small' sx={{ml: 1}}
                        onClick={handleClientClick}>
                    Client
                </Button>
            </Box>
        )
    }

    const renderTimeSelection = () => {
        if (!day) {
            return (
                <Grid item sm={12} md={8}>
                    <Box sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        Select a time for your appointment
                    </Box>
                </Grid>
            )
        }

        return (
            <Grid item sm={12} md={8}>
                {renderParticipantSelection()}
                {renderTimeSlots()}
                {renderTimeBars()}
                {renderChoices()}
            </Grid>
        )
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h4'>
                        Appointment Availability
                    </Typography>
                    <Typography variant='body2'>
                        Select a time that works for everybody
                    </Typography>
                </Grid>
                <Grid item sm={12} md={4}>
                    <DatePickerWrapper
                        sx={{'& .react-datepicker': {boxShadow: 'none !important', border: 'none !important'}}}>
                        <DatePicker
                            inline
                            selected={day}
                            startDate={day}
                            onChange={handleDateChange}/>
                    </DatePickerWrapper>
                </Grid>
                {renderTimeSelection()}
            </Grid>
        </>
    )
}

export default StepAppointmentAvailability
