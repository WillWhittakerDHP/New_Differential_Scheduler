import { sequelize } from '../config/connection.js';

// Appointment Content
import { ServiceFactory } from './appointment/structure/serviceTypes.js';
import { ServiceableFactory } from './appointment/structure/serviceables.js';
import { UserTypeFactory } from './appointment/structure/userTypes.js';
import { DwellingAdjustmentFactory } from './appointment/structure/dwellingAdjustments.js';
import { AdditionalServiceFactory } from './appointment/structure/additionalServices.js';
import { AvailabilityOptionFactory } from './appointment/structure/availabilityOptions.js';
// TimeBlocks
import { DataCollectionTimeFactory } from './appointment/structure/timeContent/dataCollectionTime.js';
import { ReportWritingTimeFactory } from './appointment/structure/timeContent/reportWritingTime.js';
import { ClientPresentationTimeFactory } from './appointment/structure/timeContent/clientPresentationTime.js';
import { DataCollectionFeeFactory } from './appointment/structure/feeContent/dataCollectionFee.js';
import { ReportWritingFeeFactory } from './appointment/structure/feeContent/reportWritingFee.js';
import { ClientPresentationFeeFactory } from './appointment/structure/feeContent/clientPresentationFee.js';


// Appointment Content
const Service = ServiceFactory(sequelize);
const Serviceable = ServiceableFactory(sequelize);
const UserType = UserTypeFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// TimeBlocks
const DataCollectionTime = DataCollectionTimeFactory(sequelize);
const ReportWritingTime = ReportWritingTimeFactory(sequelize);
const ClientPresentationTime = ClientPresentationTimeFactory(sequelize);
// FeeBlocks
const DataCollectionFee = DataCollectionFeeFactory(sequelize);
const ReportWritingFee = ReportWritingFeeFactory(sequelize);
const ClientPresentationFee = ClientPresentationFeeFactory(sequelize);


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
DataCollectionTime.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(DataCollectionTime);

DataCollectionTime.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
});
AdditionalService.belongsTo(DataCollectionTime);


DataCollectionTime.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(DataCollectionTime);


DataCollectionTime.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(DataCollectionTime);



ReportWritingTime.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(ReportWritingTime);


ReportWritingTime.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
}); 
AdditionalService.belongsTo(ReportWritingTime);


ReportWritingTime.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(ReportWritingTime);


ReportWritingTime.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(ReportWritingTime);



ClientPresentationTime.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(ClientPresentationTime);


ClientPresentationTime.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
}); 
AdditionalService.belongsTo(ClientPresentationTime);


ClientPresentationTime.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(ClientPresentationTime);


ClientPresentationTime.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(ClientPresentationTime);



// FeeBlocks
DataCollectionFee.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(DataCollectionFee);

DataCollectionFee.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
});
AdditionalService.belongsTo(DataCollectionFee);


DataCollectionFee.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(DataCollectionFee);


DataCollectionFee.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(DataCollectionFee);



ReportWritingFee.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(ReportWritingFee);


ReportWritingFee.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
}); 
AdditionalService.belongsTo(ReportWritingFee);


ReportWritingFee.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(ReportWritingFee);


ReportWritingFee.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(ReportWritingFee);



ClientPresentationFee.hasMany(Service, {
  onDelete: 'CASCADE',
});
Service.belongsTo(ClientPresentationFee);


ClientPresentationFee.hasMany(AdditionalService, {
  onDelete: 'CASCADE',
}); 
AdditionalService.belongsTo(ClientPresentationFee);


ClientPresentationFee.hasMany(AvailabilityOption, {
  onDelete: 'CASCADE',
});
AvailabilityOption.belongsTo(ClientPresentationFee);


ClientPresentationFee.hasMany(DwellingAdjustment, {
  onDelete: 'CASCADE',
});
DwellingAdjustment.belongsTo(ClientPresentationFee);





export { 
  Service,
  Serviceable,
  UserType, 
  DwellingAdjustment, 
  AdditionalService, 
  AvailabilityOption,
  DataCollectionTime,
  ClientPresentationTime,
  ReportWritingTime,  
  DataCollectionFee,
  ClientPresentationFee,
  ReportWritingFee,
};