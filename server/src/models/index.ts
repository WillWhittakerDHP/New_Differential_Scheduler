import { sequelize } from '../config/connection.js';

// Appointment Content
import { ServiceFactory } from './serviceBasedModels/services.js';
import { ServiceableFactory } from './serviceBasedModels/serviceables.js';
import { UserTypeFactory } from './serviceBasedModels/userTypes.js';
import { DwellingAdjustmentFactory } from './serviceBasedModels/dwellingAdjustments.js';
import { AdditionalServiceFactory } from './serviceBasedModels/additionalServices.js';
import { AvailabilityOptionFactory } from './serviceBasedModels/availabilityOptions.js';
// Participants
import { UserFactory } from './participantModels/Users.js';
import { LoginFactory } from './participantModels/Logins.js';
// Appointment Parts
import { AppointmentPartTypeFactory } from './appointmentModels/structureModels/appointmentPartTypes.js';
import { AppointmentPartFactory } from './appointmentModels/structureModels/appointmentParts.js';
import { DwellingTypeFactory } from './appointmentModels/structureModels/dwellingTypes.js';
import { TimeBlockSetFactory } from './appointmentModels/structureModels/timeBlockSets.js';
import { UIDescriptionFactory } from './appointmentModels/structureModels/uIDescriptions.js';

// Appointment Content
const Service = ServiceFactory(sequelize);
const Serviceable = ServiceableFactory(sequelize);
const UserType = UserTypeFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// Participants
const Login = LoginFactory(sequelize);
const User = UserFactory(sequelize);
// Appointment Parts
const AppointmentPartType = AppointmentPartTypeFactory(sequelize);
const AppointmentPart = AppointmentPartFactory(sequelize);
const DwellingType = DwellingTypeFactory(sequelize);
const TimeBlockSet = TimeBlockSetFactory(sequelize);
const UIDescription = UIDescriptionFactory(sequelize);


// //USERTYPE Parent-Child RELATIONSHIPS
// //FROM Services m2m
// UserType.belongsToMany(Service, { through: 'UserTypeService' });

// //TO Services m2m
// Service.belongsToMany(UserType, { through: 'UserTypeService' });


// //Service Parent-Child RELATIONSHIPS
// //TO AdditionalServices m2m
// Service.belongsToMany(AdditionalService, { through: 'ServiceAdditionalService' });

// //FROM AdditionalServices m2m
// AdditionalService.belongsToMany(Service, { through: 'ServiceAdditionalService' });

// //TO AvailabilityOptions m2m
// Service.belongsToMany(AvailabilityOption, { through: 'ServiceAvailabilityOption' });

// //FROM AvailabilityOptions m2m
// AvailabilityOption.belongsToMany(Service, { through: 'ServiceAvailabilityOption' });

// //TO AdditionalServices m2m
// Service.belongsToMany(DwellingAdjustment, { through: 'ServiceDwellingAdjustment' });

// //FROM DwellingAdjustments m2m
// DwellingAdjustment.belongsToMany(Service, { through: 'ServiceDwellingAdjustment' });

// From the sequelize refence "applying scopes on the target model"
//  UserType.belongsToMany(Service, {
//   through: {
//     model: Serviceable,
//     unique: false,
//     scope: {
//       ServiceableType: 'UserType',
//     },
//   },
//   scope: {
//     status: 'pending',
//   },
//   as: 'pendingServices',
//   foreignKey: 'ServiceableId',
//   constraints: false,
// });

UserType.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      ServiceableType: 'userType',
    },
  },
  foreignKey: 'ServiceableId',
  constraints: false,
});
Service.belongsToMany(UserType, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'ServiceId',
  constraints: false,
});

AdditionalService.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      ServiceableType: 'additionalService',
    },
  },
  foreignKey: 'ServiceableId',
  constraints: false,
});
Service.belongsToMany(AdditionalService, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'ServiceId',
  constraints: false,
});

AvailabilityOption.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      ServiceableType: 'availabilityOption',
    },
  },
  foreignKey: 'ServiceableId',
  constraints: false,
});
Service.belongsToMany(AvailabilityOption, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'ServiceId',
  constraints: false,
});

DwellingAdjustment.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      ServiceableType: 'dwellingAdjustment',
    },
  },
  foreignKey: 'ServiceableId',
  constraints: false,
});
Service.belongsToMany(DwellingAdjustment, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'ServiceId',
  constraints: false,
});








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
  Service,
  Serviceable,
  UserType, 
  DwellingAdjustment, 
  AdditionalService, 
  AvailabilityOption, 
  AppointmentPartType, 
  AppointmentPart, 
  DwellingType, 
  TimeBlockSet, 
  UIDescription, 
  User, 
  Login 
};