import { sequelize } from '../config/connection.js';

// Participants
import { UserTypeFactory } from './participantModels/userTypes.js';
import { UserFactory } from './participantModels/Users.js';
import { LoginFactory } from './participantModels/Logins.js';
// Appointment Structure
import { AppointmentPartTypeFactory } from './appointmentModels/structureModels/appointmentPartTypes.js';
import { AppointmentPartFactory } from './appointmentModels/structureModels/appointmentParts.js';
import { DwellingTypeFactory } from './appointmentModels/structureModels/dwellingTypes.js';
import { TimeBlockSetFactory } from './appointmentModels/structureModels/timeBlockSets.js';
import { UIDescriptionFactory } from './appointmentModels/structureModels/uIDescriptions.js';
// Appointment Content
import { ServiceFactory } from './appointmentModels/contentModels/service.js';
import { AdditionalServiceFactory } from './appointmentModels/contentModels/additionalServices.js';
import { AvailabilityOptionFactory } from './appointmentModels/contentModels/availabilityOptions.js';
import { DwellingAdjustmentFactory } from './appointmentModels/contentModels/dwellingAdjustments.js';

// Participants
const UserType = UserTypeFactory(sequelize);
const Login = LoginFactory(sequelize);
const User = UserFactory(sequelize);
// Appointment Structure
const AppointmentPartType = AppointmentPartTypeFactory(sequelize);
const AppointmentPart = AppointmentPartFactory(sequelize);
const DwellingType = DwellingTypeFactory(sequelize);
const TimeBlockSet = TimeBlockSetFactory(sequelize);
const UIDescription = UIDescriptionFactory(sequelize);
// Appointment Content
const Service = ServiceFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
const AvailabilityOption = AvailabilityOptionFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);


//USERTYPE RELATIONSHIPS
//FROM Services m2m
UserType.belongsToMany(Service, { through: 'UserTypeService' });

//TO Services m2m
Service.belongsToMany(UserType, { through: 'UserTypeService' });



//PART RELATIONSHIPS
//TO PartTypes 
AppointmentPart.hasOne(AppointmentPartType, {
  onDelete: 'CASCADE',
});

//FROM PartType 
AppointmentPartType.belongsToMany(AppointmentPart, {
  through: 'AppointmentPartAppointmentPartTypes',
});

//TO TimeBlock
AppointmentPart.hasOne(TimeBlockSet, {
  onDelete: 'CASCADE',
});

//FROM TimeBlock
TimeBlockSet.belongsToMany(AppointmentPart, {
  through: 'AppointmentPartTimeBlockSet'
});

//DWELLING RELATIONSHIPS
//TO Adjustments
DwellingAdjustment.hasOne(DwellingType, {
  onDelete: 'CASCADE',
});

// //FROM Types 121
// DwellingType.belongsTo(DwellingAdjustment);
// // //UIDescription RELATIONSHIPS
// // //TO PartTypes 
// // AppointmentPart.hasOne(AppointmentPartType, {
// //   onDelete: 'CASCADE',
// // });

// // //FROM PartType 
// // AppointmentPartType.belongsToMany(AppointmentPart, {
// //   through: 'AppointmentPartAppointmentPartTypes',
// // });

// // //TO TimeBlock
// // AppointmentPart.hasOne(TimeBlockSet, {
// //   onDelete: 'CASCADE',
// // });

// // //FROM TimeBlock
// // TimeBlockSet.belongsToMany(AppointmentPart, {
// //   through: 'AppointmentPartTimeBlockSet'
// // });

// // !TIME BLOCK RELATIONSHIPS TO USER OPTIONS SHOULD GO THROUGH PARTS
// // //TimeBlocksSets TO Services
// // TimeBlockSet.belongsToMany(Service, {
// //   through: 'ServiceTimeBlockSets',
// // });

// // //Serv to TimeBlockSets
// // Service.belongsToMany(TimeBlockSet, {
// //   through: 'ServiceTimeBlockSets',
// // });

// // //TimeBlocksSets TO AddServices
// // TimeBlockSet.belongsToMany(AdditionalService, {
// //   through: 'AdditionalServiceTimeBlockSets',
// // });

// // //AddServ TO TimeBlockSets
// // AdditionalService.belongsToMany(TimeBlockSet, {
//   //   through: 'AdditionalServiceTimeBlockSets',
//   // });

// // //FROM TimeBlocksSets m2m
// // TimeBlockSet.belongsToMany(AvailabilityOption, {
// //   through: 'AvailabilityOptionTimeBlockSets',
// // });

// // //TO TimeBlockSets m2m
// // AvailabilityOption.belongsToMany(TimeBlockSet, {
// //   through: 'AvailabilityOptionTimeBlockSets',
// // });
  
  
// //SERVICE RELATIONSHIPS: UserType, UIDescription, AppointmentPart

//TO Desc 121
Service.hasOne(UIDescription, {
  onDelete: 'CASCADE',
});

//FROMDesc 121
UIDescription.belongsTo(Service);

//TO AppointmentParts m2m
Service.belongsToMany(AppointmentPart, {
  through: 'ServiceAppointmentPart',
});

//FROM AppointmentParts m2m
AppointmentPart.belongsToMany(Service, {
  through: 'ServiceAppointmentPart',
});


//AVAILABILITY OPTIONS RELATIONSHIPS: UIDescription, AppointmentPart
//TO Desc 121
AvailabilityOption.hasOne(UIDescription, {
  onDelete: 'CASCADE',
});

//FROMDesc 121
UIDescription.belongsTo(AvailabilityOption);

//TO AppointmentParts m2m
AvailabilityOption.belongsToMany(AppointmentPart, {
  through: 'AvailabilityOptionAppointmentPart',
});

//FROM AppointmentParts m2m
AppointmentPart.belongsToMany(AvailabilityOption, {
  through: 'AvailabilityOptionAppointmentPart',
});

//DWELLING ADJUSTMENTS RELATIONSHIPS: AppointmentPart
// //FROM TimeBlocksSets m2m
// TimeBlockSet.belongsToMany(DwellingAdjustment, {
//   through: 'DwellingAdjustmentTimeBlockSets',
// });

// //TO TimeBlockSets m2m
// DwellingAdjustment.belongsToMany(TimeBlockSet, {
//   through: 'DwellingAdjustmentTimeBlockSets',
// });

//TO AppointmentParts m2m
DwellingAdjustment.belongsToMany(AppointmentPart, {
  through: 'DwellingAdjustmentAppointmentPart',
});

//FROM AppointmentParts m2m
AppointmentPart.belongsToMany(DwellingAdjustment, {
  through: 'DwellingAdjustmentAppointmentPart',
});


//ADDITIONAL SERVICE RELATIONSHIPS: UIDescription, AppointmentPart
//TO Desc 121
AdditionalService.hasOne(UIDescription, {
  onDelete: 'CASCADE',
});

//FROM Desc 121
UIDescription.belongsTo(AdditionalService);

//TO AppointmentParts m2m
AdditionalService.belongsToMany(AppointmentPart, {
  through: 'AdditionalServiceAppointmentPart',
});

//FROM AppointmentParts m2m
AppointmentPart.belongsToMany(AdditionalService, {
  through: 'AdditionalServiceAppointmentPart',
});

export { 
  AdditionalService, 
  AppointmentPartType, 
  AppointmentPart, 
  AvailabilityOption, 
  DwellingType, 
  DwellingAdjustment, 
  Service, 
  TimeBlockSet, 
  UIDescription, 
  UserType
  , 
  User, 
  Login 
};