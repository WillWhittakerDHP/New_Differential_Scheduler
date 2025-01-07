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
import { CollectableFactory } from './appointment/timeContent/collectables.js';
import { ClientPresentationFactory } from './appointment/timeContent/clientPresentation.js';
import { PresentableFactory } from './appointment/timeContent/presentables.js';
import { ReportWritingFactory } from './appointment/timeContent/reportWriting.js';
import { ReportableFactory } from './appointment/timeContent/reportables.js';

// Appointment Content
const Service = ServiceFactory(sequelize);
const Serviceable = ServiceableFactory(sequelize);
const UserType = UserTypeFactory(sequelize);
const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
const AdditionalService = AdditionalServiceFactory(sequelize);
const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// TimeBlocks
const ClientPresentation = ClientPresentationFactory(sequelize);
const Presentable = PresentableFactory(sequelize);
const ReportWriting = ReportWritingFactory(sequelize);
const Reportable = ReportableFactory(sequelize);
const DataCollection = DataCollectionFactory(sequelize);
const Collectable = CollectableFactory(sequelize);



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


DataCollection.belongsToMany(Service, {
  through: {
    model: Collectable,
    unique: false,
  },
  foreignKey: 'data_collection_id', // Use snake_case
  as: 'Services',
  constraints: false,
});
Service.belongsToMany(DataCollection, {
  through: {
    model: Collectable,
    unique: false,
    scope: { collectable_type: 'service' }, // Use snake_case
  },
  foreignKey: 'collectable_id', // Use snake_case
  as: 'DataCollections',
  constraints: false,
});

DataCollection.belongsToMany(AdditionalService, {
  through: {
    model: Collectable,
    unique: false,
  },
  foreignKey: 'data_collection_id',
  as: 'AdditionalServices',
  constraints: false,
});
AdditionalService.belongsToMany(DataCollection, {
  through: {
    model: Collectable,
    unique: false,
    scope: {
      collectable_type: 'additional_service'
    },
  },
  foreignKey: 'collectable_id',
  as: 'DataCollections',
  constraints: false,
});

DataCollection.belongsToMany(AvailabilityOption, {
  through: {
    model: Collectable,
    unique: false,
  },
  foreignKey: 'data_collection_id',
  as: 'AvailabilityOptions',
  constraints: false,
});
AvailabilityOption.belongsToMany(DataCollection, {
  through: {
    model: Collectable,
    unique: false,
    scope: {
      collectable_type: 'availability_option'
    },
  },
  foreignKey: 'collectable_id',
  as: 'DataCollections',
  constraints: false,
});

DataCollection.belongsToMany(DwellingAdjustment, {
  through: {
    model: Collectable,
    unique: false,
  },
  foreignKey: 'data_collection_id',
  as: 'DwellingAdjustments',
  constraints: false,
});
DwellingAdjustment.belongsToMany(DataCollection, {
  through: {
    model: Collectable,
    unique: false,
    scope: {
      collectable_type: 'dwelling_adjustment'
    },
  },
  foreignKey: 'collectable_id',
  as: 'DataCollections',
  constraints: false,
});


ReportWriting.belongsToMany(Service, {
  through: {
    model: Reportable,
    unique: false,
  },
  foreignKey: 'report_writing_id', // Use snake_case
  as: 'Services',
  constraints: false,
});
Service.belongsToMany(ReportWriting, {
  through: {
    model: Reportable,
    unique: false,
    scope: { reportable_type: 'service' }, // Use snake_case
  },
  foreignKey: 'reportable_id', // Use snake_case
  as: 'ReportWritings',
  constraints: false,
});

ReportWriting.belongsToMany(AdditionalService, {
  through: {
    model: Reportable,
    unique: false,
  },
  foreignKey: 'report_writing_id',
  as: 'AdditionalServices',
  constraints: false,
}); 
AdditionalService.belongsToMany(ReportWriting, {
  through: {
    model: Reportable,
    unique: false,
    scope: {
      reportable_type: 'additional_service'
    },
  },
  foreignKey: 'reportable_id',
  as: 'ReportWritings',
  constraints: false,
});

ReportWriting.belongsToMany(AvailabilityOption, {
  through: {
    model: Reportable,
    unique: false,
  },
  foreignKey: 'report_writing_id',
  as: 'AvailabilityOptions',
  constraints: false,
});
AvailabilityOption.belongsToMany(ReportWriting, {
  through: {
    model: Reportable,
    unique: false,
    scope: {
      reportable_type: 'availability_option'
    },
  },
  foreignKey: 'reportable_id',
  as: 'ReportWritings',
  constraints: false,
});

ReportWriting.belongsToMany(DwellingAdjustment, {
  through: {
    model: Reportable,
    unique: false,
  },
  foreignKey: 'report_writing_id',
  as: 'DwellingAdjustments',
  constraints: false,
});
DwellingAdjustment.belongsToMany(ReportWriting, {
  through: {
    model: Reportable,
    unique: false,
    scope: {
      reportable_type: 'dwelling_adjustment'
    },
  },
  foreignKey: 'reportable_id',
  as: 'ReportWritings',
  constraints: false,
});


ClientPresentation.belongsToMany(Service, {
  through: {
    model: Presentable,
    unique: false,
  },
  foreignKey: 'client_presentation_id', // Use snake_case
  as: 'Services',
  constraints: false,
});
Service.belongsToMany(ClientPresentation, {
  through: {
    model: Presentable,
    unique: false,
    scope: { presentable_type: 'service' }, // Use snake_case
  },
  foreignKey: 'presentable_id', // Use snake_case
  as: 'ClientPresentations',
  constraints: false,
});

ClientPresentation.belongsToMany(AdditionalService, {
  through: {
    model: Presentable,
    unique: false,
  },
  foreignKey: 'client_presentation_id',
  as: 'AdditionalServices',
  constraints: false,
}); 
AdditionalService.belongsToMany(ClientPresentation, {
  through: {
    model: Presentable,
    unique: false,
    scope: {
      presentable_type: 'additional_service'
    },
  },
  foreignKey: 'presentable_id',
  as: 'ClientPresentations',
  constraints: false,
});

ClientPresentation.belongsToMany(AvailabilityOption, {
  through: {
    model: Presentable,
    unique: false,
  },
  foreignKey: 'client_presentation_id',
  as: 'AvailabilityOptions',
  constraints: false,
});
AvailabilityOption.belongsToMany(ClientPresentation, {
  through: {
    model: Presentable,
    unique: false,
    scope: {
      presentable_type: 'availability_option'
    },
  },
  foreignKey: 'presentable_id',
  as: 'ClientPresentations',
  constraints: false,
});

ClientPresentation.belongsToMany(DwellingAdjustment, {
  through: {
    model: Presentable,
    unique: false,
  },
  foreignKey: 'client_presentation_id',
  as: 'DwellingAdjustments',
  constraints: false,
});
DwellingAdjustment.belongsToMany(ClientPresentation, {
  through: {
    model: Presentable,
    unique: false,
    scope: {
      presentable_type: 'dwelling_adjustment'
    },
  },
  foreignKey: 'presentable_id',
  as: 'ClientPresentations',
  constraints: false,
});


export { 
  Service,
  Serviceable,
  UserType, 
  DwellingAdjustment, 
  AdditionalService, 
  AvailabilityOption,
  DataCollection,
  Collectable,
  ClientPresentation,
  Presentable,
  ReportWriting,
  Reportable
};