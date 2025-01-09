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

interface Service{
  fees: FeeContent;
  center: CenterContent;
  time: TimeContent;
}
interface AdditionalService{
  fees: FeeContent;
  center: CenterContent;
  time: TimeContent;
}
interface AvailabilityOption{
  fees: FeeContent;
  center: CenterContent;
  time: TimeContent;
}
interface DwellingAdjustment{
  fees: FeeContent;
  center: CenterContent;
  time: TimeContent;
}

interface FeeContent extends CenterContent{
  on_site: boolean;
  base_time: number;
  rate_over_base_time: number;
}
interface FeePart {
  differential_scheduling: boolean;
  data_collection: FeeContent;
  report_writing: FeeContent;
  client_presentation: FeeContent;
}
interface AppointmentFee {
  data_collection_time: number;
  report_writing_time: number;
  client_presentation_time: number;
}

interface CenterContent{
  base_sq_ft: number;
}

interface TimeContent extends CenterContent{
  base_fee: number;
  rate_over_base_fee: number;
}
interface TimePart {
  base_service: TimeContent;
  dwelling_type: TimeContent;
  add_services: TimeContent;
  avail_options: TimeContent;
}
interface AppointmentTime {
  base_service_fee: number;
  dwelling_type_fee: number;
  add_service_fees: number;
  avail_option_fees: number;
}


export class Appointment {
  
  address: Address;
  property: Property;
  home_sq_ft: number;
  service: Service;
  dwelling: DwellingAdjustment;
  additional_services: AdditionalService[];
  availability_options: AvailabilityOption[];
  
  data_collection: TimePart;
  data_collection_time: number;
  report_writing: TimePart;
  report_writing_time: number;
  client_presentation: TimePart;
  client_presentation_time: number;
  
  base_service: FeePart;
  base_service_fee: number;
  dwelling_type: FeePart;
  dwelling_type_fee: number;
  add_services: FeePart;
  add_service_fees: number;
  avail_options: FeePart;
  avail_option_fees: number;
  
  constructor(
    address: Address,
    property: Property,
    home_sq_ft: number,
    service: Service,
    dwelling: DwellingAdjustment,
    additional_services: AdditionalService[],
    availability_options: AvailabilityOption[],
  
    data_collection: TimePart,
    data_collection_time: number,
    report_writing: TimePart,
    report_writing_time: number,
    client_presentation: TimePart,
    client_presentation_time: number,
  
    base_service: FeePart,
    base_service_fee: number,
    dwelling_type: FeePart,
    dwelling_type_fee: number,
    add_services: FeePart,
    add_service_fees: number,
    avail_options: FeePart,
    avail_option_fees: number
  ) {
    this.address = address;
    this.property = property;
    this.home_sq_ft = home_sq_ft;
    this.service = service;
    this.dwelling = dwelling;
    this.additional_services = additional_services;
    this.availability_options = availability_options;
  
    this.data_collection = data_collection;
    this.data_collection_time = data_collection_time;
    this.report_writing = report_writing;
    this.report_writing_time = report_writing_time;
    this.client_presentation = client_presentation;
    this.client_presentation_time = client_presentation_time;
  
    this.base_service = base_service;
    this.base_service_fee = base_service_fee;
    this.dwelling_type = dwelling_type;
    this.dwelling_type_fee = dwelling_type_fee;
    this.add_services = add_services;
    this.add_service_fees = add_service_fees;
    this.avail_options = avail_options;
    this.avail_option_fees = avail_option_fees;
  }
  
    calculateFee(home_sq_ft: number, TimeContent: TimeContent): number {
      if (home_sq_ft <= TimeContent.base_sq_ft) return TimeContent.base_sq_ft;
      const extra_sq_ft = home_sq_ft - TimeContent.base_sq_ft;
      const additional_fee = extra_sq_ft * TimeContent.rate_over_base_fee;
      return TimeContent.base_sq_ft + additional_fee;
    }
  
    calculateAllPartFees(): AppointmentTime {
      // Initialize fees
      let baseServiceFee = 0;
      let dwellingTypeFee = 0;
      let AdditionalServicesFees = 0;
      let AvailabilityOptionsFees = 0;
  
      // Add contributions from data_collection, report_writing, and client_presentation
      baseServiceFee = this.calculateFee(this.home_sq_ft, this.data_collection.base_service) + 
      this.calculateFee(this.home_sq_ft, this.report_writing.base_service) + 
      this.calculateFee(this.home_sq_ft, this.client_presentation.base_service);
  
      dwellingTypeFee = this.calculateFee(this.home_sq_ft, this.data_collection.dwelling_type) + 
      this.calculateFee(this.home_sq_ft, this.report_writing.dwelling_type) + 
      this.calculateFee(this.home_sq_ft, this.client_presentation.dwelling_type);
  
      AdditionalServicesFees = this.calculateFee(this.home_sq_ft, this.data_collection.add_services) + 
      this.calculateFee(this.home_sq_ft, this.report_writing.add_services) + 
      this.calculateFee(this.home_sq_ft, this.client_presentation.add_services);

      AvailabilityOptionsFees = this.calculateFee(this.home_sq_ft, this.data_collection.avail_options) + 
      this.calculateFee(this.home_sq_ft, this.report_writing.base_service) + 
      this.calculateFee(this.home_sq_ft, this.client_presentation.base_service);

      // Return fees as an object
      return {
        base_service_fee: baseServiceFee,
        dwelling_type_fee: dwellingTypeFee,
        add_service_fees: AdditionalServicesFees,
        avail_option_fees: AvailabilityOptionsFees
      };
    }

  
    calculateTime(home_sq_ft: number, FeeContent: FeeContent): number {
      if (home_sq_ft <= FeeContent.base_sq_ft) return FeeContent.base_sq_ft;
      const extra_sq_ft = home_sq_ft - FeeContent.base_sq_ft;
      const additional_time = extra_sq_ft * FeeContent.rate_over_base_time;
      return FeeContent.base_sq_ft + additional_time;
    }
  
    calculateAllPartTimes(): AppointmentFee {
      // Initialize fees
      let dataCollectionTime = 0;
      let reportWritingTime = 0;
      let clientPresentationTime = 0;
  
      // Add contributions from data_collection, report_writing, and client_presentation
      dataCollectionTime = this.calculateTime(this.home_sq_ft, this.base_service.data_collection) + 
      this.calculateTime(this.home_sq_ft, this.base_service.data_collection) +       
      this.calculateTime(this.home_sq_ft, this.base_service.data_collection) + 
      this.calculateTime(this.home_sq_ft, this.base_service.data_collection);
  
      reportWritingTime = this.calculateTime(this.home_sq_ft, this.base_service.report_writing) + 
      this.calculateTime(this.home_sq_ft, this.base_service.report_writing) +       
      this.calculateTime(this.home_sq_ft, this.base_service.report_writing) + 
      this.calculateTime(this.home_sq_ft, this.base_service.report_writing);
  
      clientPresentationTime = this.calculateTime(this.home_sq_ft, this.base_service.client_presentation) + 
      this.calculateTime(this.home_sq_ft, this.base_service.client_presentation) +       
      this.calculateTime(this.home_sq_ft, this.base_service.client_presentation) + 
      this.calculateTime(this.home_sq_ft, this.base_service.client_presentation);

      // Return times as an object
      return {
        data_collection_time: dataCollectionTime,
        report_writing_time: reportWritingTime,
        client_presentation_time: clientPresentationTime,
      };
    }
}