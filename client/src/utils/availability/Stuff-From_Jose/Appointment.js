export const RequesterTypes = {
    BUYER: 'buyer',
    OWNER: 'owner',
    AGENT: 'agent'
};

export const PartTypes = {
    DATA_COLLECTION: 'dataCollection',
    REPORT_WRITING: 'reportWriting',
    CLIENT_PRESENTATION: 'clientPresentation'
}

export const ServiceTypeNames = {
    BUYERS_INSPECTION: 'buyersInspection',
    WALK_AND_TALK: 'walkAndTalk',
    RE_INSPECTION: 'reInspection',
    MAINTENANCE_PLANNING: 'maintenancePlanning',
    PRESALE_WALK_THRU: 'preSaleWalkThru',
    ENERGY_AUDIT: 'energyAudit',
    BUYERS_INSPECTION_AGENT: 'buyersInspectionAgent',
    WALK_AND_TALK_AGENT: 'walkAndTalkAgent',
    INVESTORS_INSPECTION: 'investorsInspection'
}

export const ServiceTypes = {
    [ServiceTypeNames.BUYERS_INSPECTION]: {
        title: 'Buyer\'s Inspection',
        description: 'I am under contract on a home, and I need someone to inspect the property, test all of the equipment, and recommend repairs',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING,
            PartTypes.CLIENT_PRESENTATION
        ]
    },
    [ServiceTypeNames.WALK_AND_TALK]: {
        title: 'Walk & Talk',
        description: 'I want to buy a home and before I finalize my offer I need a professional to examine the property with me and answer some questions',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING
        ]
    },
    [ServiceTypeNames.RE_INSPECTION]: {
        title: 'Re-Inspection',
        description: 'The seller agreed to make repairs as part of our negotiation, and I need a professional to verify that they completed the work they promised',
        appointmentParts: [
            PartTypes.DATA_COLLECTION
        ]
    },
    [ServiceTypeNames.MAINTENANCE_PLANNING]: {
        title: 'Maintenance Planning',
        description: 'Blah blah blah',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING,
            PartTypes.CLIENT_PRESENTATION
        ]
    },
    [ServiceTypeNames.PRESALE_WALK_THRU]: {
        title: 'Presale Walk-Thru',
        description: 'Blah blah blah',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING
        ]
    },
    [ServiceTypeNames.ENERGY_AUDIT]: {
        title: 'Energy Audit',
        description: 'Blah blah blah',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING,
            PartTypes.CLIENT_PRESENTATION
        ]
    },
    [ServiceTypeNames.BUYERS_INSPECTION_AGENT]: {
        title: 'Buyer\'s Inspection',
        description: 'Blah blah blah',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING,
            PartTypes.CLIENT_PRESENTATION
        ]
    },
    [ServiceTypeNames.WALK_AND_TALK_AGENT]: {
        title: 'Walk & Talk',
        description: 'Blah blah blah',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING
        ]
    },
    [ServiceTypeNames.INVESTORS_INSPECTION]: {
        title: 'Investor\'s Inspection',
        description: 'Blah blah blah',
        appointmentParts: [
            PartTypes.DATA_COLLECTION,
            PartTypes.REPORT_WRITING,
            PartTypes.CLIENT_PRESENTATION
        ]
    }
}

export const RequesterTypeMap = {
    [RequesterTypes.BUYER]: [
        ServiceTypeNames.BUYERS_INSPECTION,
        ServiceTypeNames.WALK_AND_TALK,
        ServiceTypeNames.RE_INSPECTION
    ],
    [RequesterTypes.OWNER]: [
        ServiceTypeNames.MAINTENANCE_PLANNING,
        ServiceTypeNames.PRESALE_WALK_THRU,
        ServiceTypeNames.ENERGY_AUDIT
    ],
    [RequesterTypes.AGENT]: [
        ServiceTypeNames.BUYERS_INSPECTION_AGENT,
        ServiceTypeNames.WALK_AND_TALK_AGENT,
        ServiceTypeNames.INVESTORS_INSPECTION
    ]
}

export const AdditionalServices = {
    RADON_TESTING: 'radonTesting',
    BLUE_TAPE: 'blueTape',
    RE_INSPECTION: 'reInspection'
}

export const DwellingType = {
    CONDO: 'condo',
    TOWNHOUSE: 'townhouse',
    SINGLE_FAMILY: 'singleFamily',
    MULTI_FAMILY: 'multiFamily'

}

export const ContactTypes = {
    CLIENT: 'client',
    AGENT: 'agent',
    ANOTHER_CLIENT: 'anotherClient',
    TRANSACTION_MANAGER: 'transactionManager',
    SELLER: 'seller'
}

export const PartTypeMap = {
    [PartTypes.DATA_COLLECTION]: {
        [ServiceTypeNames.BUYERS_INSPECTION]: {
            base_time: {minutes: 30},
            base_sq_ft: 750,
            workRate: 0.06
        },
        [ServiceTypeNames.WALK_AND_TALK]: {
            base_time: {minutes: 30},
            base_sq_ft: 750,
            workRate: 0.06
        },
        [ServiceTypeNames.RE_INSPECTION]: {
            base_time: {minutes: 30},
            base_sq_ft: 750,
            workRate: 0.06
        }
    },
    [PartTypes.REPORT_WRITING]: {
        [ServiceTypeNames.BUYERS_INSPECTION]: {
            base_time: {minutes: 30},
            base_sq_ft: 750,
            workRate: 0.06
        },
        [ServiceTypeNames.WALK_AND_TALK]: {
            base_time: {minutes: 30},
            base_sq_ft: 750,
            workRate: 0.06
        },
        [ServiceTypeNames.RE_INSPECTION]: {
            base_time: {minutes: 30},
            base_sq_ft: 750,
            workRate: 0.06
        },
    },
    [PartTypes.CLIENT_PRESENTATION]: {
        [ServiceTypeNames.BUYERS_INSPECTION]: {
            base_time: {minutes: 30},
            base_sq_ft: 800,
            workRate: 0.03
        },
        [ServiceTypeNames.WALK_AND_TALK]: {
            base_time: {minutes: 30},
            base_sq_ft: 800,
            workRate: 0.03
        },
        [ServiceTypeNames.RE_INSPECTION]: {
            base_time: {minutes: 30},
            base_sq_ft: 800,
            workRate: 0.03
        },
    }
}

export const DEFAULT_INCREMENT = 30;

export const DATA_COLLECTION_BASE_SQFT = 750;
export const REPORT_WRITING_BASE_SQFT = 750;
export const CLIENT_PRESENTATION_BASE_SQFT = 800;

export const DATA_COLLECTION_SQFT_RATE = 0.06;
export const REPORT_WRITING_SQFT_RATE = 0.06;
export const CLIENT_PRESENTATION_SQFT_RATE = 0.03;
