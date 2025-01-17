// ** MUI Imports
import Grid from '@mui/material/Grid'
// import Radio from '@mui/material/Radio'
// import Checkbox from '@mui/material/Checkbox'
// import MenuItem from '@mui/material/MenuItem'
// import FormLabel from '@mui/material/FormLabel'
// import RadioGroup from '@mui/material/RadioGroup'
// import FormControl from '@mui/material/FormControl'
// import InputAdornment from '@mui/material/InputAdornment'
// import FormControlLabel from '@mui/material/FormControlLabel'

// // ** Custom Component Import
// import CustomTextField from '../@core/components/mui/text-field'

// ** Icon Imports
// import Icon from '../@core/components/icon'
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import CustomChip from "../@core/components/mui/chip";

const StepPriceDetails = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Typography variant='h4' sx={{mb: 4}}>
                    Almost done! 🚀
                </Typography>
                <Typography sx={{ mb: 10, color: 'text.secondary'}}>
                    Confirm your deal details information and submit to create it.
                </Typography>
                <TableContainer>
                    <Table>
                        <TableBody
                            sx={{
                                '& .MuiTableCell-root': {
                                    borderBottom: 0,
                                    verticalAlign: 'top',
                                    '&:last-of-type': {px: '0 !important'},
                                    '&:first-of-type': {pl: '0 !important'},
                                    py: theme => `${theme.spacing(0.75)} !important`
                                }
                            }}
                        >
                            <TableRow>
                                <TableCell>
                                    <Typography noWrap sx={{fontWeight: 500, color: 'text.secondary'}}>
                                        Service Type
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'text.secondary'}}>Walk & Talk</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography noWrap sx={{fontWeight: 500, color: 'text.secondary'}}>
                                        Additional Service
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'text.secondary'}}>Radon Testing, Blue Tape</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography noWrap sx={{fontWeight: 500, color: 'text.secondary'}}>
                                        Dwelling Type
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'text.secondary'}}>Condo</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography noWrap sx={{fontWeight: 500, color: 'text.secondary'}}>
                                        Address
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'text.secondary'}}>1209 13th St. NW #602, Washington DC,
                                        20005</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography noWrap sx={{fontWeight: 500, color: 'text.secondary'}}>
                                        Square Footage
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography sx={{color: 'text.secondary'}}>1000sqft</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={6}>
                <Box sx={{mb: 4, borderRadius: 1, border: theme => `1px solid ${theme.palette.divider}`}}>
                    <CardContent>
                        <Box sx={{
                            p: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'action.selected',
                        }}>
                            <Typography variant='h6'>
                                Your total fee is:
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    borderRadius: 1,
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end',

                                }}
                            >
                                <Typography variant='h6' sx={{verticalAlign: 'bottom'}}>$&nbsp;</Typography>
                                <Typography variant='h6'
                                            sx={{lineHeight: 1, fontWeight: 600, fontSize: '3.75rem !important'}}>
                                    899
                                </Typography>
                                <Typography variant='h6'>&nbsp;USD</Typography>
                            </Box>
                        </Box>
                    </CardContent>
                    <Divider sx={{my: '0 !important'}}/>
                    <CardContent>
                        <Typography sx={{mb: 4}} variant='h6'>
                            Price Details
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <Box
                                sx={{
                                    mb: 2,
                                    gap: 2,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>Bag Total</Typography>
                                <Typography sx={{color: 'text.secondary'}}>$1198.00</Typography>
                            </Box>
                            <Box
                                sx={{
                                    mb: 2,
                                    gap: 2,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>Coupon Discount</Typography>
                                <Typography
                                    href='/'
                                    variant='h6'
                                    component={Link}
                                    onClick={e => e.preventDefault()}
                                    sx={{color: 'primary.main', textDecoration: 'none'}}
                                >
                                    Apply Coupon
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    mb: 2,
                                    gap: 2,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>Order Total</Typography>
                                <Typography sx={{color: 'text.secondary'}}>$1198.00</Typography>
                            </Box>
                            <Box
                                sx={{
                                    gap: 2,
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <Typography>Delivery Charges</Typography>
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                                    <Typography sx={{
                                        mr: 2,
                                        textDecoration: 'line-through',
                                        color: 'text.disabled'
                                    }}>$5.00</Typography>
                                    <CustomChip rounded size='small' skin='light' color='success' label='Free'/>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    <Divider sx={{my: '0 !important'}}/>
                    <CardContent sx={{py: theme => `${theme.spacing(3.5)} !important`}}>
                        <Box
                            sx={{
                                gap: 2,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Typography sx={{fontWeight: 500}}>Total</Typography>
                            <Typography sx={{fontWeight: 500}}>$1198.00</Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Grid>
        </Grid>
    )
}

export default StepPriceDetails
