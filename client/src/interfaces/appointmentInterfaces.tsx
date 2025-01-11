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

interface BlockTime {
  data_collection_time: number;
  report_writing_time: number;
  client_presentation_time: number;
}

export class AppointmentPart{
  constructor(
    public name: string,
    public base_sq_ft: number,
    public data_collection: AppointmentBlock,
    public report_writing: AppointmentBlock,
    public client_presentation: AppointmentBlock,
  ) {}
}

export class AppointmentBlock{
  constructor(
    public on_site: boolean,
    public base_time: number,
    public rate_over_base_time: number,
    public base_fee: number,
    public rate_over_base_fee: number,
  ) {}
}



export class Appointment {
  
  // // address: Address | undefined;
  // // property: Property | undefined;
  
  constructor(
    // address: Address,
    // property: Property,
    public home_sq_ft: number | undefined = 750,
    public base_service: AppointmentPart | undefined = undefined,
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
  
  
    calculateBlockFee(home_sq_ft: number, appointmentPart: AppointmentPart, appointmentBlock: AppointmentBlock): number {
      console.log('calculateBlockFee');
      if (home_sq_ft <= appointmentPart.base_sq_ft) return appointmentPart.base_sq_ft;
      const extra_sq_ft = home_sq_ft - appointmentPart.base_sq_ft;
      const additional_fee = extra_sq_ft * appointmentBlock.rate_over_base_fee;
      return appointmentBlock.base_fee + additional_fee;
    }
    calculatePartFee(appointmentPart: AppointmentPart): number | undefined {
      try {
        // console.log('calculatePartFee called');
        // console.log('home_sq_ft:', this.home_sq_ft);
        // console.log('appointmentPart:', appointmentPart);
    
        if (this.home_sq_ft !== undefined && appointmentPart !== undefined) {
          // console.log('Calling calculateBlockFee...');
          const partFee =
            this.calculateBlockFee(this.home_sq_ft, appointmentPart, appointmentPart.data_collection) +
            this.calculateBlockFee(this.home_sq_ft, appointmentPart, appointmentPart.report_writing) +
            this.calculateBlockFee(this.home_sq_ft, appointmentPart, appointmentPart.client_presentation);
    
          // console.log('Calculated partFee:', partFee);
          return partFee;
        }
        console.log('Conditions not met for calculatePartFee');
        return undefined;
      } catch (error) {
        console.error('Error in calculatePartFee:', error);
        return undefined;
      }
    }
    
    
    // calculatePartTimes(home_sq_ft: number, appointmentPart: AppointmentPart, appointmentBlock: AppointmentBlock): number {
    //   if (home_sq_ft <= appointmentPart.base_sq_ft) return appointmentPart.base_sq_ft;
    //   const extra_sq_ft = home_sq_ft - appointmentPart.base_sq_ft;
    //   const additional_time = extra_sq_ft * appointmentBlock.base_time;
    //   return appointmentBlock.base_time + additional_time;
    // }
    
    // calculateAllBlockTimes(appointmentPart: AppointmentPart, appointmentBlock: AppointmentBlock): BlockTime {
    //   // Initialize fees
    //   let dataCollectionTime = 0;
    //   let reportWritingTime = 0;
    //   let clientPresentationTime = 0;
      
    //   // Add contributions from data_collection, report_writing, and client_presentation
    //   if (this.home_sq_ft !== undefined && appointmentPart !== undefined){
    //     dataCollectionTime = this.calculatePartTimes(this.home_sq_ft, appointmentPart, appointmentBlock);
        
    //     reportWritingTime = this.calculatePartTimes(this.home_sq_ft,  appointmentPart, appointmentBlock);
        
    //     clientPresentationTime = this.calculatePartTimes(this.home_sq_ft,  appointmentPart, appointmentBlock);
    //   }
        
    //     // Return times as an object
    //     return {
    //       data_collection_time: dataCollectionTime,
    //       report_writing_time: reportWritingTime,
    //       client_presentation_time: clientPresentationTime,
    //     };
    //   }
    }