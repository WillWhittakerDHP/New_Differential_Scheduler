export class AppointmentBlock {
  constructor(
    public on_site: boolean,
    public client_present: boolean,
    public base_time: number,
    public rate_over_base_time: number,
    public base_fee: number,
    public rate_over_base_fee: number,
  ) {}
}

export class SiteTime {
  constructor(
    public totalTime: number = 0,
    public on_site: boolean = true,
    public client_present: boolean = true,
  ) {}
}

export class PartTimes {
  constructor(
    public data_collection: SiteTime = new SiteTime(),
    public report_writing: SiteTime = new SiteTime(),
    public formal_presentation: SiteTime = new SiteTime(),
  ) {}

  static calculatePartTimes(home_sq_ft: number, appointmentPart: AppointmentPart): PartTimes {
    if (!home_sq_ft || !appointmentPart) {
      throw new Error("Invalid input for calculatePartTimes");
    }

    const calculateBlockTime = (block: AppointmentBlock): number => {
      return home_sq_ft <= appointmentPart.base_sq_ft
        ? block.base_time
        : block.base_time + (home_sq_ft - appointmentPart.base_sq_ft) * block.rate_over_base_time;
    };

    const dataCollectionTime = calculateBlockTime(appointmentPart.data_collection);
    const reportWritingTime = calculateBlockTime(appointmentPart.report_writing);
    const clientPresentationTime = calculateBlockTime(appointmentPart.formal_presentation);

    return new PartTimes(
      new SiteTime(dataCollectionTime, appointmentPart.data_collection.on_site, appointmentPart.data_collection.client_present),
      new SiteTime(reportWritingTime, appointmentPart.report_writing.on_site, appointmentPart.report_writing.client_present),
      new SiteTime(clientPresentationTime, appointmentPart.formal_presentation.on_site, appointmentPart.formal_presentation.client_present),
    );
  }
}

export class AppointmentPart {
  public times: PartTimes;

  constructor(
    public name: string,
    public base_sq_ft: number,
    public data_collection: AppointmentBlock,
    public report_writing: AppointmentBlock,
    public formal_presentation: AppointmentBlock,
  ) {
    this.times = new PartTimes();
  }

  calculateTimes(home_sq_ft: number): void {
    this.times = PartTimes.calculatePartTimes(home_sq_ft, this);
  }
}

export class Appointment {
  constructor(
    public home_sq_ft: number | undefined = 750,
    public base_service: AppointmentPart | undefined = undefined,
    public dwelling_type: AppointmentPart | undefined = undefined,
    public additional_services: AppointmentPart[] = [],
    public availability_options: AppointmentPart[] = [],
    public data_collection: SiteTime = new SiteTime(),
    public report_writing: SiteTime = new SiteTime(),
    public formal_presentation: SiteTime = new SiteTime(),
    public base_service_fee: number | undefined = 0,
    public dwelling_type_fee: number | undefined = 0,
    public add_service_fees: number[] = [], // Array for fees
    public avail_option_fees: number[] = [],
    public FullFee: number | undefined = 0,
    public FullAppointmentDuration: number = 0,
    public onSiteDuration: number = 0,
    public formalPresentationDuration: number = 0,
    public offSiteDuration: number = 0
  ) {}

  updateTimes(): void {
    // Reset totals
    this.data_collection = new SiteTime();
    this.report_writing = new SiteTime();
    this.formal_presentation = new SiteTime();
    this.FullAppointmentDuration = 0;
    this.onSiteDuration = 0;
    this.formalPresentationDuration = 0;
    this.offSiteDuration = 0;

    // Calculate and aggregate times
    const allParts = [
      this.base_service,
      this.dwelling_type,
      ...this.additional_services,
      ...this.availability_options,
    ];

    allParts.forEach((part) => {
      if (part) {
        part.calculateTimes(this.home_sq_ft || 0);

      // Accumulate full appointment duration
      this.FullAppointmentDuration +=
      part.times.data_collection.totalTime +
      part.times.report_writing.totalTime +
      part.times.formal_presentation.totalTime;

    // Accumulate on-site duration
    if (part.times.data_collection.on_site) {
      this.onSiteDuration += part.times.data_collection.totalTime;
    }
    if (part.times.report_writing.on_site) {
      this.onSiteDuration += part.times.report_writing.totalTime;
    }
    if (part.times.formal_presentation.on_site) {
      this.onSiteDuration += part.times.formal_presentation.totalTime;
    }

    // Accumulate formal presentation duration
    if (part.times.data_collection.client_present) {
      this.formalPresentationDuration += part.times.data_collection.totalTime;
    }
    if (part.times.report_writing.client_present) {
      this.formalPresentationDuration += part.times.report_writing.totalTime;
    }
    if (part.times.formal_presentation.client_present) {
      this.formalPresentationDuration += part.times.formal_presentation.totalTime;
    }

    // Accumulate off-site duration (neither on-site nor client-present)
    if (!part.times.data_collection.on_site && !part.times.data_collection.client_present) {
      this.offSiteDuration += part.times.data_collection.totalTime;
    }
    if (!part.times.report_writing.on_site && !part.times.report_writing.client_present) {
      this.offSiteDuration += part.times.report_writing.totalTime;
    }
    if (!part.times.formal_presentation.on_site && !part.times.formal_presentation.client_present) {
      this.offSiteDuration += part.times.formal_presentation.totalTime;
    }
  }
    });

    console.log("Updated Times:", this.data_collection, this.report_writing, this.formal_presentation);
  }
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
        this.calculateBlockFee(this.home_sq_ft, appointmentPart, appointmentPart.formal_presentation);
        
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

}
