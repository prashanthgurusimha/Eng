// Uncomment to switch to the dev form definition
// const FORMIO_PROJECT_URL = `https://forms.pfmktech.com/dev-pzomgshprwfbtjx`;
const FORMIO_PROJECT_URL = `https://forms.pfmktech.com/pzomgshprwfbtjx`;
const LAYERS = ["1", "2", "3"];

const MSST_FORM_URL = `${FORMIO_PROJECT_URL}/masstort`;

// Use the minified JSON deployed from Git
let MSST_FORM_JSON_URL = 'resources/msst.min.json';


// Running in a local server, likely from an IntelliJ run configuration
// We have access to the notifier configurations in git, but we cannot save
const isLocal = () => {
    return window.location.host.startsWith('localhost');
}

// Running in the stage environment,
// Users have to be careful about which configuration they are editing
const isStage = () => {
    return window.location.pathname.startsWith('/stage/');
}

if (isLocal()) {
    // Use the un-minified form definition
    MSST_FORM_JSON_URL = '../../form-definitions/mass-tort/msst.json';
    // Uncomment to switch to the live form definition
    // MSST_FORM_JSON_URL = MSST_FORM_URL;
}

const PRODUCTS = [
    'afff',
    'babyFormula',
    'campLejeune',
    'cartiva',
    'cpap',
    'earplugs',
    'hairRelaxer',
    'herniaMesh',
    'pfas',
    'roundup',
    'storm',
    'talcum',
    'tylenol',
    'zantac',
];

// - stage config
let STAGE_CONFIG_NAME = {
    afff: 'msst-afff-stage',
    babyFormula: 'msst-formula-12',
    campLejeune: 'msst-camplejeune-stage',
    cartiva: 'msst-cartiva-stage',
    cpap: 'msst-cpap-2',
    earplugs: 'msst-earplugs-7',
    hairRelaxer: 'msst-hairrelaxer-stage',
    herniaMesh: 'msst-herniamesh-stage',
    pfas: 'msst-pfas-stage',
    roundup: 'msst-roundup-stage',
    storm: 'msst-storm-5',
    talcum: 'msst-talcum-stage',
    tylenol: 'msst-tylenol-stage',
    zantac: 'msst-zantac-6',
};

// - prod config
let PROD_CONFIG_NAME = {
    afff: 'msst-afff-2',
    babyFormula: 'msst-formula-12',
    campLejeune: 'msst-camplejeune-19',
    cartiva: 'msst-cartiva-2',
    cpap: 'msst-cpap-2',
    earplugs: 'msst-earplugs-7',
    hairRelaxer: 'msst-hairrelaxer-2',
    herniaMesh: 'msst-herniamesh-6',
    pfas: 'msst-pfas-1',
    roundup: 'msst-roundup-7',
    storm: 'msst-storm-5',
    talcum: 'msst-talcum-4',
    tylenol: 'msst-tylenol-1',
    zantac: 'msst-zantac-6',
};

const CONFIG_NAME = isStage()
    ? STAGE_CONFIG_NAME
    : PROD_CONFIG_NAME;

const CLIENT_MAPPINGS = [
    {
        "tort": "afff",
        "client": "gildeLawFirm",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant !== 'no'",
                "templateId": "5d36056470576d93f0c6d5988f69a2ff55d8e0b2",
                "fields": {
                    "signer_full_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_ssn": "getSSN(data.ssn)",
                    "fiduciary_party_relationship": "''",
                    "patient_name": "`${data.firstName} ${data.lastName}`",
                    "patient_dob": "data.dateofBirth",
                    "patient_ssn": "getSSN(data.ssn)",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'",
                "templateId": "5d36056470576d93f0c6d5988f69a2ff55d8e0b2",
                "fields": {
                    "signer_full_name": "`${data.afffFiduciaryName}`",
                    "signer_name_on_behalf_of": "`${data.afffFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_ssn": "getSSN(data.afffFiduciarySsn)",
                    "fiduciary_party_relationship": "data.afffFiduciaryPartyRelationship",
                    "patient_name": "`${data.firstName} ${data.lastName}`",
                    "patient_dob": "data.dateofBirth",
                    "patient_ssn": "getSSN(data.ssn)",
                }
            },
        ],
        "signingOptions": {
            "draw": "true",
            "type": "false",
            "upload": "false",
            "phone": "false",
            "default": "draw"
        },
    },
    {
        "tort": "afff",
        "client": "neeleyLitigationLaw",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant !== 'no'",
                "templateId": "46b05ddea16671a777d0767742e03ccc4dcce31f",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                    "signer_ssn": "getSSN(data.ssn)",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'",
                "templateId": "46b05ddea16671a777d0767742e03ccc4dcce31f",
                "fields": {
                    "signer_name": "`${data.afffFiduciaryName}`",
                    "signer_name_on_behalf_of": "`${data.afffFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.afffFiduciaryPartyRelationship",
                    "signer_ssn": "getSSN(data.afffFiduciarySsn)",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "phone": "data.actualPhoneNumber || data.phoneNumber",
            "email": "data.email",
            "day": "getDatePart('DD')",
            "month": "getDatePart('MMM')",
        }
    },
    {
        "tort": "afff",
        "client": "environmentalLitigationGroup",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant !== 'no'",
                "templateId": "d9f3c90e0023355b30f984f2adf017f8ed8b82ce",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                    "signer_ssn": "getSSN(data.ssn)",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'",
                "templateId": "d9f3c90e0023355b30f984f2adf017f8ed8b82ce",
                "fields": {
                    "signer_name": "`${data.afffFiduciaryName}`",
                    "signer_name_on_behalf_of": "`${data.afffFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.afffFiduciaryPartyRelationship",
                    "signer_ssn": "getSSN(data.afffFiduciarySsn)",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "day": "getDatePart('DD')",
            "month": "getDatePart('MMM')",
        }
    },
    {
        "tort": "afff",
        "client": "neeleyLawVelawcity",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant === 'yes' &&  data.afffUsedInThePastMilitary === 'no'",
                "templateId": "ffe98ea3aeb81705fe1c44e25883a93a5290d102",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'&& data.afffUsedInThePastMilitary === 'no'",
                "templateId": "43f07656c7c14c2b015c55d04c358e16d38e7258",
                "fields": {
                    "signer_name": "`${data.afffFiduciaryName}`",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'yes' && data.afffUsedInThePastMilitary === 'yes'",
                "templateId": "56da48396d0208a5253b102e6546ef9bafb5baed",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no' && data.afffUsedInThePastMilitary === 'yes'",
                "templateId": "8823026e7e7d52fd2b09a315ac56d285417e594e",
                "fields": {
                    "signer_name": "`${data.afffFiduciaryName}`",
                    "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "email": "data.email",
            "phone": "data.actualPhoneNumber || data.phoneNumber",
        },
        "signingOptions": {
            "draw": "true",
            "type": "false",
            "upload": "false",
            "phone": "false",
            "default": "draw"
        },
    },
    {
        "tort": "afff",
        "client": "donaldsonInjuryLawVelawcity",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant === 'yes' &&  data.afffUsedInThePastMilitary === 'no'",
                "templateId": "9ee1b6f4543cb03c7669cab6ac003ef53d3f926c",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "fiduciary_party_relationship": "",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'&& data.afffUsedInThePastMilitary === 'no'",
                "templateId": "9ee1b6f4543cb03c7669cab6ac003ef53d3f926c",
                "fields": {
                    "signer_name": "`${data.afffFiduciaryName}`",
                    "fiduciary_party_relationship": "data.afffFiduciaryPartyRelationship",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'yes' && data.afffUsedInThePastMilitary === 'yes'",
                "templateId": "a0197f1ebf048cb0f0966774181335665efe4607",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "fiduciary_party_relationship": "",
                    "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no' && data.afffUsedInThePastMilitary === 'yes'",
                "templateId": "a0197f1ebf048cb0f0966774181335665efe4607",
                "fields": {
                    "signer_name": "`${data.afffFiduciaryName}`",
                    "fiduciary_party_relationship": "data.afffFiduciaryPartyRelationship",
                    "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "email": "data.email",
            "phone": "data.actualPhoneNumber || data.phoneNumber",
        },
        "signingOptions": {
            "draw": "true",
            "type": "false",
            "upload": "false",
            "phone": "false",
            "default": "draw"
        },
    },
    {
        "tort": "afff",
        "client": "marcWhiteheadAssociates",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant !== 'no'",
                "templateId": "72972227497da170853c59db26909a68cceca0db",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                    "patient_name": "`${data.firstName} ${data.lastName}`",
                    "patient_dob": "data.dateofBirth",
                    "patient_ssn": "getSSN(data.ssn)",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'",
                "templateId": "72972227497da170853c59db26909a68cceca0db",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.afffFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.afffFiduciaryPartyRelationship",
                    "patient_name": "`${data.firstName} ${data.lastName}`",
                    "patient_dob": "data.dateofBirth",
                    "patient_ssn": "getSSN(data.ssn)",
                }
            },
        ]
    },
    {
        "tort": "afff",
        "client": "patronusNspr",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant !== 'no'",
                "templateId": "e258992d137381d81a7b916bfaa2ee8b2238a4b4",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "``",
                    "fiduciary_party_relationship": "``",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'",
                "templateId": "e258992d137381d81a7b916bfaa2ee8b2238a4b4",
                "fields": {
                    "signer_name": "data.afffFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.afffFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "data.afffFiduciaryName",
                    "fiduciary_party_relationship": "data.afffFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
        }
    },
    {
        "tort": "afff",
        "client": "nsprPatronus",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant !== 'no'",
                "templateId": "d980f1757e6209a2705cad9e6c9da7f3edd470ac",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "``",
                    "fiduciary_party_relationship": "``",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'",
                "templateId": "d980f1757e6209a2705cad9e6c9da7f3edd470ac",
                "fields": {
                    "signer_name": "data.afffFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.afffFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "data.afffFiduciaryName",
                    "fiduciary_party_relationship": "data.afffFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
        }
    },
    {
        "tort": "afff",
        "client": "ameenElgXSocial",
        "templates": [
            {
                "condition": "data.afffCallerIsClaimant !== 'no'",
                "templateId": "7dfd98e293ec4f933077ccb557c920fba110783a",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                }
            },
            {
                "condition": "data.afffCallerIsClaimant === 'no'",
                "templateId": "7dfd98e293ec4f933077ccb557c920fba110783a",
                "fields": {
                    "signer_name": "data.afffFiduciaryName",
                    "signer_party_relationship": "data.afffFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_name_first": "data.firstName",
            "patient_name_last": "data.lastName",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
        }
    },
    {
        "tort": "babyFormula",
        "client": "matthews",
        "templates": [
            {
                "condition": "true",
                "templateId": "e515c3418652dbc7afc478421829a1afa1a94749",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_dob": "data.dateofBirth",
                    "signer_ssn": "getSSN(data.ssn).slice(-4)",
                    "patient_name": "data.babyFormulaClaimantRelationship === 'self' ? `${data.firstName} ${data.lastName}` : `${data.babyFormulaClaimantFirstName} ${data.babyFormulaClaimantLastName}`",
                    "patient_dob": "data.babyFormulaClaimantRelationship === 'self' ? `${data.dateofBirth}` : `${data.babyFormulaClaimantDateOfBirth}`",
                    "patient_ssn": "getSSN(data.babyFormulaClaimantRelationship === 'self' ? `${data.ssn}` : `${data.babyFormulaClaimantSsn}`).slice(-4)",
                    "mother_name": "data.babyFormulaClaimantRelationship === 'mother' ? `${data.firstName} ${data.lastName}` : `${data.babyFormulaMotherFirstName} ${data.babyFormulaMotherLastName}`",
                    "mother_dob": "data.babyFormulaClaimantRelationship === 'mother' ? `${data.dateofBirth}` : `${data.babyFormulaMotherDateOfBirth}`",
                    "mother_ssn": "data.babyFormulaClaimantRelationship === 'mother' ? getSSN(data.ssn).slice(-4) : getSSN(data.babyFormulaMotherSsn).slice(-4)",
                    "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
                    "phone": "data.actualPhoneNumber || data.phoneNumber",
                }
            }
        ],
    },
    {
        "tort": "campLejeune",
        "client": "formanLaw",
        "templates": [
            {
                "condition": "data?.campLejeuneMilitaryService === 'no' && data?.campLejeuneCallerIsClaimant === 'yes'",
                "templateId": "06a80af4244defdf49204043b019f548a96a3bb1",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                }
            },
            {
                "condition": "data?.campLejeuneMilitaryService === 'no' && data?.campLejeuneCallerIsClaimant === 'no'",
                "templateId": "06a80af4244defdf49204043b019f548a96a3bb1",
                "fields": {
                    "signer_name": "data.campLejeuneFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.campLejeuneFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.campLejeuneFiduciaryPartyRelationship",
                }
            },
            {
                "condition": "data?.campLejeuneMilitaryService === 'yes' && data?.campLejeuneCallerIsClaimant === 'yes'",
                "templateId": "39e5914317d37b47d93bed143f75c3a95d6450a6",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
                }
            },
            {
                "condition": "data?.campLejeuneMilitaryService === 'yes' && data?.campLejeuneCallerIsClaimant === 'no'",
                "templateId": "517b74c228ccbb7b9da83967193fd4d71443f4d1",
                "fields": {
                    "signer_name": "`${data.campLejeuneFiduciaryName}`",
                    "signer_name_on_behalf_of": "`${data.campLejeuneFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.campLejeuneFiduciaryPartyRelationship",
                    "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "address_str": "`${data.address}`",
            "address_csz": "`${data.city}, ${data.state}, ${data.zipcode}`",
            "phone": "data.actualPhoneNumber || data.phoneNumber",
            "email": "data.email",
        },
    },
    {
        "tort": "campLejeune",
        "client": "formanLawMrsb",
        "templates": [
            {
                "condition": "data?.campLejeuneCallerIsClaimant === 'yes'",
                "templateId": "20bad5e4b58392ddfa7502740c14146b67a57b90",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                }
            },
            {
                "condition": "data?.campLejeuneCallerIsClaimant === 'no'",
                "templateId": "27d0e969ec1931325324a293e8ebe99e820a41c3",
                "fields": {
                    "signer_name": "data.campLejeuneFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.campLejeuneFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.campLejeuneFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "phone": "data.actualPhoneNumber || data.phoneNumber",
            "email": "data.email",
        },
    },
    {
        "tort": "campLejeune",
        "client": "mrsbRdpLaw",
        "templates": [
            {
                "condition": "data?.campLejeuneCallerIsClaimant === 'yes'",
                "templateId": "f8f0157ddae902aefb1b428d088d29cf55d57f77",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                }
            },
            {
                "condition": "data?.campLejeuneCallerIsClaimant === 'no'",
                "templateId": "070ebbacaeae28a1161cf51970944504b1c20455",
                "fields": {
                    "signer_name": "data.campLejeuneFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.campLejeuneFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.campLejeuneFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "phone": "data.actualPhoneNumber || data.phoneNumber",
            "email": "data.email",
        },
        "split": {
            "Retainer": "1--1"
        }
    },
    {
        "tort": "campLejeune",
        "client": "rosenbergMrsb",
        "templates": [
            {
                "condition": "data?.campLejeuneCallerIsClaimant === 'yes'",
                "templateId": "b3e7284c823c37ed90238117615bd8b8350ed40c",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                }
            },
            {
                "condition": "data?.campLejeuneCallerIsClaimant === 'no'",
                "templateId": "17dc4f5c20542166e5a48860f57d1aad55071e42",
                "fields": {
                    "signer_name": "data.campLejeuneFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.campLejeuneFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.campLejeuneFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_name_lfm": "`${data.lastName} ${data.firstName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "phone": "data.phoneNumber",
            "email": "data.email",
        },
    },
    {
        "tort": "cartiva",
        "client": "milbergGrossman",
        "templates": [
            {
                "condition": "true",
                "templateId": "78abad7c01dcd77d6c27e91d2ae7e30503c9fc2d",
                "fields": {
                    "signer_full_name": "data.cartivaCallerIsClaimant !== 'no' ? `${data.firstName} ${data.lastName}` : data.cartivaFiduciaryName",
                    "fiduciary_party_relationship": "data.cartivaCallerIsClaimant !== 'no' ? '' : data.cartivaFiduciaryPartyRelationship",
                    "patient_name": "`${data.firstName} ${data.lastName}`",
                    "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
                    "dob": "data.dateofBirth",
                    "ssn": "getSSN(data.ssn)",
                    "ssn-4d": "getSSN(data.ssn).slice(-4)"
                }
            }
        ]
    },
    {
        "tort": "hairRelaxer",
        "client": "formanLaw",
        "templates": [
            {
                "condition": "data.hairRelaxerCallerIsClaimant !== 'no'",
                "templateId": "103e53f8518ebfdb100e9055861bf8838cb1aacb",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`"
                }
            },
            {
                "condition": "data.hairRelaxerCallerIsClaimant === 'no'",
                "templateId": "103e53f8518ebfdb100e9055861bf8838cb1aacb",
                "fields": {
                    "signer_name": "`${data.hairRelaxerFiduciaryName}`",
                    "signer_name_on_behalf_of": "`${data.hairRelaxerFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`"
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "address_str": "`${data.address}`",
            "address_csz": "`${data.city}, ${data.state}, ${data.zipcode}`",
            "phone": "data.actualPhoneNumber || data.phoneNumber",
            "email": "data.email",
            "day": "getDatePart('DD')",
            "month": "getDatePart('MMMM')"
        }
    },
    {
        "tort": "hairRelaxer",
        "client": "shraderAssociates",
        "templates": [
            {
                "condition": "data.hairRelaxerCallerIsClaimant !== 'no'",
                "templateId": "6a93b09ddf90e712234602c34543d613d856a91b",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`"
                }
            },
            {
                "condition": "data.hairRelaxerCallerIsClaimant === 'no'",
                "templateId": "68eea4701e630c165bd54e26a72194527c151c89",
                "fields": {
                    "signer_name": "data.hairRelaxerFiduciaryName",
                    "signer_name_relationship": "`${data.hairRelaxerFiduciaryName} - ${data.hairRelaxerFiduciaryPartyRelationship}`"
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)"
        },
        "split": {
            "Retainer": "1-4",
            "Hitech": "5-6",
            "Hipaa": "7-8",
            "Sml": "9-11"
        }
    },
    {
        "tort": "hairRelaxer",
        "client": "bigHornLaw",
        "templates": [
            {
                "condition": "data?.hairRelaxerIsClaimantDeceased === 'no' && data?.hairRelaxerCallerIsClaimant === 'yes'",
                "templateId": "5a7a17d39fe0a58d85565f0877d11aa004a1de7b",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`"
                }
            },
            {
                "condition": "data?.hairRelaxerIsClaimantDeceased === 'no' && data?.hairRelaxerCallerIsClaimant === 'no'",
                "templateId": "5a7a17d39fe0a58d85565f0877d11aa004a1de7b",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.hairRelaxerFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                }
            },
            {
                "condition": "data?.hairRelaxerIsClaimantDeceased === 'yes'",
                "templateId": "519cf998ccee94c5ec16ade74b73a7454f3d012e",
                "fields": {
                    "signer_name": "data.hairRelaxerFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.hairRelaxerFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                },
            }
        ],
        "fields": {
            "phone": "data.phoneNumber",
            "email": "data.email",
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "street": "data.address",
            "address": "`${data.city}, ${data.state}, ${data.zipcode}`"
        }
    },
    {
        "tort": "hairRelaxer",
        "client": "dicelloLevitt",
        "templates": [
            {
                "condition": "data.hairRelaxerCallerIsClaimant !== 'no'",
                "templateId": "b2750bb021c47e930c02bd3cfafffcf5e880305f",
                "fields": {
                    "signer_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_name": "`${data.firstName} ${data.lastName}`"
                }
            },
            {
                "condition": "data.hairRelaxerCallerIsClaimant === 'no'",
                "templateId": "b2750bb021c47e930c02bd3cfafffcf5e880305f",
                "fields": {
                    "signer_on_behalf_of": "`${data.hairRelaxerFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_name": "`${data.hairRelaxerFiduciaryName}`"
                }
            }
        ],
        "fields": {
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "phone": "data.actualPhoneNumber || data.phoneNumber"
        },
        "split": {
            "Retainer": "1-4",
            "Hipaa": "5",
            "Hitech": "6"
        }
    },
    {
        "tort": "herniaMesh",
        "client": "rdpLawGroup",
        "templates": [
            {
                "condition": "true",
                "templateId": "251e5e897e4d34001d25fb614c65cdb1b5dade66",
                "fields": {
                    "signer_full_name": "data.herniaMeshCallerIsClaimant !== 'no' ? `${data.firstName} ${data.lastName}` : data.herniaMeshFiduciaryName",
                    "fiduciary_party_relationship": "data.herniaMeshCallerIsClaimant !== 'no' ? '' : data.herniaMeshFiduciaryPartyRelationship",
                    "patient_name": "`${data.firstName} ${data.lastName}`",
                    "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
                    "dob": "data.dateofBirth",
                    "ssn": "getSSN(data.ssn)",
                    "ssn-4d": "getSSN(data.ssn).slice(-4)"
                }
            }
        ],
    },
    {
        "tort": "pfas",
        "client": "patronusNspr",
        "templates": [
            {
                "condition": "data.pfasCallerIsClaimant !== 'no'",
                "templateId": "3be076a317a5ac770eb776a0f2a795a478f22c5c",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "``",
                    "fiduciary_party_relationship": "``",
                }
            },
            {
                "condition": "data.pfasCallerIsClaimant === 'no'",
                "templateId": "3be076a317a5ac770eb776a0f2a795a478f22c5c",
                "fields": {
                    "signer_name": "data.pfasFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.pfasFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "data.pfasFiduciaryName",
                    "fiduciary_party_relationship": "data.pfasFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
        }
    },
    {
        "tort": "pfas",
        "client": "nsprPatronus",
        "templates": [
            {
                "condition": "data.pfasCallerIsClaimant !== 'no'",
                "templateId": "eec9380cdb1cf8c481d3b9712f96f3e7bd81ef5d",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "``",
                    "fiduciary_party_relationship": "``",
                }
            },
            {
                "condition": "data.pfasCallerIsClaimant === 'no'",
                "templateId": "eec9380cdb1cf8c481d3b9712f96f3e7bd81ef5d",
                "fields": {
                    "signer_name": "data.pfasFiduciaryName",
                    "signer_name_on_behalf_of": "`${data.pfasFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "data.pfasFiduciaryName",
                    "fiduciary_party_relationship": "data.pfasFiduciaryPartyRelationship",
                }
            },
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
        }
    },
    {
        "tort": "roundup",
        "client": "ameenLawVelawcity",
        "templates": [
            {
                "condition": "data.roundupCallerIsClaimant !== 'no'",
                "templateId": "9adcb4e5b6ad820ffbd0e89f48bdb50a43e9681e",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                }
            },
            {
                "condition": "data.roundupCallerIsClaimant === 'no'",
                "templateId": "9adcb4e5b6ad820ffbd0e89f48bdb50a43e9681e",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.roundupFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
        },
        "signingOptions": {
            "draw": "true",
            "type": "false",
            "upload": "false",
            "phone": "false",
            "default": "draw"
        }
    },
    {
        "tort": "roundup",
        "client": "milbergGrossman",
        "templates": [
            {
                "condition": "data.roundupCallerIsClaimant !== 'no'",
                "templateId": "b357427c5dcfcd539bf6041d733e9a26b783d700",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "fiduciary_name": "''",
                    "signer_party_relationship": "''",
                }
            },
            {
                "condition": "data.roundupCallerIsClaimant === 'no'",
                "templateId": "b357427c5dcfcd539bf6041d733e9a26b783d700",
                "fields": {
                    "signer_name": "data.roundupFiduciaryName",
                    "fiduciary_name": "data.roundupFiduciaryName",
                    "signer_party_relationship": "data.roundupFiduciaryPartyRelationship",
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "patient_ssn-4d": "getSSN(data.ssn).slice(-4)"
        }
    },
    {
        "tort": "roundup",
        "client": "klineSpecterBridgeLegal",
        "templates": [
            {
                "condition": "data.roundupCallerIsClaimant !== 'no'",
                "templateId": "408f938467e7d240896dfdcf0d74b01c79a9e7c7",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                }
            },
            {
                "condition": "data.roundupCallerIsClaimant === 'no'",
                "templateId": "408f938467e7d240896dfdcf0d74b01c79a9e7c7",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.roundupFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.roundupFiduciaryPartyRelationship",
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
        }
    },
    {
        "tort": "roundup",
        "client": "donaldsonInjuryLaw",
        "templates": [
            {
                "condition": "data.roundupCallerIsClaimant !== 'no'",
                "templateId": "dbb0a9a43d7f68f156a23055b131ddb2dc886bd8",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                }
            },
            {
                "condition": "data.roundupCallerIsClaimant === 'no'",
                "templateId": "dbb0a9a43d7f68f156a23055b131ddb2dc886bd8",
                "fields": {
                    "signer_name_on_behalf_of": "`${data.roundupFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
        },
        "signingOptions": {
            "draw": "true",
            "type": "false",
            "upload": "false",
            "phone": "false",
            "default": "draw"
        },
    },
    {
        "tort": "roundup",
        "client": "ksPatronus",
        "templates": [
            {
                "condition": "data.roundupCallerIsClaimant !== 'no'",
                "templateId": "e40b9e79004972c82c6cf743dc9dbf314d001fd6",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                }
            },
            {
                "condition": "data.roundupCallerIsClaimant === 'no'",
                "templateId": "e40b9e79004972c82c6cf743dc9dbf314d001fd6",
                "fields": {
                    "signer_name": "`${data.roundupFiduciaryName}`",
                    "signer_name_on_behalf_of": "`${data.roundupFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
        }
    },
    {
        "tort": "roundup",
        "client": "patronusKs",
        "templates": [
            {
                "condition": "data.roundupCallerIsClaimant !== 'no'",
                "templateId": "a954c89ddbe42c1bb8b0b813e51e0d1904915a45",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                }
            },
            {
                "condition": "data.roundupCallerIsClaimant === 'no'",
                "templateId": "a954c89ddbe42c1bb8b0b813e51e0d1904915a45",
                "fields": {
                    "signer_name": "`${data.roundupFiduciaryName}`",
                    "signer_name_on_behalf_of": "`${data.roundupFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)",
            "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
        }
    },
    {
        "tort": "storm",
        "client": "mcClennyMoseley",
        "templates": [
            {
                "condition": "true",
                "templateId": "4c5498748e5f05c822a56b44094671705851a16a",
                "fields": {
                    "signer_full_name": "`${data.firstName} ${data.lastName}`",
                    "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
                    "phone": "data.actualPhoneNumber || data.phoneNumber",
                    "phone_alt": "data.alternativePhoneNumber",
                    "email": "data.email",
                    "storm_name": "'Hurricane Ian'",
                    "loss_address": "`${data.stormPropertyLossAddress}, ${data.stormPropertyLossCity}, ${data.stormPropertyLossState}, ${data.stormPropertyLossZip}`",
                    "loss_date": "data.stormPropertyLossDate",
                    "ins_provider": "data.stormInsuranceClaimNumber",
                    "ins_policy_number": "data.stormInsurancePolicyNumber",
                    "ins_claim_number": "data.stormInsuranceProvider",
                }
            }
        ]
    },
    {
        "tort": "storm",
        "client": "awdLaw",
        "templates": [
            {
                "condition": "true",
                "templateId": "e82853de24ea6b78b304b0512cffd679935fa312",
                "fields": {
                    "signer_full_name": "`${data.firstName} ${data.lastName}`",
                    "address": "`${data.address}, ${data.city}, ${data.state}, ${data.zipcode}`",
                    "phone": "data.actualPhoneNumber || data.phoneNumber",
                    "phone_alt": "data.alternativePhoneNumber",
                    "email": "data.email",
                    "storm_name": "'Hurricane Ian'",
                    "loss_address": "`${data.stormPropertyLossAddress}, ${data.stormPropertyLossCity}, ${data.stormPropertyLossState}, ${data.stormPropertyLossZip}`",
                    "loss_date": "data.stormPropertyLossDate",
                    "ins_provider": "data.stormInsuranceClaimNumber",
                    "ins_policy_number": "data.stormInsurancePolicyNumber",
                    "ins_claim_number": "data.stormInsuranceProvider",
                }
            }
        ]
    },
    {
        "tort": "talcum",
        "client": "onderLaw",
        "templates": [
            {
                "condition": "data.talcumCallerIsClaimant !== 'no'",
                "templateId": "c63c4f07cceb04b9eac1c2d51f7f1351b8b6ae8c",
                "fields": {
                    "signer_dob": "data.dateofBirth",
                    "signer_name_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "''",
                    "signer_ssn": "getSSN(data.ssn)",
                }
            },
            {
                "condition": "data.talcumCallerIsClaimant === 'no'",
                "templateId": "c63c4f07cceb04b9eac1c2d51f7f1351b8b6ae8c",
                "fields": {
                    "signer_dob": "data.talcumFiduciaryDateOfBirth",
                    "signer_name_on_behalf_of": "`${data.talcumFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.talcumFiduciaryPartyRelationship",
                    "signer_ssn": "getSSN(data.talcumFiduciarySsn)",
                }
            }
        ],
        "fields": {
            "patient_dob": "data.dateofBirth",
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_ssn": "getSSN(data.ssn)",
            "day": "getDatePart('DD')",
            "month": "getDatePart('MMMM')",
            "year-2d": "getDatePart('YY')"
        },
        "split": {
            "Retainer": "1--1"
        },
        "signingOptions": {
            "draw": "true",
            "type": "false",
            "upload": "false",
            "phone": "false",
            "default": "draw"
        },
    },
    {
        "tort": "tylenol",
        "client": "kershawTalleyBarlow",
        "templates": [
            {
                "condition": "data?.tylenolCallerIsClaimant === 'yes'",
                "templateId": "92659e5091d4934c6398cc5013d17392c7bd30d4",
                "fields": {
                    "signer_name": "`${data.firstName} ${data.lastName}`",
                    "signer_on_behalf_of": "`${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": ""
                }
            },
            {
                "condition": "data?.tylenolCallerIsClaimant === 'no'",
                "templateId": "92659e5091d4934c6398cc5013d17392c7bd30d4",
                "fields": {
                    "signer_name": "data.tylenolFiduciaryName",
                    "signer_on_behalf_of": "`${data.tylenolFiduciaryName} on behalf of ${data.firstName} ${data.lastName}`",
                    "signer_party_relationship": "data.tylenolFiduciaryPartyRelationship"
                }
            }
        ],
        "fields": {
            "patient_name": "`${data.firstName} ${data.lastName}`",
            "patient_dob": "data.dateofBirth",
            "patient_ssn": "getSSN(data.ssn)"
        }
    },
];

// Build a mapping of the current clients based on Hellosign mapping, TODO: find a better way of doing this.
const TORT_CLIENT_MAPPING = new Map();
CLIENT_MAPPINGS.forEach(c => {
    let set = TORT_CLIENT_MAPPING.get(c.tort) || new Set();
    set.add(c.client)
    TORT_CLIENT_MAPPING.set(c.tort, set);
});

function getSplitRequest(data, tortName, client) {
    let clientConf = CLIENT_MAPPINGS.find(x => x.tort === tortName && x.client === client);
    let templates = clientConf?.templates;
    if (templates) {
        let split = templates?.find(x => eval(x.condition))?.split;
        if (split) {
            return split;
        }
    }
    return clientConf?.split;
}

const ACCEPTED_FIELD_VALUES = [
    {
        // Accepting clients update steps:
        // 1. Save the latest Camp Lejeune criteria
        //    from https://docs.google.com/spreadsheets/d/1kuhsk71qoe-jRJvMXqpP4hS9wvXHR4OZa4inGSWiFWw/edit#gid=830166393
        //    as specs/mass-tort/torts/camp lejeune/Criteria for Mass Tort - Camp Lejeune.csv
        // 2. In the jurnify project, run `just camplejeune-extract-accepted-diagnoses`
        // 3. Open backend/java/crm-api/src/main/resources/camplejeune-diagnosis-mappings.json
        //    and copy the "acceptedValues" (acceptingClients) mapping here

        fields: "campLejeuneDiagnosisInjury,campLejeuneDiagnosisInjuryNeuro",
        acceptedValues: {
            "alsAmyotrophicLateralSclerosis": "",
            "alzheimersDisease": "",
            "acuteMyeloidLeukemiaAml": "",
            "aplasticAnemia": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "autoImmuneDiseases": "",
            "bileDuctCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "bladderCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "brainCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "breastCancerFemale": "",
            "maleBreastCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "birthDefects": "",
            "centralNervousSystemCancerCns": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "cervicalCancer": "",
            "colonCancer": "",
            "epilepsy": "",
            "esophagealCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "femaleInfertility": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "gallbladderCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "hepaticSteatosisFattyLiverDisease": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "hodgkinsLymphoma": "",
            "hypersensitivitySkinDisorder": "",
            "immuneDisorders": "",
            "intestinalCancer": "",
            "kidneyCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "chronicKidneyDiseaseStage1": "",
            "chronicKidneyDiseaseStage2": "",
            "chronicKidneyDiseaseStage3": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "chronicKidneyDiseaseStage4": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "endStageRenalDiseaseDialysisKidneyFailure": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "acuteKidneyInjury": "",
            "kidneyStones": "",
            "otherKidneyDamage": "",
            "leukemia": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "liverCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "lungCancer": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "miscarriageWhileAtCampLejeune": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "miscarriageNotInCampLejeune": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "multipleMyeloma": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "multipleSclerosis": "",
            "myelodysplasticSyndromes": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "nerveDamage": "",
            "nonHodgkinsLymphoma": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "ovarianCancer": "",
            "pancreaticCancer": "",
            "parkinsonism": "",
            "parkinsonsDisease": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "pelvicCancer": "",
            "prostateCancer": "",
            "rectalCancer": "",
            "renalToxicity": "formanLawMrsb,mrsbRdpLaw,rosenbergMrsb",
            "scleroderma": "",
            "systemicSclerosis": "",
            "sinusCancer": "",
            "skinCancer": "",
            "softTissueSarcoma": "",
            "spinalCancer": "",
            "stomachCancer": "",
            "thyroidCancer": "",
            "uterineCancer": "",
            "anxiety": "",
            "attentionOrConcentrationProblems": "",
            "cognitiveDisability": "",
            "delayedReactionTimes": "",
            "depression": "",
            "dizziness": "",
            "essentialTremor": "",
            "fatigue": "",
            "insomnia": "",
            "involuntaryMuscleMovementsDystoniaOrDyskinesia": "",
            "learningDisorders": "",
            "memoryProblems": "",
            "motorProblemsBalanceCoordinationEtc": "",
            "tremors": "",
            "noneOfTheAbove": "_"
        }
    },
];

const STATE_CODES = {
    "alabama": "AL",
    "alaska": "AK",
    "arizona": "AZ",
    "arkansas": "AR",
    "california": "CA",
    "colorado": "CO",
    "connecticut": "CT",
    "delaware": "DE",
    "districtofColumbia": "DC",
    "florida": "FL",
    "georgia": "GA",
    "hawaii": "HI",
    "idaho": "ID",
    "illinois": "IL",
    "indiana": "IN",
    "iowa": "IA",
    "kansas": "KS",
    "kentucky": "KY",
    "louisiana": "LA",
    "maine": "ME",
    "maryland": "MD",
    "massachusetts": "MA",
    "michigan": "MI",
    "minnesota": "MN",
    "mississippi": "MS",
    "missouri": "MO",
    "montana": "MT",
    "nebraska": "NE",
    "nevada": "NV",
    "newHampshire": "NH",
    "newJersey": "NJ",
    "newMexico": "NM",
    "newYork": "NY",
    "northCarolina": "NC",
    "northDakota": "ND",
    "ohio": "OH",
    "oklahoma": "OK",
    "oregon": "OR",
    "pennsylvania": "PA",
    "rhodeIsland": "RI",
    "southCarolina": "SC",
    "southDakota": "SD",
    "tennessee": "TN",
    "texas": "TX",
    "utah": "UT",
    "vermont": "VT",
    "virginia": "VA",
    "washington": "WA",
    "westVirginia": "WV",
    "wisconsin": "WI",
    "wyoming": "WY"
};

const STATE_SOL = {
    "AL": 2,
    "AK": 2,
    "AZ": 2,
    "AR": 3,
    "CA": 2,
    "CO": 2,
    "CT": 2,
    "DE": 2,
    "DC": 3,
    "FL": 4,
    "GA": 2,
    "HI": 2,
    "ID": 2,
    "IL": 2,
    "IN": 2,
    "IA": 2,
    "KS": 2,
    "KY": 1,
    "LA": 1,
    "ME": 6,
    "MD": 3,
    "MA": 3,
    "MI": 3,
    "MN": 2,
    "MS": 3,
    "MO": 5,
    "MT": 3,
    "NE": 4,
    "NV": 2,
    "NH": 3,
    "NJ": 2,
    "NM": 3,
    "NY": 3,
    "NC": 3,
    "ND": 2,
    "OH": 2,
    "OK": 2,
    "OR": 2,
    "PA": 2,
    "RI": 3,
    "SC": 3,
    "SD": 3,
    "TN": 1,
    "TX": 2,
    "UT": 4,
    "VT": 3,
    "VA": 2,
    "WA": 3,
    "WV": 2,
    "WI": 3,
    "WY": 4
};

const stateCode = (state) => {
    if (!state) {
        return '';
    }
    let code = STATE_CODES[state];
    return code ? code : state.toUpperCase();
};

const stateSolYears = (state) => {
    if (!state) {
        return '';
    }
    let code = stateCode(state);
    return STATE_SOL[code];
};

const stateSOL = (state) => {
    let years = stateSolYears(state);
    return years ? `${years} years` : '';
};

const formatPhoneValue = (phone) => {
    return phone && phone.replace(/\D/g, '').padStart(10, '0')?.slice(-10) || '';
};

const md5 = (value) => {
    return CryptoJS.MD5(value).toString();
};

const getDateTimePT = (date = new Date()) => {
    return date.toLocaleString("en-US", {
        timeZone: 'America/Los_Angeles',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

// Function used in the HelloSign field definitions
function getDatePart(part, date = new Date()) {
    let options = {
        timeZone: 'America/Los_Angeles',
    };
    switch (part) {
        case 'DD':
            options.day = '2-digit';
            break;
        case 'MM':
            options.month = '2-digit';
            break;
        case 'MMM':
            options.month = 'short';
            break;
        case 'MMMM':
            options.month = 'long';
            break;
        case 'YY':
            options.year = '2-digit';
            break;
        case 'YYYY':
            options.year = '4-digit';
            break;
        default:
            throw Error(`Invalid date part: ${part}`);
    }
    return new Date(Date.parse(date)).toLocaleString("en-US", options);
}

// Function used in the HelloSign field definitions
const splitFirstName = (firstName) => {
    let trimmed = firstName.trim();
    let i = trimmed.indexOf(' ');
    if (i < 0) {
        return [trimmed, ''];
    } else {
        return [trimmed.substring(0, i), trimmed.substring(i + 1)]
    }
};

const encrypt = (phone) => {
    let encrypted = '';

    if (/\d{10}/.test(phone)) {
        let hash = CryptoJS.MD5(phone).toString();
        let replacer = getEncryptValue(phone);
        for (let i = 0; i < hash.length; i++) {
            let charAt;
            if (i % 2 !== 0) {
                charAt = replacer.charAt(i / 2);
            }

            if (!charAt) {
                charAt = hash.charAt(i);
            }

            encrypted += charAt;
        }
    }

    return encrypted;
}

// 10 digit phone
const getEncryptValue = (phone) => {
    return `hash${phone}`;
}


function addAutocomplete(id, arr) {
    let element = document.getElementById(`${currentForm?.getComponent(id)?.id}-${id}`);
    if (element && element.getAttribute('listener') !== 'true') {
        element.setAttribute('listener', 'true');
        autocomplete(id, element, arr);
    }
}

function autocomplete(id, inp, arr) {
    /* the autocomplete function takes two arguments, the text field element and an array of possible autocompleted values: */
    let currentFocus;
    /* execute a function when someone writes in the text field: */
    inp.addEventListener("input", function (e) {
        let filterValue = this.value;
        /* close any already open lists of autocompleted values */
        closeAllLists();
        if (!filterValue) {
            return false;
        }
        currentFocus = -1;
        /* create a DIV element that will contain the items (values): */
        let a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /* append the DIV element as a child of the autocomplete container: */
        this.parentNode.appendChild(a);
        let filterWords = filterValue.replaceAll(/[^A-Aa-z0-9 ]/g, '').trim().split(/ /);
        // https://regex101.com/r/CPNu4y/1
        let filterRegExp = new RegExp(`^(?=.*?(${filterWords.join('))(?=.*?(')})).*$`, 'i');
        let wordsRegExp = new RegExp(`(${filterWords.join('|')})`, 'ig');

        /* for each item in the array... */
        for (let i = 0; i < arr.length; i++) {
            /* find matching values from the options list: */
            let arrValue = arr[i];
            if (filterRegExp.test(arrValue)) {
                /* create a DIV element for each matching element: */
                let b = document.createElement("DIV");
                /* make the matching letters bold: */
                b.innerHTML = arrValue.replaceAll(wordsRegExp, '<strong>$1</strong>');

                /* insert a input field that will hold the current array item's value: */
                b.innerHTML += "<input type='hidden' value='" + arrValue + "'>";
                /* execute a function when someone clicks on the item value (DIV element): */
                b.addEventListener("click", function (e) {
                    /* insert the value for the autocomplete text field: */
                    setCompValue(id, this.getElementsByTagName("input")[0].value);
                    /* close the list of autocompleted values, (or any other open lists of autocompleted values: */
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /* execute a function presses a key on the keyboard: */
    inp.addEventListener("keydown", function (e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            /* If the arrow DOWN key is pressed, increase the currentFocus variable: */
            currentFocus++;
            /* and make the current item more visible: */
            addActive(x);
        } else if (e.keyCode === 38) {
            /* If the arrow UP key is pressed, decrease the currentFocus variable: */
            currentFocus--;
            /* and make the current item more visible: */
            addActive(x);
        } else if (e.keyCode === 13) {
            /* If the ENTER key is pressed, prevent the form from being submitted, */
            e.preventDefault();
            if (currentFocus > -1) {
                /* and simulate a click on the "active" item: */
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /* a function to classify an item as "active": */
        if (!x) return false;
        /* start by removing the "active" class on all items: */
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /* add class "autocomplete-active": */
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /* a function to remove the "active" class from all autocomplete items: */
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /* close all autocomplete lists in the document, except the one passed as an argument: */
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /* execute a function when someone clicks in the document: */
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}
