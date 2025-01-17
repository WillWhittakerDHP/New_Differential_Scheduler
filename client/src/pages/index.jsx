import { useState } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { styled, useTheme } from '@mui/material/styles'
import MuiStep from '@mui/material/Step'
import CardContent from '@mui/material/CardContent'

import Icon from '../@core/components/icon'
import CustomAvatar from '../@core/components/mui/avatar'

// import StepPersonalInformation from './StepPersonalInformation'
// import StepPriceDetails from './StepPriceDetails'
// import StepPropertyDetails from './StepPropertyDetails'
// import StepServiceSelection from './StepServiceSelection'
import StepAppointmentAvailability from './StepAppointmentAvailability'

import { hexToRGBA } from '../@core/utils/hex-to-rgba'
import StepperWrapper from '../@core/styles/mui/stepper'
import useAppointment from "../../../JosePortOver/useAppointment";

const steps = [
  {
    icon: 'tabler:users',
    title: 'Service Selection',
    subtitle: 'Identifying your needs'
  },
  {
    icon: 'tabler:home',
    title: 'Property Details',
    subtitle: 'Provide property info',
  },
  {
    icon: 'tabler:bookmarks',
    title: 'Appointment Availability',
    subtitle: 'Find a day/time slot'
  },
  {
    icon: 'tabler:map-pin',
    title: 'Personal Information',
    subtitle: 'Agent/Buyer information'
  },
  {
    icon: 'tabler:currency-dollar',
    title: 'Summary',
    subtitle: 'Summary of services'
  }
]

const StepperHeaderContainer = styled(CardContent)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('lg')]: {
    borderRight: 0,
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const Step = styled(MuiStep)(({ theme }) => ({
  '& .MuiStepLabel-root': {
    paddingTop: 0
  },
  '&:not(:last-of-type) .MuiStepLabel-root': {
    paddingBottom: theme.spacing(5)
  },
  '&:last-of-type .MuiStepLabel-root': {
    paddingBottom: 0
  },
  '& .MuiStepLabel-iconContainer': {
    display: 'none'
  },
  '& .step-subtitle': {
    color: `${theme.palette.text.disabled} !important`
  },
  '& + svg': {
    color: theme.palette.text.disabled
  },
  '&.Mui-completed .step-title': {
    color: theme.palette.text.disabled
  },
  '& .MuiStepLabel-label': {
    cursor: 'pointer'
  }
}))

const PropertyListingWizard = () => {
  // ** States
  const [activeStep, setActiveStep] = useState(0);

  const appointment = useAppointment();

  // appointment.set

  // ** Hook
  const theme = useTheme()

  // Handle Stepper
  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handlePrev = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return <StepServiceSelection appointment={appointment} />
      case 1:
        return <StepPropertyDetails appointment={appointment} />
      case 2:
        return <StepAppointmentAvailability appointment={appointment} />
      case 3:
        return <StepPersonalInformation appointment={appointment} />
      case 4:
        return <StepPriceDetails />
      default:
        return null
    }
  }

  const renderContent = () => {
    return getStepContent(activeStep)
  }

  const renderFooter = () => {
    const stepCondition = activeStep === steps.length - 1

    return (
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant='tonal'
          color='secondary'
          onClick={handlePrev}
          disabled={activeStep === 0}
          startIcon={<Icon icon={theme.direction === 'ltr' ? 'tabler:arrow-left' : 'tabler:arrow-right'} />}
        >
          Previous
        </Button>
        <Button
          variant='contained'
          color={stepCondition ? 'success' : 'primary'}
          onClick={() => (stepCondition ? alert('Submitted..!!') : handleNext())}
          endIcon={
            <Icon
              icon={
                stepCondition ? 'tabler:check' : theme.direction === 'ltr' ? 'tabler:arrow-right' : 'tabler:arrow-left'
              }
            />
          }
        >
          {stepCondition ? 'Submit' : 'Next'}
        </Button>
      </Box>
    )
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>
      <StepperHeaderContainer>
        <StepperWrapper sx={{ height: '100%' }}>
          <Stepper
            connector={<></>}
            orientation='vertical'
            activeStep={activeStep}
            sx={{ height: '100%', minWidth: '15rem' }}
          >
            {steps.map((step, index) => {
              const RenderAvatar = activeStep >= index ? CustomAvatar : Avatar

              return (
                <Step
                  key={index}
                  onClick={() => setActiveStep(index)}
                  sx={{ '&.Mui-completed + svg': { color: 'primary.main' } }}
                >
                  <StepLabel>
                    <div className='step-label'>
                      <RenderAvatar
                        variant='rounded'
                        {...(activeStep >= index && { skin: 'light' })}
                        {...(activeStep === index && { skin: 'filled' })}
                        {...(activeStep >= index && { color: 'primary' })}
                        sx={{
                          ...(activeStep === index && { boxShadow: theme => theme.shadows[3] }),
                          ...(activeStep > index && { color: theme => hexToRGBA(theme.palette.primary.main, 0.4) })
                        }}
                      >
                        <Icon icon={step.icon} fontSize='1.5rem' />
                      </RenderAvatar>
                      <div>
                        <Typography className='step-title'>{step.title}</Typography>
                        <Typography className='step-subtitle'>{step.subtitle}</Typography>
                      </div>
                    </div>
                  </StepLabel>
                </Step>
              )
            })}
          </Stepper>
        </StepperWrapper>
      </StepperHeaderContainer>
      <CardContent sx={{ width: '100%', pt: theme => `${theme.spacing(6)} !important` }}>
        {renderContent()}
        {renderFooter()}
      </CardContent>
    </Card>
  )
}

export default PropertyListingWizard
