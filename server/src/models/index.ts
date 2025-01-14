import { sequelize } from '../config/connection.js';

// Appointment Content
import { ServiceableFactory } from './appointment/structure/serviceables.js';
import { ServiceFactory } from './appointment/structure/serviceTypes.js';
import { UserTypeFactory } from './appointment/structure/userTypes.js';
import { DwellingAdjustmentFactory } from './appointment/structure/dwellingAdjustments.js';
import { AdditionalServiceFactory } from './appointment/structure/additionalServices.js';
import { AvailabilityOptionFactory } from './appointment/structure/availabilityOptions.js';
// TimeBlocks
import { FeeTimeableFactory } from './appointment/structure/feeTime/feeTimeables.js';
import { FeeTimeFactory } from './appointment/structure/feeTime/feeTimes.js';
import { DataCollectionFactory } from './appointment/structure/feeTime/dataCollection.js';
import { ReportWritingFactory } from './appointment/structure/feeTime/reportWriting.js';
import { ClientPresentationFactory } from './appointment/structure/feeTime/clientPresentation.js';


// Appointment Content
const Serviceable = ServiceableFactory(sequelize);
const Service = ServiceFactory(sequelize);
const UserType = UserTypeFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// TimeBlocks
const FeeTimeable = FeeTimeableFactory(sequelize);
const FeeTime = FeeTimeFactory(sequelize);
const DataCollection = DataCollectionFactory(sequelize);
const ReportWriting = ReportWritingFactory(sequelize);
const ClientPresentation = ClientPresentationFactory(sequelize);



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
  otherKey: 'serviceable_id',
  as: 'AdditionalServices',
  // constraints: false,
});
AdditionalService.belongsToMany(Service, {
  through: {
      model: Serviceable,
      unique: false,
      scope: {
          serviceable_type: 'additional_service',
      },
  },
  foreignKey: 'serviceable_id',
  otherKey: 'service_id',
  as: 'Services',
  // constraints: false,
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


// FeeTimeBlocks
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



// FeeTimeBlocks
FeeTime.belongsToMany(DataCollection, {
  through: {
    model: FeeTimeable,
    unique: false,
  },
  foreignKey: 'feeTime_id', // Use snake_case
  as: 'DataCollections',
  constraints: false,
});
DataCollection.belongsToMany(FeeTime, {
  through: {
    model: FeeTimeable,
    unique: false,
    scope: { feeTimeable_type: 'data_collection' }, // Use snake_case
  },
  foreignKey: 'feeTimeable_id', // Use snake_case
  as: 'FeeTimes',
  constraints: false,
});


FeeTime.belongsToMany(ReportWriting, {
  through: {
    model: FeeTimeable,
    unique: false,
  },
  foreignKey: 'feeTime_id',
  as: 'ReportWritings',
  constraints: false,
});
ReportWriting.belongsToMany(FeeTime, {
  through: {
    model: FeeTimeable,
    unique: false,
    scope: {
      feeTimeable_type: 'report_writing'
    },
  },
  foreignKey: 'feeTimeable_id',
  as: 'FeeTimes',
  constraints: false,
});


FeeTime.belongsToMany(ClientPresentation, {
  through: {
    model: FeeTimeable,
    unique: false,
  },
  foreignKey: 'feeTime_id',
  as: 'ClientPresentations',
  constraints: false,
});
ClientPresentation.belongsToMany(FeeTime, {
  through: {
    model: FeeTimeable,
    unique: false,
    scope: {
      feeTimeable_type: 'client_presentation'
    },
  },
  foreignKey: 'feeTimeable_id',
  as: 'FeeTimes',
  constraints: false,
});


// AppointmentPart-FeeTimeable Assocations
FeeTime.belongsToMany(Service, {
  through: {
    model: FeeTimeable,
    unique: false,
  },
  foreignKey: 'feeTime_id',
  as: 'Services',
  constraints: false,
});
Service.belongsToMany(FeeTime, {
  through: {
    model: FeeTimeable,
    unique: false,
    scope: {
      feeTimeable_type: 'client_presentation'
    },
  },
  foreignKey: 'feeTimeable_id',
  as: 'FeeTimes',
  constraints: false,
});




export { 
  Service,
  UserType, 
  DwellingAdjustment, 
  AdditionalService, 
  AvailabilityOption,
  Serviceable,
  FeeTime,
  DataCollection,
  ClientPresentation,
  ReportWriting,  
  FeeTimeable
};