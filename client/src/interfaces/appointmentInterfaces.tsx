interface Address{
  address1: string;
  address2: string;
  unitNumber?: number;
  city: string;
  state: string;
  zipCode: number;
}

interface Property{
  home_sq_ft: number;
  bedrooms?: number;
  foundationAccess?: string;
}

interface PartFee {
  base_service_fee: number;
  dwelling_type_fee: number;
  add_service_fees: number;
  avail_option_fees: number;
}
interface FeeContent{
  base_fee: number;
  rate_over_base_fee: number;
}
interface FeePart{
  base_service: FeeContent;
  dwelling_type: FeeContent;
  add_services: FeeContent;
  avail_options: FeeContent;
}

export interface AppointmentPart{
  feePart: FeePart;
  base_sq_ft: number;
  timePart: TimePart;
}

interface TimePart{
  differential_scheduling: boolean;
  data_collection: TimeContent;
  report_writing: TimeContent;
  client_presentation: TimeContent;
}
interface TimeContent{
  on_site: boolean;
  base_time: number;
  rate_over_base_time: number;
}
interface PartTime {
  data_collection_time: number;
  report_writing_time: number;
  client_presentation_time: number;
}


export class Appointment {
  
  // // address: Address | undefined;
  // // property: Property | undefined;
  
  constructor(
    // address: Address,
    // property: Property,
    public home_sq_ft: number | undefined = undefined,
    public base_service: AppointmentPart,
    public dwelling_type: AppointmentPart | undefined = undefined,
    public additional_services: AppointmentPart[] | undefined = undefined,
    public availability_options: AppointmentPart[] | undefined = undefined,
  
    public data_collection_time: number | undefined = 0,
    public report_writing_time: number | undefined = 0,
    public client_presentation_time: number | undefined = 0,
  
    public base_service_fee: number | undefined = 0,
    public dwelling_type_fee: number | undefined = 0,
    public add_service_fees: number[] | undefined = [0],
    public avail_option_fees: number[] | undefined = [0]
  ) {}
  
    calculateFee(home_sq_ft: number, appointmentPart: AppointmentPart, feeContent: FeeContent): number {
      if (home_sq_ft <= appointmentPart.base_sq_ft) return appointmentPart.base_sq_ft;
      const extra_sq_ft = home_sq_ft - appointmentPart.base_sq_ft;
      const additional_fee = extra_sq_ft * feeContent.base_fee;
      return appointmentPart.base_sq_ft + additional_fee;
    }
  
    calculateAllPartFees(appointmentPart: AppointmentPart): PartFee {
      // Initialize fees
      let baseServiceFee = 0;
      let dwellingTypeFee = 0;
      let additionalServicesFees = 0;
      let availabilityOptionsFees = 0;
  
      // Add contributions from data_collection, report_writing, and client_presentation
      if (this.home_sq_ft !== undefined && appointmentPart !== undefined){
        baseServiceFee = this.calculateFee(this.home_sq_ft, appointmentPart, appointmentPart.feePart.base_service);
        
        dwellingTypeFee = this.calculateFee(this.home_sq_ft, appointmentPart, appointmentPart.feePart.dwelling_type);

        additionalServicesFees = this.calculateFee(this.home_sq_ft, appointmentPart, appointmentPart.feePart.add_services);

        additionalServicesFees = this.calculateFee(this.home_sq_ft, appointmentPart, appointmentPart.feePart.avail_options);
      }
      // Return fees as an object
      return {
        base_service_fee: baseServiceFee,
        dwelling_type_fee: dwellingTypeFee,
        add_service_fees: additionalServicesFees,
        avail_option_fees: availabilityOptionsFees
      };
    }
    
    
    calculateTime(home_sq_ft: number, appointmentPart: AppointmentPart, timeContent: TimeContent): number {
      if (home_sq_ft <= appointmentPart.base_sq_ft) return appointmentPart.base_sq_ft;
      const extra_sq_ft = home_sq_ft - appointmentPart.base_sq_ft;
      const additional_time = extra_sq_ft * timeContent.base_time;
      return appointmentPart.base_sq_ft + additional_time;
    }
    
    calculateAllPartTimes(appointmentPart: AppointmentPart): PartTime {
      // Initialize fees
      let dataCollectionTime = 0;
      let reportWritingTime = 0;
      let clientPresentationTime = 0;
      
      // Add contributions from data_collection, report_writing, and client_presentation
      if (this.home_sq_ft !== undefined && appointmentPart !== undefined){
        dataCollectionTime = this.calculateTime(this.home_sq_ft, appointmentPart, appointmentPart.timePart.data_collection);
        
        reportWritingTime = this.calculateTime(this.home_sq_ft,  appointmentPart, appointmentPart.timePart.report_writing);
        
        clientPresentationTime = this.calculateTime(this.home_sq_ft,  appointmentPart, appointmentPart.timePart.client_presentation);
      }
        
        // Return times as an object
        return {
          data_collection_time: dataCollectionTime,
          report_writing_time: reportWritingTime,
          client_presentation_time: clientPresentationTime,
        };
      }
    }