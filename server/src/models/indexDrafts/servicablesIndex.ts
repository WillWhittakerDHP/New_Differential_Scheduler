// import { sequelize } from '../../config/connection.js';

// // Appointment Content
// import { ServiceFactory } from '../appointment/structure/serviceTypes.js';
// import { ServiceableFactory } from '../appointment/structure/serviceables.js';
// import { UserTypeFactory } from '../appointment/structure/userTypes.js';
// import { DwellingAdjustmentFactory } from '../appointment/structure/dwellingAdjustments.js';
// import { AdditionalServiceFactory } from '../appointment/structure/additionalServices.js';
// import { AvailabilityOptionFactory } from '../appointment/structure/availabilityOptions.js';
// // TimeBlocks

// // Appointment Content
// const Service = ServiceFactory(sequelize);
// const Serviceable = ServiceableFactory(sequelize);
// const UserType = UserTypeFactory(sequelize);
// const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
// const AdditionalService = AdditionalServiceFactory(sequelize);
// const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// // TimeBlocks


// Service.belongsToMany(UserType, {
//   through: {
//     model: Serviceable,
//     unique: false,
//   },
//   foreignKey: 'service_id', // Use snake_case
//   as: 'Services',
//   constraints: false,
// });
// UserType.belongsToMany(Service, {
//   through: {
//     model: Serviceable,
//     unique: false,
//     scope: { serviceable_type: 'user_type' }, // Use snake_case
//   },
//   foreignKey: 'serviceable_id', // Use snake_case
//   as: 'Services',
//   constraints: false,
// });


// AdditionalService.belongsToMany(Service, {
//   through: {
//     model: Serviceable,
//     unique: false,
//     scope: {
//       serviceable_type: 'additional_service'
//     },
//   },
//   foreignKey: 'serviceable_id',
//   as: 'AdditionalServices',
//   constraints: false,
// });
// Service.belongsToMany(AdditionalService, {
//   through: {
//     model: Serviceable,
//     unique: false,
//   },
//   foreignKey: 'service_id',
//   as: 'AdditionalServices',
//   constraints: false,
// });


// AvailabilityOption.belongsToMany(Service, {
//   through: {
//     model: Serviceable,
//     unique: false,
//     scope: {
//       serviceable_type: 'availability_option'
//     },
//   },
//   foreignKey: 'serviceable_id',
//   as: 'AvailabilityOptions',
//   constraints: false,
// });
// Service.belongsToMany(AvailabilityOption, {
//   through: {
//     model: Serviceable,
//     unique: false,
//   },
//   foreignKey: 'service_id',
//   as: 'AvailabilityOptions',
//   constraints: false,
// });


// DwellingAdjustment.belongsToMany(Service, {
//   through: {
//     model: Serviceable,
//     unique: false,
//     scope: {
//       serviceable_type: 'dwelling_adjustment'
//     },
//   },
//   foreignKey: 'serviceable_id',
//   as: 'DwellingAdjustments',
//   constraints: false,
// });
// Service.belongsToMany(DwellingAdjustment, {
//   through: {
//     model: Serviceable,
//     unique: false,
//   },
//   foreignKey: 'service_id',
//   as: 'DwellingAdjustments',
//   constraints: false,
// });

// export { 
//   Service,
//   Serviceable,
//   UserType, 
//   DwellingAdjustment, 
//   AdditionalService, 
//   AvailabilityOption
//   // , 
//   // Descriptions
//   // User, 
//   // Login 
// };