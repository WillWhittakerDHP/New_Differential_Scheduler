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

export class PartTimes {
  constructor(
    public data_collection_time: number,
    public report_writing_time: number,
    public client_presentation_time: number,
    public on_site_time: number,
    ) {}
}

export class AppointmentPart{
  constructor(
    public name: string,
    public base_sq_ft: number,
    public data_collection: AppointmentBlock,
    public report_writing: AppointmentBlock,
    public client_presentation: AppointmentBlock,
    public times: PartTimes,
  ) {}
  
  calculatePartTimes(home_sq_ft: number, appointmentPart: AppointmentPart): PartTimes {
    if (!home_sq_ft || !appointmentPart) {
      throw new Error("Invalid input for calculatePartTimes");
    }
  
    // Helper function to calculate time for a block
    const calculateBlockTime = (block: AppointmentBlock): number => {
      return home_sq_ft <= appointmentPart.base_sq_ft
        ? block.base_time
        : block.base_time + (home_sq_ft - appointmentPart.base_sq_ft) * block.rate_over_base_time;
    };
  
    // Calculate individual times
    const dataCollectionTime = calculateBlockTime(appointmentPart.data_collection);
    const reportWritingTime = calculateBlockTime(appointmentPart.report_writing);
    const clientPresentationTime = calculateBlockTime(appointmentPart.client_presentation);
  
    // Calculate the on-site total time
    const onSiteTotalTime = 
      (appointmentPart.data_collection.on_site ? dataCollectionTime : 0) +
      (appointmentPart.report_writing.on_site ? reportWritingTime : 0) +
      (appointmentPart.client_presentation.on_site ? clientPresentationTime : 0);
  
    // Return the PartTimes object with the on_site_total_time
    return {
      data_collection_time: dataCollectionTime,
      report_writing_time: reportWritingTime,
      client_presentation_time: clientPresentationTime,
      on_site_time: onSiteTotalTime,
    };
  }
  
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
    constructor(
      // // public address: Address | undefined;
      // // public property: Property | undefined;
      public home_sq_ft: number | undefined = 750,
      public base_service: AppointmentPart | undefined = undefined,
      public dwelling_type: AppointmentPart | undefined = undefined,
      public additional_services: AppointmentPart[] = [], // Now supports multiple services
      public availability_options: AppointmentPart [] = [],
      public data_collection_time: number | undefined = 0,
      public report_writing_time: number | undefined = 0,
      public client_presentation_time: number | undefined = 0,
      public base_service_fee: number | undefined = 0,
      public dwelling_type_fee: number | undefined = 0,
      public add_service_fees: number[] = [], // Array for fees
      public avail_option_fees: number[] = [],
      public full_fee: number | undefined = 0
    ) {}
    
    calculateBlockFee(home_sq_ft: number, appointmentPart: AppointmentPart, appointmentBlock: AppointmentBlock): number {
      // console.log('calculateBlockFee');
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
    
    updateTimes(): void {
      // Reset times to 0 if not selected
      this.data_collection_time = 0;
      this.report_writing_time = 0;
      this.client_presentation_time = 0;
      
      // Helper function to add times if the PartTimes object exists
      const addTimesFromPart = (appointmentPart?: AppointmentPart) => {
        if (appointmentPart?.times) {
          this.data_collection_time! += appointmentPart.times.data_collection_time ?? 0;
          this.report_writing_time! += appointmentPart.times.report_writing_time ?? 0;
          this.client_presentation_time! += appointmentPart.times.client_presentation_time ?? 0;
        }
      };
      
      // Update times from base_service
      addTimesFromPart(this.base_service);
      
      // Update times from dwelling_type
      addTimesFromPart(this.dwelling_type);

      
      const additionalServiceTimes = this.calculateAdditionalServiceTimes();
      this.data_collection_time += additionalServiceTimes.data_collection_time;
      this.report_writing_time += additionalServiceTimes.report_writing_time;
      this.client_presentation_time += additionalServiceTimes.client_presentation_time;    
      
      const availabilityOptionTimes = this.calculateAvailabilityOptionTimes();
      this.data_collection_time += availabilityOptionTimes.data_collection_time;
      this.report_writing_time += availabilityOptionTimes.report_writing_time;
      this.client_presentation_time += availabilityOptionTimes.client_presentation_time;    
      
      // Log the updated times for debugging
      console.log("Updated Times:");
      console.log("Data Collection Time:", this.data_collection_time);
      console.log("Report Writing Time:", this.report_writing_time);
      console.log("Client Presentation Time:", this.client_presentation_time);
    }
    
    // Method to add an additional service
    addAdditionalService(service: AppointmentPart): void {
      if (!this.additional_services) {
        this.additional_services = [];
      }
      this.additional_services.push(service);
    }
    // Method to add an additional service
    addAvailabilityOption(service: AppointmentPart): void {
      if (!this.additional_services) {
        this.additional_services = [];
      }
      this.additional_services.push(service);
    }
    
    // Method to calculate fees for all additional services
    calculateAdditionalServiceFees(): number {
      console.log("Additional Services Value:", this.additional_services);
      console.log("Type of Additional Services:", typeof this.additional_services);
      console.log("Is Array:", Array.isArray(this.additional_services));
    
      const additionalServices = this.additional_services ?? []; // Ensure a fallback array
      return additionalServices.reduce((total, service) => {
        const serviceFee = this.calculatePartFee(service);
        if (serviceFee !== undefined) {
          total += serviceFee;
        }
        return total;
      }, 0);
    }
    
    
    // Method to calculate total times for all additional services
    calculateAdditionalServiceTimes(): PartTimes {
      // Use a default empty array if additional_services is undefined
      const additionalServices = this.additional_services ?? [];
      
      return additionalServices.reduce(
        (totalTimes, service) => {
          const serviceTimes = service.calculatePartTimes(this.home_sq_ft || 0, service);
          totalTimes.data_collection_time += serviceTimes.data_collection_time;
          totalTimes.report_writing_time += serviceTimes.report_writing_time;
          totalTimes.client_presentation_time += serviceTimes.client_presentation_time;
          return totalTimes;
        },
        new PartTimes(0, 0, 0, 0)
      );
    };

  
  
  // Method to calculate fees for all availability options
  calculateAvailabilityOptionFees(): number {
    console.log("availability options Value:", this.availability_options);
    console.log("Type of availability options:", typeof this.availability_options);
    console.log("Is Array:", Array.isArray(this.availability_options));
  
    const availabilityOptions = this.availability_options ?? []; // Ensure a fallback array
    return availabilityOptions.reduce((total, option) => {
      const optionFee = this.calculatePartFee(option);
      if (optionFee !== undefined) {
        total += optionFee;
      }
      return total;
    }, 0);
  }
  
  
  // Method to calculate total times for all availability options
  calculateAvailabilityOptionTimes(): PartTimes {
    // Use a default empty array if availability_options is undefined
    const availabilityOptions = this.availability_options ?? [];
    
    return availabilityOptions.reduce(
      (totalTimes, option) => {
        const optionTimes = option.calculatePartTimes(this.home_sq_ft || 0, option);
        totalTimes.data_collection_time += optionTimes.data_collection_time;
        totalTimes.report_writing_time += optionTimes.report_writing_time;
        totalTimes.client_presentation_time += optionTimes.client_presentation_time;
        return totalTimes;
      },
      new PartTimes(0, 0, 0, 0)
    );
  }
    
  }