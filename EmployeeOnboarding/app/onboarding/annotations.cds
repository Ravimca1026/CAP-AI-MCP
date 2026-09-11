using OnboardingService as service from '../../srv/onboarding-service';
annotate service.OnboardingRequests with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'employeeName',
                Value : employeeName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'employeeEmail',
                Value : employeeEmail,
            },
            {
                $Type : 'UI.DataField',
                Label : 'department',
                Value : department,
            },
            {
                $Type : 'UI.DataField',
                Label : 'role',
                Value : role,
            },
            {
                $Type : 'UI.DataField',
                Label : 'startDate',
                Value : startDate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'laptopRequired',
                Value : laptopRequired,
            },
            {
                $Type : 'UI.DataField',
                Label : 'accessCardRequired',
                Value : accessCardRequired,
            },
            {
                $Type : 'UI.DataField',
                Label : 'remarks',
                Value : remarks,
            },
            {
                $Type : 'UI.DataField',
                Label : 'status',
                Value : status,
            },
            {
                $Type : 'UI.DataField',
                Label : 'createdAt',
                Value : createdAt,
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
            Label : 'employeeName',
            Value : employeeName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'employeeEmail',
            Value : employeeEmail,
        },
        {
            $Type : 'UI.DataField',
            Label : 'department',
            Value : department,
        },
        {
            $Type : 'UI.DataField',
            Label : 'role',
            Value : role,
        },
        {
            $Type : 'UI.DataField',
            Label : 'startDate',
            Value : startDate,
        },
    ],
);

