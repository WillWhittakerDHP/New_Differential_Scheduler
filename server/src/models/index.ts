import { sequelize } from '../config/connection.js';

// Appointment Content
import { ServiceFactory } from './appointment/structure/serviceTypes.js';
import { ServiceableFactory } from './appointment/structure/serviceables.js';
import { UserTypeFactory } from './appointment/structure/userTypes.js';
import { DwellingAdjustmentFactory } from './appointment/structure/dwellingAdjustments.js';
import { AdditionalServiceFactory } from './appointment/structure/additionalServices.js';
import { AvailabilityOptionFactory } from './appointment/structure/availabilityOptions.js';
// TimeBlocks
import { DataCollectionFactory } from './appointment/timeContent/dataCollection.js';
import { ClientPresentationFactory } from './appointment/timeContent/clientPresentation.js';
import { ReportWritingFactory } from './appointment/timeContent/reportWriting.js';


// Appointment Content
const Service = ServiceFactory(sequelize);
const Serviceable = ServiceableFactory(sequelize);
const UserType = UserTypeFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// TimeBlocks
const ClientPresentation = ClientPresentationFactory(sequelize);
const ReportWriting = ReportWritingFactory(sequelize);
const DataCollection = DataCollectionFactory(sequelize);



Service.belongsToMany(UserType, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id', // Use snake_case
  as: 'UserTypes',
  constraints: false,
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


Service.belongsToMany(AdditionalService, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id',
  as: 'AdditionalServices',
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
  as: 'Services',
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
AvailabilityOption.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      serviceable_type: 'availability_option'
    },
  },
  foreignKey: 'serviceable_id',
  as: 'Services',
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
DwellingAdjustment.belongsToMany(Service, {
  through: {
    model: Serviceable,
    unique: false,
    scope: {
      serviceable_type: 'dwelling_adjustment'
    },
  },
  foreignKey: 'serviceable_id',
  as: 'Services',
  constraints: false,
});


// TimeBlocks


DataCollection.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(DataCollection);

DataCollection.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
});
AdditionalService.belongsTo(DataCollection);


DataCollection.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(DataCollection);


DataCollection.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(DataCollection);



ReportWriting.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(ReportWriting);


ReportWriting.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
}); 
AdditionalService.belongsTo(ReportWriting);


ReportWriting.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(ReportWriting);


ReportWriting.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(ReportWriting);



ClientPresentation.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(ClientPresentation);


ClientPresentation.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
}); 
AdditionalService.belongsTo(ClientPresentation);


ClientPresentation.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(ClientPresentation);


ClientPresentation.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(ClientPresentation);



export { 
  Service,
  Serviceable,
  UserType, 
  DwellingAdjustment, 
  AdditionalService, 
  AvailabilityOption,
  DataCollection,
  ClientPresentation,
  ReportWriting,
};