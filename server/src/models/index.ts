import { sequelize } from '../config/connection.js';

// Appointment Content
import { ServiceFactory } from './appointment/structure/serviceTypes.js';
import { ServiceableFactory } from './appointment/structure/serviceables.js';
import { UserTypeFactory } from './appointment/structure/userTypes.js';
import { DwellingAdjustmentFactory } from './appointment/structure/dwellingAdjustments.js';
import { AdditionalServiceFactory } from './appointment/structure/additionalServices.js';
import { AvailabilityOptionFactory } from './appointment/structure/availabilityOptions.js';
// TimeBlocks
import { EarlyArrivalFactory } from './appointment/timeContent/earlyArrival.js';
import { DataCollectionFactory } from './appointment/timeContent/dataCollection.js';
import { ReportWritingFactory } from './appointment/timeContent/reportWriting.js';
import { ClientPresentationFactory } from './appointment/timeContent/clientPresentation.js';
// import { DescriptionsFactory } from './appointment/details/descriptions.js';
// Participants
// import { UserFactory } from './participantModels/Users.js';
// import { LoginFactory } from './participantModels/Logins.js';

// Appointment Content
const Service = ServiceFactory(sequelize);
const Serviceable = ServiceableFactory(sequelize);
const UserType = UserTypeFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// TimeBlocks
const EarlyArrival = EarlyArrivalFactory(sequelize);
const DataCollection = DataCollectionFactory(sequelize);
const ReportWriting = ReportWritingFactory(sequelize);
const ClientPresentation = ClientPresentationFactory(sequelize);
// import { Descriptions } from './appointment/details/descriptions.js';
// Participants
// const Login = LoginFactory(sequelize);
// const User = UserFactory(sequelize);


// Descriptions.hasOne(Service, {
//   onDelete: 'CASCADE',
// });
// Service.belongsTo(Descriptions);

// Descriptions.hasOne(AdditionalService, {
//   onDelete: 'CASCADE',
// });
// AdditionalService.belongsTo(Descriptions);

// Descriptions.hasOne(AvailabilityOption, {
//   onDelete: 'CASCADE',
// });
// AvailabilityOption.belongsTo(Descriptions);


Service.belongsToMany(UserType, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id', // Use snake_case
  as: 'Services',
  constraints: false,
});
Service.belongsToMany(AdditionalService, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id',
  as: 'AdditionalServices',
  constraints: false,
});
Service.belongsToMany(AvailabilityOption, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id',
  as: 'AvailabilityOptions',
  constraints: false,
});
Service.belongsToMany(DwellingAdjustment, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id',
  as: 'DwellingAdjustments',
  constraints: false,
});
Service.hasOne(EarlyArrival, {
  onDelete: 'CASCADE',
});
Service.hasOne(DataCollection, {
  onDelete: 'CASCADE',
});
Service.hasOne(ReportWriting, {
  onDelete: 'CASCADE',
});
Service.hasOne(ClientPresentation, {
  onDelete: 'CASCADE',
});


UserType.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: { serviceable_type: 'user_type' }, // Use snake_case
  },
  foreignKey: 'serviceable_id', // Use snake_case
  as: 'Services',
  constraints: false,
});


AdditionalService.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      serviceable_type: 'additional_service'
    },
  },
  foreignKey: 'serviceable_id',
  as: 'AdditionalServices',
  constraints: false,
});
AdditionalService.hasOne(EarlyArrival, {
  onDelete: 'CASCADE',
});
AdditionalService.hasOne(DataCollection, {
  onDelete: 'CASCADE',
});
AdditionalService.hasOne(ReportWriting, {
  onDelete: 'CASCADE',
});
AdditionalService.hasOne(ClientPresentation, {
  onDelete: 'CASCADE',
});


AvailabilityOption.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      serviceable_type: 'availability_option'
    },
  },
  foreignKey: 'serviceable_id',
  as: 'AvailabilityOptions',
  constraints: false,
});
AvailabilityOption.hasOne(EarlyArrival, {
  onDelete: 'CASCADE',
});
AvailabilityOption.hasOne(DataCollection, {
  onDelete: 'CASCADE',
});
AvailabilityOption.hasOne(ReportWriting, {
  onDelete: 'CASCADE',
});
AvailabilityOption.hasOne(ClientPresentation, {
  onDelete: 'CASCADE',
});


DwellingAdjustment.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      serviceable_type: 'dwelling_adjustment'
    },
  },
  foreignKey: 'serviceable_id',
  as: 'DwellingAdjustments',
  constraints: false,
});
DwellingAdjustment.hasOne(EarlyArrival, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.hasOne(DataCollection, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.hasOne(ReportWriting, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.hasOne(ClientPresentation, {
  onDelete: 'CASCADE',
});


EarlyArrival.belongsTo(DwellingAdjustment);
EarlyArrival.belongsTo(AvailabilityOption);
EarlyArrival.belongsTo(AdditionalService);
EarlyArrival.belongsTo(Service);
DataCollection.belongsTo(Service);
DataCollection.belongsTo(AdditionalService);
DataCollection.belongsTo(AvailabilityOption);
DataCollection.belongsTo(DwellingAdjustment);
ReportWriting.belongsTo(Service);
ReportWriting.belongsTo(AdditionalService);
ReportWriting.belongsTo(AvailabilityOption);
ReportWriting.belongsTo(DwellingAdjustment);
ClientPresentation.belongsTo(Service);
ClientPresentation.belongsTo(AdditionalService);
ClientPresentation.belongsTo(AvailabilityOption);
ClientPresentation.belongsTo(DwellingAdjustment);


export { 
  Service,
  Serviceable,
  UserType, 
  DwellingAdjustment, 
  AdditionalService, 
  AvailabilityOption,
  EarlyArrival,
  DataCollection,
  ReportWriting,
  ClientPresentation
  // , 
  // Descriptions
  // User, 
  // Login 
};