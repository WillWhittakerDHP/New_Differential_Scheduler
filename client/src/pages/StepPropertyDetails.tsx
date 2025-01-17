// ** React Imports
// import {useState} from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import {useTheme} from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import CustomTextField from '../@core/components/mui/text-field'
import CustomRadioIcons from '../@core/components/custom-radio/icons'
import InputAdornment from "@mui/material/InputAdornment";
import {DwellingType} from "./JosePortOver/Appointment";

const data = [
    {
        value: DwellingType.CONDO,
        isSelected: true,
        title: (
            <Typography sx={{mb: 1}} variant='h6'>
                Condo / Co-Op
            </Typography>
        )
    },
    {
        value: DwellingType.TOWNHOUSE,
        title: (
            <Typography sx={{mb: 1}} variant='h6'>
                Townhouse
            </Typography>
        )
    },
    {
        value: DwellingType.SINGLE_FAMILY,
        title: (
            <Typography sx={{mb: 1}} variant='h6'>
                Single Family
            </Typography>
        )
    },
    {
        value: DwellingType.MULTI_FAMILY,
        title: (
            <Typography sx={{mb: 1}} variant='h6'>
                Multi Family
            </Typography>
        )
    }
]

const StepPropertyDetails = props => {
    const {
        appointment,
        appointment: {
            address,
            city,
            dwellingSize,
            dwellingType,
            numberOfUnits,
            state,
            unit,
            zipCode
        }
    } = props;

    const initialIconSelected = data.filter(item => item.isSelected)[data.filter(item => item.isSelected).length - 1]
        .value

    // ** Hook
    const theme = useTheme()

    const icons = [
        {
            icon: 'tabler:building',
            iconProps: {fontSize: '2.5rem', style: {marginBottom: 8}, color: theme.palette.text.secondary}
        },
        {
            icon: 'fluent:building-townhouse-20-regular',
            iconProps: {fontSize: '2.5rem', style: {marginBottom: 8}, color: theme.palette.text.secondary}
        },
        {
            icon: 'tabler:home',
            iconProps: {fontSize: '2.5rem', style: {marginBottom: 8}, color: theme.palette.text.secondary}
        },
        {
            icon: 'bi:houses',
            iconProps: {fontSize: '2.5rem', style: {marginBottom: 8}, color: theme.palette.text.secondary}
        }
    ]

    const handleAddressChange = event => {
        appointment.setAddress(event.target.value);
    }

    const handleDwellingTypeChange = prop => {
        console.log(prop);
        if (typeof prop === 'string') {
            appointment.setDwellingType(prop)
        } else {
            appointment.setDwellingType(prop.target.value)
        }
    }

    const handleUnitChange = event => {
        appointment.setUnit(event.target.value);
    }

    const handleCityChange = event => {
        appointment.setCity(event.target.value);
    }

    const handleStateChange = event => {
        appointment.setState(event.target.value);
    }

    const handleZipCodeChange = event => {
        appointment.setZipCode(event.target.value);
    }

    const handleDwellingSizeChange = event => {
        appointment.setDwellingSize(event.target.value);
    }

    const handleNumberOfUnitsChange = event => {
        appointment.setNumberOfUnits(event.target.value);
    }


    const isCondo = dwellingType === DwellingType.CONDO;
    const isMultiFamily = dwellingType === DwellingType.MULTI_FAMILY;

    return (
        <>
            <Grid container sx={{mb: 6}} spacing={4}>
                {data.map((item, index) => (
                    <CustomRadioIcons
                        key={index}
                        data={data[index]}
                        icon={icons[index].icon}
                        selected={dwellingType}
                        name='custom-radios-property'
                        gridProps={{sm: 3, xs: 12}}
                        handleChange={handleDwellingTypeChange}
                        iconProps={icons[index].iconProps}
                    />
                ))}
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h5'>
                        Location
                    </Typography>
                </Grid>
                <Grid item xs={12} md={isCondo ? 9 : 12}>
                    <CustomTextField
                        fullWidth
                        label='Address'
                        placeholder='123 Pleasant St.'
                        aria-describedby='validation-zip-code'
                        value={address}
                        onChange={handleAddressChange}
                    />
                </Grid>
                {isCondo &&
                    <Grid item xs={12} md={3}>
                        <CustomTextField
                            fullWidth
                            label='Unit'
                            placeholder='10'
                            value={unit}
                            onChange={handleUnitChange}/>
                    </Grid>
                }
                <Grid item xs={12} md={6}>
                    <CustomTextField
                        fullWidth
                        label='City'
                        placeholder='Los Angeles'
                        value={city}
                        onChange={handleCityChange}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <CustomTextField
                        select
                        fullWidth
                        defaultValue='VA'
                        label='State'
                        SelectProps={{value: state, onChange: e => handleStateChange(e)}}>
                        <MenuItem value='FL'>Florida</MenuItem>
                        <MenuItem value='VA'>Virginia</MenuItem>
                    </CustomTextField>
                </Grid>
                <Grid item xs={12} md={3}>
                    <CustomTextField
                        type='number'
                        fullWidth
                        label='Zip Code'
                        defaultValue='US'
                        value={zipCode}
                        onChange={handleZipCodeChange}/>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h5' sx={{mt: 5}}>
                        Details
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <CustomTextField
                        fullWidth
                        type='number'
                        placeholder='800'
                        label='Size'
                        value={dwellingSize}
                        onChange={handleDwellingSizeChange}
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>sq-ft</InputAdornment>
                        }}
                    />
                </Grid>
                {isMultiFamily && <Grid item xs={12} md={6}>
                    <CustomTextField
                        fullWidth
                        type='number'
                        placeholder='0'
                        label='Number of Units'
                        value={numberOfUnits}
                        onChange={handleNumberOfUnitsChange}
                    />
                </Grid>}
            </Grid>
        </>
    )
}

export default StepPropertyDetails
