// ** React Imports
import {Fragment, useState} from 'react'

// ** MUI Imports
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid'
import {useTheme} from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
// import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from '../@core/components/icon'

// ** Custom Components Imports
// import CustomTextField from '../@core/components/mui/text-field'
import CustomRadioIcons from '../@core/components/custom-radio/icons'
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
// import Box from "@mui/material/Box";
// import CustomChip from "../@core/components/mui/chip";
// import MenuItem from "@mui/material/MenuItem";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'






import {RequesterTypeMap, RequesterTypes, ServiceTypes} from "./JosePortOver/Appointment";

const allAdditionalServices = [
    { name: 'Radon Testing', description: 'Blah blah blah blah blah blah blah blah blah blah' },
    { name: 'Blue Tape', description: 'Blah blah' },
    { name: 'Re-Inspection', description: 'Blah blah' }
]

const data = [
    {
        value: RequesterTypes.BUYER,
        isSelected: true,
        content: 'I need an inspection to help me understand a property that I am trying to buy.',
        title: (
            <Typography variant='h6' sx={{mb: 1}}>
                I am the Buyer
            </Typography>
        )
    },
    {
        value: RequesterTypes.OWNER,
        content: 'I already own a property but need to understand it better.',
        title: (
            <Typography variant='h6' sx={{mb: 1}}>
                I am the Owner
            </Typography>
        )
    },
    {
        value: RequesterTypes.AGENT,
        content: 'I am a real estate agent helping a buyer with their inspection needs.',
        title: (
            <Typography variant='h6' sx={{mb: 1}}>
                I am the Agent
            </Typography>
        )
    }
]

const StepServiceSelection = props => {

    const {
        appointment,
        appointment: {
            additionalServices,
            requester,
            serviceType
        }
    } = props;

    const initialIconSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
        .value

    // ** States
    const [showValues, setShowValues] = useState(false)
    const [selectedRadio, setSelectedRadio] = useState(initialIconSelected)

    // ** Hook
    const theme = useTheme()

    const icons = [
        {
            icon: 'tabler:building',
            iconProps: {fontSize: '2.5rem', style: {marginBottom: 8}, color: theme.palette.text.secondary}
        },
        {
            icon: 'tabler:diamond',
            iconProps: {fontSize: '2.5rem', style: {marginBottom: 8}, color: theme.palette.text.secondary}
        },
        {
            icon: 'tabler:briefcase',
            iconProps: {fontSize: '2.5rem', style: {marginBottom: 8}, color: theme.palette.text.secondary}
        }
    ]

    /* ----- Handlers ----- */

    const handleAdditionalServicesChange = name => {
        const services = new Set(appointment.additionalServices);
        services.add(name);

        appointment.setAdditionalServices(Array.from(services));
    }

    const handleRequesterChange = event => {
        if (typeof event === 'string') {
            appointment.setRequester(event)
        } else {
            appointment.setRequester(event.target.value)
        }
    }

    const handleServiceTypeChange = event => {
        appointment.setServiceType(event.target.value);
    }

    const handleDeleteAdditionalService = deletedService => {
        const services = appointment.additionalServices.filter(service => service !== deletedService);

        appointment.setAdditionalServices(services);
    }

    /* ----- Renderers ----- */

    const renderServiceTypes = (requester) => {

        if (!requester) {
            return;
        }

        return RequesterTypeMap[requester].map(serviceTypeName => {
            const { title, description } = ServiceTypes[serviceTypeName];

            return (
                <FormControlLabel sx={{mt: 5}} value={serviceTypeName} control={<Radio/>} label={
                    <Fragment>
                        <Typography variant='body1'>{title}</Typography>
                        <Typography variant='body2'>{description}</Typography>
                    </Fragment>
                } />
            )
        });
    }

    return (
        <>
            <Grid container sx={{mb: 6}} spacing={4}>
                {data.map((item, index) => (
                    <CustomRadioIcons
                        key={index}
                        data={data[index]}
                        name='custom-radios'
                        icon={icons[index].icon}
                        selected={requester}
                        gridProps={{sm: 4, xs: 12}}
                        handleChange={handleRequesterChange}
                        iconProps={icons[index].iconProps}
                    />
                ))}
            </Grid>
            <Grid container rowSpacing={10} spacing={4}>
                <Grid item xs={12} spacing={4}>
                    <FormControl>
                        <FormLabel id='common-area-radio' sx={{fontSize: theme => theme.typography.h5.fontSize}}>
                            Service Type
                        </FormLabel>
                        <RadioGroup
                            name='common-area-group'
                            value={serviceType}
                            aria-labelledby='common-area-radio'
                            onChange={handleServiceTypeChange}>
                            {renderServiceTypes(requester)}
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} spacing={4}>
                    <FormLabel sx={{fontSize: theme => theme.typography.h5.fontSize}}>
                        Additional Services
                    </FormLabel>
                    <List>
                        {
                            allAdditionalServices.map(({ name, description }) => (
                                <ListItem>
                                    <ListItemButton onClick={() => handleAdditionalServicesChange(name)}>
                                        <ListItemText primary={name} secondary={description} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge='end'>
                                                <Icon icon='tabler:plus' />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
                <Grid item xs={6} spacing={4}>
                    {additionalServices.map(service =>
                        <Chip label={service} color='primary' variant='outlined' onDelete={() => handleDeleteAdditionalService(service)} />
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default StepServiceSelection
