// import { sequelize } from '../../config/connection.js';

// // Appointment Content
// import { ClientPresentationFactory } from '../appointment/timeContent/clientPresentation.js';
// import { PresentableFactory } from '../appointment/timeContent/presentables.js';
// import { ServiceFactory } from '../appointment/structure/serviceTypes.js';
// import { AdditionalServiceFactory } from '../appointment/structure/additionalServices.js';
// import { DwellingAdjustmentFactory } from '../appointment/structure/dwellingAdjustments.js';
// import { AvailabilityOptionFactory } from '../appointment/structure/availabilityOptions.js';
// // TimeBlocks

// // Appointment Content
// const ClientPresentation = ClientPresentationFactory(sequelize);
// const Presentable = PresentableFactory(sequelize);
// const Service = ServiceFactory(sequelize);
// const AdditionalService = AdditionalServiceFactory(sequelize);
// const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
// const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// // TimeBlocks


// ClientPresentation.belongsToMany(Service, {
//   through: {
//     model: Presentable,
//     unique: false,
//   },
//   foreignKey: 'client_presentation_id', // Use snake_case
//   as: 'ServiceClientPresentations',
//   constraints: false,
// });
// Service.belongsToMany(ClientPresentation, {
//   through: {
//     model: Presentable,
//     unique: false,
//     scope: { Presentable_type: 'service' }, // Use snake_case
//   },
//   foreignKey: 'Presentable_id', // Use snake_case
//   as: 'ServiceClientPresentations',
//   constraints: false,
// });


// AdditionalService.belongsToMany(ClientPresentation, {
//   through: {
//     model: Presentable,
//     unique: false,
//     scope: {
//       Presentable_type: 'additional_service'
//     },
//   },
//   foreignKey: 'Presentable_id',
//   as: 'AdditionalServiceClientPresentations',
//   constraints: false,
// });
// ClientPresentation.belongsToMany(AdditionalService, {
//   through: {
//     model: Presentable,
//     unique: false,
//   },
//   foreignKey: 'client_presentation_id',
//   as: 'AdditionalServiceClientPresentations',
//   constraints: false,
// }); 


// AvailabilityOption.belongsToMany(ClientPresentation, {
//   through: {
//     model: Presentable,
//     unique: false,
//     scope: {
//       Presentable_type: 'availability_option'
//     },
//   },
//   foreignKey: 'Presentable_id',
//   as: 'AvailabilityOptionClientPresentations',
//   constraints: false,
// });
// ClientPresentation.belongsToMany(AvailabilityOption, {
//   through: {
//     model: Presentable,
//     unique: false,
//   },
//   foreignKey: 'client_presentation_id',
//   as: 'AvailabilityOptionClientPresentations',
//   constraints: false,
// });


// DwellingAdjustment.belongsToMany(ClientPresentation, {
//   through: {
//     model: Presentable,
//     unique: false,
//     scope: {
//       Presentable_type: 'dwelling_adjustment'
//     },
//   },
//   foreignKey: 'Presentable_id',
//   as: 'DwellingAdjustmentClientPresentations',
//   constraints: false,
// });
// ClientPresentation.belongsToMany(DwellingAdjustment, {
//   through: {
//     model: Presentable,
//     unique: false,
//   },
//   foreignKey: 'client_presentation_id',
//   as: 'DwellingAdjustmentClientPresentations',
//   constraints: false,
// });

// export { 
//   ClientPresentation,
//   Presentable,
//   Service, 
//   DwellingAdjustment, 
//   AdditionalService, 
//   AvailabilityOption
// };