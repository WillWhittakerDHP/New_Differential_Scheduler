
import { sequelize } from '../config/connection.js';
import { LoginFactory } from './participantModels/Logins.js';
import { UserFactory } from './participantModels/Users.js';
import { AppointmentBlockFactory } from './appointmentModels/structureModels/ProjectAppointmentBlocks.js';
import { ServiceFactory } from './appointmentModels/contentModels/ProjectServices.js';
import { AdditionalServiceFactory } from './appointmentModels/contentModels/ProjectAdditionalServices.js';
// import { AvailabilityOptionFactory } from './appointmentModels/contentModels/ProjectAvailabilityOptions.js';
import { DwellingAdjustmentFactory } from './appointmentModels/contentModels/ProjectDwellingAdjustments.js';


const Login = LoginFactory(sequelize);
const User = UserFactory(sequelize);
const AppointmentBlock = AppointmentBlockFactory(sequelize);
const Service = ServiceFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
// const AvailabilityOption = AvailabilityOptionFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);


//PART RELATIONSHIPS

//TO AppointmentBlocks m2m
Service.belongsToMany(AppointmentBlock, {
  through: 'ServiceAppointmentBlock',
});

//FROM AppointmentBlocks m2m
AppointmentBlock.belongsToMany(Service, {
  through: 'ServiceAppointmentBlock',
});



// //TO AppointmentBlocks m2m
// AvailabilityOption.belongsToMany(AppointmentBlock, {
//   through: 'AvailabilityOptionAppointmentBlock',
// });

// //FROM AppointmentBlocks m2m
// AppointmentBlock.belongsToMany(AvailabilityOption, {
//   through: 'AvailabilityOptionAppointmentBlock',
// });



//TO AppointmentBlocks m2m
DwellingAdjustment.belongsToMany(AppointmentBlock, {
  through: 'DwellingAdjustmentAppointmentBlock',
});

//FROM AppointmentBlocks m2m
AppointmentBlock.belongsToMany(DwellingAdjustment, {
  through: 'DwellingAdjustmentAppointmentBlock',
});



//TO AppointmentBlocks m2m
AdditionalService.belongsToMany(AppointmentBlock, {
  through: 'AdditionalServiceAppointmentBlock',
});

//FROM AppointmentBlocks m2m
AppointmentBlock.belongsToMany(AdditionalService, {
  through: 'AdditionalServiceAppointmentBlock',
});

export { AdditionalService, 
  // AvailabilityOption, 
  DwellingAdjustment, Service, AppointmentBlock, User, Login };
