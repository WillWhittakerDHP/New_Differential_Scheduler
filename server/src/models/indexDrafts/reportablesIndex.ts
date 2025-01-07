// import { sequelize } from '../../config/connection.js';

// // Appointment Content
// import { ReportWritingFactory } from '../appointment/timeContent/reportWriting.js';
// import { ReportableFactory } from '../appointment/timeContent/reportables.js';
// import { ServiceFactory } from '../appointment/structure/serviceTypes.js';
// import { AdditionalServiceFactory } from '../appointment/structure/additionalServices.js';
// import { DwellingAdjustmentFactory } from '../appointment/structure/dwellingAdjustments.js';
// import { AvailabilityOptionFactory } from '../appointment/structure/availabilityOptions.js';
// // TimeBlocks

// // Appointment Content
// const ReportWriting = ReportWritingFactory(sequelize);
// const Reportable = ReportableFactory(sequelize);
// const Service = ServiceFactory(sequelize);
// const AdditionalService = AdditionalServiceFactory(sequelize);
// const DwellingAdjustment = DwellingAdjustmentFactory(sequelize);
// const AvailabilityOption = AvailabilityOptionFactory(sequelize);
// // TimeBlocks


// ReportWriting.belongsToMany(Service, {
//   through: {
//     model: Reportable,
//     unique: false,
//   },
//   foreignKey: 'report_writing_id', // Use snake_case
//   as: 'ServiceReportWritings',
//   constraints: false,
// });
// Service.belongsToMany(ReportWriting, {
//   through: {
//     model: Reportable,
//     unique: false,
//     scope: { Reportable_type: 'service' }, // Use snake_case
//   },
//   foreignKey: 'Reportable_id', // Use snake_case
//   as: 'ServiceReportWritings',
//   constraints: false,
// });


// AdditionalService.belongsToMany(ReportWriting, {
//   through: {
//     model: Reportable,
//     unique: false,
//     scope: {
//       Reportable_type: 'additional_service'
//     },
//   },
//   foreignKey: 'Reportable_id',
//   as: 'AdditionalServiceReportWritings',
//   constraints: false,
// });
// ReportWriting.belongsToMany(AdditionalService, {
//   through: {
//     model: Reportable,
//     unique: false,
//   },
//   foreignKey: 'report_writing_id',
//   as: 'AdditionalServiceReportWritings',
//   constraints: false,
// }); 


// AvailabilityOption.belongsToMany(ReportWriting, {
//   through: {
//     model: Reportable,
//     unique: false,
//     scope: {
//       Reportable_type: 'availability_option'
//     },
//   },
//   foreignKey: 'Reportable_id',
//   as: 'AvailabilityOptionReportWritings',
//   constraints: false,
// });
// ReportWriting.belongsToMany(AvailabilityOption, {
//   through: {
//     model: Reportable,
//     unique: false,
//   },
//   foreignKey: 'report_writing_id',
//   as: 'AvailabilityOptionReportWritings',
//   constraints: false,
// });


// DwellingAdjustment.belongsToMany(ReportWriting, {
//   through: {
//     model: Reportable,
//     unique: false,
//     scope: {
//       Reportable_type: 'dwelling_adjustment'
//     },
//   },
//   foreignKey: 'Reportable_id',
//   as: 'DwellingAdjustmentReportWritings',
//   constraints: false,
// });
// ReportWriting.belongsToMany(DwellingAdjustment, {
//   through: {
//     model: Reportable,
//     unique: false,
//   },
//   foreignKey: 'report_writing_id',
//   as: 'DwellingAdjustmentReportWritings',
//   constraints: false,
// });

// export { 
//   ReportWriting,
//   Reportable,
//   Service, 
//   DwellingAdjustment, 
//   AdditionalService, 
//   AvailabilityOption
// };