import { sequelize } from '../config/connection.js';

// Appointment Content
import { ServiceFactory } from './serviceBasedModels/services.js';
import { ServiceableFactory } from './serviceBasedModels/serviceables.js';
import { UserTypeFactory } from './serviceBasedModels/userTypes.js';
import { DwellingAdjustmentFactory } from './serviceBasedModels/dwellingAdjustments.js';
import { AdditionalServiceFactory } from './serviceBasedModels/additionalServices.js';
import { AvailabilityOptionFactory } from './serviceBasedModels/availabilityOptions.js';
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
// Participants
// const Login = LoginFactory(sequelize);
// const User = UserFactory(sequelize);

// sequelize.addModels([UserType]);

// From the sequelize refence "applying scopes on the target model"
//  UserType.belongsToMany(Service, {
//   through: {
//     model: Serviceable,
//     unique: false,
//     scope: {
//       serviceable_type: 'UserType',
//     },
//   },
//   scope: {
//     status: 'pending',
//   },
//   as: 'pendingServices',
//   foreignKey: 'Serviceable_id',
//   constraints: false,
// });

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
Service.belongsToMany(UserType, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id', // Use snake_case
  as: 'Services',
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
  as: 'DwellingAdjustments',
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
Service.belongsToMany(AdditionalService, {
  through: {
    model: Serviceable,
    unique: false,
  },
  foreignKey: 'service_id',
  as: 'AdditionalServices',
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
  as: 'AvailabilityOptions',
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

export { 
  Service,
  Serviceable,
  UserType, 
  DwellingAdjustment, 
  AdditionalService, 
  AvailabilityOption, 
  // , 
  // User, 
  // Login 
};