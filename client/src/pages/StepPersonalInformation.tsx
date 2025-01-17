import { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Icon from '../@core/components/icon'
import CustomTextField from '../@core/components/mui/text-field'
import { ContactTypes } from './JosePortOver/Appointment';

const Sections = {
    CLIENT: 'Client',
    CLIENT_2: 'Another Client',
    TRANSACTION_MANAGER: 'Transaction Manager',
    SELLER: 'Seller'
}

const hasInfo = contact => contact.firstName || contact.lastName || contact.email;

const StepPersonalInformation = props => {

    const {
        appointment,
        appointment: { contactInfo }
    } = props;

    const [sections, setSections] = useState({
        [Sections.CLIENT_2]: hasInfo(contactInfo[ContactTypes.ANOTHER_CLIENT]),
        [Sections.TRANSACTION_MANAGER]: hasInfo(contactInfo[ContactTypes.TRANSACTION_MANAGER]),
        [Sections.SELLER]: hasInfo(contactInfo[ContactTypes.SELLER]),
    })

    const handleToggleSection = (state, section) => {
        setSections({
            ...sections,
            [section]: state
        })
    }

    const handleFirstNameChange = (event , contactType) => {
        const contactDetails = contactInfo[contactType];

        appointment.setContactInfo({
            ...contactInfo,
            [contactType]: {
                ...contactDetails,
                firstName: event.target.value
            }
        })
    }

    const handleLastNameChange = (event , contactType) => {
        const contactDetails = contactInfo[contactType];

        appointment.setContactInfo({
            ...contactInfo,
            [contactType]: {
                ...contactDetails,
                firstName: event.target.value
            }
        })
    }

    const handleEmailChange = (event , contactType) => {
        const contactDetails = contactInfo[contactType];

        appointment.setContactInfo({
            ...contactInfo,
            [contactType]: {
                ...contactDetails,
                firstName: event.target.value
            }
        })
    }

    const renderDeleteButton = section => (
        <IconButton color='inherit' aria-haspopup='true' aria-label='capture screenshot'
                    onClick={() => handleToggleSection(false, section)}>
            <Icon icon='tabler:trash'/>
        </IconButton>
    )

    const renderAddButton = section => (
        <Button disabled={sections[section]} size='small' sx={{mr: 2}} variant='outlined'
                onClick={() => handleToggleSection(true, section)}>Add {section}</Button>
    )

    const renderContactForms = (contactType, title, canDelete, shouldShow = true) => {
        if (!shouldShow) {
            return null;
        }

        return (
            <Grid container spacing={4} sx={{mt: 5}}>
                <Grid item xs={12} md={12}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography variant='h6'>
                            {`${title} Information`}
                        </Typography>
                        {canDelete && renderDeleteButton(title)}
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CustomTextField
                        fullWidth
                        label='First Name'
                        placeholder='Joe'
                        value={contactInfo[contactType].firstName}
                        onChange={e => handleFirstNameChange(e, contactType)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CustomTextField
                        fullWidth
                        label='Last Name'
                        placeholder='Smith'
                        value={contactInfo[contactType].lastName}
                        onChange={e => handleLastNameChange(e, contactType)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <CustomTextField
                        fullWidth
                        type='email'
                        placeholder='joe.smith@xyz.com'
                        label='Email'
                        value={contactInfo[contactType].email}
                        onChange={e => handleEmailChange(e, contactType)}
                    />
                </Grid>
            </Grid>
        )
    }

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12} md={12}>
                    <Typography variant='h4'>
                        Contact Information
                    </Typography>
                    <Typography variant='body2'>
                        Add contact info for all interested parties who will receive inspection correspondence
                    </Typography>
                </Grid>
            </Grid>
            {renderContactForms(ContactTypes.CLIENT, 'Client', false)}
            {renderContactForms(ContactTypes.AGENT, 'Agent', false)}
            {sections[Sections.CLIENT_2] && renderContactForms(ContactTypes.ANOTHER_CLIENT, Sections.CLIENT_2, true)}
            {sections[Sections.TRANSACTION_MANAGER] && renderContactForms(ContactTypes.TRANSACTION_MANAGER, Sections.TRANSACTION_MANAGER, true)}
            {sections[Sections.SELLER] && renderContactForms(ContactTypes.SELLER, Sections.SELLER, true)}
            <Grid container spacing={4} sx={{mt: 5}}>
                <Grid item xs={12} md={9}>
                    {renderAddButton(Sections.CLIENT_2)}
                    {renderAddButton(Sections.TRANSACTION_MANAGER)}
                    {renderAddButton(Sections.SELLER)}
                </Grid>
            </Grid>
        </>
    )
}

export default StepPersonalInformation
