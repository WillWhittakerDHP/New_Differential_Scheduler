// import { AdditionalServiceData, AvailabilityOptionData, DwellingAdjustmentData, ServiceData } from "./serviceInterfaces";

export interface AddressData {
  address1: string;
  address2: string;
  unitNumber?: number;
  city: string;
  state: string;
  zipCode: number;
}

export interface PropertyData{
  sqFt: number;
  bedrooms?: number;
  foundationAccess?: string;
}

// export interface AppointmentData{
//   service: ServiceData;
//   additional_service: AdditionalServiceData[] | null;
//   availability_option: AvailabilityOptionData[] | null;
//   dwelling_adjustment: DwellingAdjustmentData;
//   property_data: PropertyData;
//   address: AddressData;
// }

interface PartFee {
  base_sq_ft: number;
  base_fee: number;
  rate_over_base_fee: number;
}
interface FeeContent {
  base_sq_ft: number;
  base_fee: number;
  rate_over_base_fee: number;
}
interface AppointmentFees {
  service_fee: number;
  dwelling_type_fee: number;
  add_service_fees: number;
  avail_option_fees: number;
}

interface PartTime {
  base_sq_ft: number;
  base_time: number;
  rate_over_base_time: number;
}  
interface TimeContent {
  base_sq_ft: number;
  base_time: number;
  rate_over_base_time: number;
}
interface AppointmentTimes {
  data_collection: number;
  report_writing: number;
  client_presentation: number;
}


export class Appointment {

  home_sq_ft: number;
  
  service_fee: PartFee;
  dwelling_type_fee: PartFee;
  add_service_fees: PartFee;
  avail_option_fees: PartFee;
  collections: FeeContent[];
  writings: FeeContent[];
  presentations: FeeContent[];

  data_collection: PartTime;
  report_writing: PartTime;
  client_presentation: PartTime;
  service: TimeContent[];
  additional_service: TimeContent[];
  availability_option: TimeContent[];
  dwelling_adjustment: TimeContent[];

  constructor(
    home_sq_ft: number,

    service_fee: PartFee,
    dwelling_type_fee: PartFee,
    add_service_fees: PartFee,
    avail_option_fees: PartFee,
    collections: FeeContent[],
    writings: FeeContent[],
    presentations: FeeContent[],
    
    data_collection: PartTime,
    report_writing: PartTime,
    client_presentation: PartTime,
    service: TimeContent[],
    additional_service: TimeContent[],
    availability_option: TimeContent[],
    dwelling_adjustment: TimeContent[]
  ) {
    this.home_sq_ft = home_sq_ft;
    
    this.service_fee = service_fee;
    this.dwelling_type_fee = dwelling_type_fee;
    this.add_service_fees = add_service_fees;
    this.avail_option_fees = avail_option_fees;
    this.collections = collections; // Assign here
    this.writings = writings;       // Assign here
    this.presentations = presentations; // Assign here
    
    this.data_collection = data_collection;
    this.report_writing = report_writing;
    this.client_presentation = client_presentation;
    this.service = service;
    this.additional_service = additional_service;
    this.availability_option = availability_option;
    this.dwelling_adjustment = dwelling_adjustment;
  }
  
  
    calculateFee(home_sq_ft: number, feeContent: FeeContent): number {
      if (home_sq_ft <= feeContent.base_sq_ft) return feeContent.base_fee;
      const extra_sq_ft = home_sq_ft - feeContent.base_sq_ft;
      const additional_fee = extra_sq_ft * feeContent.rate_over_base_fee;
      return feeContent.base_fee + additional_fee;
    }
  
    calculateAllPartFees(): AppointmentFees {
      // Initialize fees
      let baseServiceFee = this.calculateFee(this.home_sq_ft, this.service_fee);
      let dwellingTypeFee = this.calculateFee(this.home_sq_ft, this.dwelling_type_fee);
      let AdditionalServicesFees = this.calculateFee(this.home_sq_ft, this.add_service_fees);
      let AvailabilityOptionsFees = this.calculateFee(this.home_sq_ft, this.add_service_fees);
  
      // Add contributions from data_collection, report_writing, and cleint_presentation
      this.collections.forEach(collections => {
        baseServiceFee += this.calculateFee(this.home_sq_ft, collections);
        dwellingTypeFee += this.calculateFee(this.home_sq_ft, collections);
        AdditionalServicesFees += this.calculateFee(this.home_sq_ft, collections);
        AvailabilityOptionsFees += this.calculateFee(this.home_sq_ft, collections)
      });
  
      this.writings.forEach(writings => {
        baseServiceFee += this.calculateFee(this.home_sq_ft, writings);
        dwellingTypeFee += this.calculateFee(this.home_sq_ft, writings);
        AdditionalServicesFees += this.calculateFee(this.home_sq_ft, writings);
        AvailabilityOptionsFees += this.calculateFee(this.home_sq_ft, writings)
      });
  
      this.presentations.forEach(presentations => {
        baseServiceFee += this.calculateFee(this.home_sq_ft, presentations);
        dwellingTypeFee += this.calculateFee(this.home_sq_ft, presentations);
        AdditionalServicesFees += this.calculateFee(this.home_sq_ft, presentations);
        AvailabilityOptionsFees += this.calculateFee(this.home_sq_ft, presentations) 
      });

  
      // Return fees as an object
      return {
        service_fee: baseServiceFee,
        dwelling_type_fee: dwellingTypeFee,
        add_service_fees: AdditionalServicesFees,
        avail_option_fees: AdditionalServicesFees
      };
    }

  calculateTime(home_sq_ft: number, timeContent: TimeContent): number {
    if (home_sq_ft <= timeContent.base_sq_ft) return timeContent.base_time;
    const extra_sq_ft = home_sq_ft - timeContent.base_sq_ft;
    const additional_time = extra_sq_ft * timeContent.rate_over_base_time;
    return timeContent.base_time + additional_time;
  }

  calculateAllPartTimes(): AppointmentTimes {
    // Initialize times
    let dataCollectionTime = this.calculateTime(this.home_sq_ft, this.data_collection);
    let reportWritingTime = this.calculateTime(this.home_sq_ft, this.report_writing);
    let clientPresentationTime = this.calculateTime(this.home_sq_ft, this.client_presentation);

    // Add contributions from service, additional services, availability options, and dwelling adjustment
    this.service.forEach(service => {
      dataCollectionTime += this.calculateTime(this.home_sq_ft, service);
      reportWritingTime += this.calculateTime(this.home_sq_ft, service);
      clientPresentationTime += this.calculateTime(this.home_sq_ft, service);
    });

    this.additional_service.forEach(addService => {
      dataCollectionTime += this.calculateTime(this.home_sq_ft, addService);
      reportWritingTime += this.calculateTime(this.home_sq_ft, addService);
      clientPresentationTime += this.calculateTime(this.home_sq_ft, addService);    });

    this.availability_option.forEach(option => {
      dataCollectionTime += this.calculateTime(this.home_sq_ft, option);
      reportWritingTime += this.calculateTime(this.home_sq_ft, option);
      clientPresentationTime += this.calculateTime(this.home_sq_ft, option);    });

    this.dwelling_adjustment.forEach(adjustment => {
      dataCollectionTime += this.calculateTime(this.home_sq_ft, adjustment);
      reportWritingTime += this.calculateTime(this.home_sq_ft, adjustment);
      clientPresentationTime += this.calculateTime(this.home_sq_ft, adjustment);    });

    // Return times as an object
    return {
      data_collection: dataCollectionTime,
      report_writing: reportWritingTime,
      client_presentation: clientPresentationTime,
    };
  }
}