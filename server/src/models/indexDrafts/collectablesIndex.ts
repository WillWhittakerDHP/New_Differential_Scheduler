// import { sequelize } from '../../config/connection.js';

// // Appointment Content
// import { DataCollectionFactory } from '../appointment/timeContent/dataCollection.js';
// import { CollectableFactory } from '../appointment/timeContent/collectables.js';
// import { ServiceFactory } from '../appointment/structure/serviceTypes.js';
// import { AdditionalServiceFactory } from '../appointment/structure/additionalServices.js';
// import { DwellingAdjustmentFactory } from '../appointment/structure/dwellingAdjustments.js';
// import { AvailabilityOptionFactory } from '../appointment/structure/availabilityOptions.js';
// // TimeBlocks

// // Appointment Content
// const DataCollection = DataCollectionFactory(sequelize);
// const Collectable = CollectableFactory(sequelize);
// const Service = ServiceFactory(sequelize);
// const AdditionalService = AdditionalServiceFactory(sequelize);
// const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
// const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// // TimeBlocks


// DataCollection.belongsToMany(Service, {
//   through: {
//     model: Collectable,
//     unique: false,
//   },
//   foreignKey: 'data_collection_id', // Use snake_case
//   as: 'ServiceDataCollections',
//   constraints: false,
// });
// Service.belongsToMany(DataCollection, {
//   through: {
//     model: Collectable,
//     unique: false,
//     scope: { Collectable_type: 'service' }, // Use snake_case
//   },
//   foreignKey: 'Collectable_id', // Use snake_case
//   as: 'ServiceDataCollections',
//   constraints: false,
// });


// AdditionalService.belongsToMany(DataCollection, {
//   through: {
//     model: Collectable,
//     unique: false,
//     scope: {
//       Collectable_type: 'additional_service'
//     },
//   },
//   foreignKey: 'Collectable_id',
//   as: 'AdditionalServiceDataCollections',
//   constraints: false,
// });
// DataCollection.belongsToMany(AdditionalService, {
//   through: {
//     model: Collectable,
//     unique: false,
//   },
//   foreignKey: 'data_collection_id',
//   as: 'AdditionalServiceDataCollections',
//   constraints: false,
// });


// AvailabilityOption.belongsToMany(DataCollection, {
//   through: {
//     model: Collectable,
//     unique: false,
//     scope: {
//       Collectable_type: 'availability_option'
//     },
//   },
//   foreignKey: 'Collectable_id',
//   as: 'AvailabilityOptionDataCollections',
//   constraints: false,
// });
// DataCollection.belongsToMany(AvailabilityOption, {
//   through: {
//     model: Collectable,
//     unique: false,
//   },
//   foreignKey: 'data_collection_id',
//   as: 'AvailabilityOptionDataCollections',
//   constraints: false,
// });


// DwellingAdjustment.belongsToMany(DataCollection, {
//   through: {
//     model: Collectable,
//     unique: false,
//     scope: {
//       Collectable_type: 'dwelling_adjustment'
//     },
//   },
//   foreignKey: 'Collectable_id',
//   as: 'DwellingAdjustmentDataCollections',
//   constraints: false,
// });
// DataCollection.belongsToMany(DwellingAdjustment, {
//   through: {
//     model: Collectable,
//     unique: false,
//   },
//   foreignKey: 'data_collection_id',
//   as: 'DwellingAdjustmentDataCollections',
//   constraints: false,
// });

// export { 
//   DataCollection,
//   Collectable,
//   Service, 
//   DwellingAdjustment, 
//   AdditionalService, 
//   AvailabilityOption
// };