using OnboardingService as service from '../../srv/onboarding-service';
annotate service.OnboardingRequests with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Employeename}',
                Value : employeeName,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Personalemail}',
                Value : personalEmail,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Department}',
                Value : department,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Role}',
                Value : role,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Startdate}',
                Value : startDate,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Status}',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Hrmanagernote}',
                Value : hrManagerNote,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Itassetsnote}',
                Value : itAssetsNote,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Deptheadnote}',
                Value : deptHeadNote,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Processinstanceid}',
                Value : processInstanceId,
            },
            {
                $Type : 'UI.DataField',
                Value : accessCardRequired,
            },
            {
                $Type : 'UI.DataField',
                Value : laptopRequired,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Employeename}',
            Value : employeeName,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Personalemail}',
            Value : personalEmail,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Department}',
            Value : department,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Role}',
            Value : role,
        },
        {
            $Type : 'UI.DataField',
            Value : status,
        },
        {
            $Type : 'UI.DataField',
            Label : '{i18n>Startdate}',
            Value : startDate,
        },
        {
            $Type : 'UI.DataField',
            Value : hrManagerNote,
        },
    ],
);

annotate service.OnboardingRequests with {
    status @Common.FieldControl : #ReadOnly
};

annotate service.OnboardingRequests with {
    personalEmail @Common.FieldControl : #Mandatory
};

annotate service.OnboardingRequests with {
    processInstanceId @Common.FieldControl : #ReadOnly
};

annotate service.OnboardingRequests with {
    employeeName @Common.FieldControl : #Mandatory
};

annotate service.OnboardingRequests with {
    department @Common.FieldControl : #Mandatory
};

annotate service.OnboardingRequests with {
    startDate @Common.FieldControl : #Mandatory
};

annotate service.OnboardingRequests with {
    role @Common.FieldControl : #Mandatory
};

annotate service.OnboardingRequests with {
    hrManagerNote @(
        UI.MultiLineText : true,
        Common.FieldControl : #ReadOnly,
    )
};

