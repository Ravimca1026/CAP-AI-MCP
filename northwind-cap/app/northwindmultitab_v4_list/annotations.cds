using NorthwindService as service from '../../srv/service';
annotate service.Categories1 with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'CategoryID',
                Value : CategoryID,
            },
            {
                $Type : 'UI.DataField',
                Label : 'CategoryName',
                Value : CategoryName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : Description,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Picture',
                Value : Picture,
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
            Label : 'CategoryID',
            Value : CategoryID,
        },
        {
            $Type : 'UI.DataField',
            Label : 'CategoryName',
            Value : CategoryName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Description',
            Value : Description,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Picture',
            Value : Picture,
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Category',
    },
);

annotate service.Categories with @(

    UI.HeaderInfo : {
        TypeName       : 'Category',
        TypeNamePlural : 'Categories',
        Title          : { $Type : 'UI.DataField', Value : CategoryName },
        Description    : { $Type : 'UI.DataField', Value : Description },
    },

    UI.Facets : [
        // ── Tab 1: Category Details ──────────────────────────
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'CategoryInfoFacet',
            Label  : 'Category Info',
            Target : '@UI.FieldGroup#CategoryDetails',
        },
        // ── Tab 2: Products table ────────────────────────────
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'ProductsFacet',
            Label  : 'Products',
            Target : 'Products/@UI.LineItem',   // ← navigation to Products
        },
    ],

    UI.FieldGroup #CategoryDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            { $Type : 'UI.DataField', Value : CategoryID,   Label : 'Category ID' },
            { $Type : 'UI.DataField', Value : CategoryName, Label : 'Category Name' },
            { $Type : 'UI.DataField', Value : Description,  Label : 'Description' },
        ],
    },

    UI.LineItem : [
        { $Type : 'UI.DataField', Value : CategoryID,   Label : 'Category ID' },
        { $Type : 'UI.DataField', Value : CategoryName, Label : 'Category Name' },
        { $Type : 'UI.DataField', Value : Description,  Label : 'Description' },
    ],

    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type          : 'UI.PresentationVariantType',
            Visualizations : [ '@UI.LineItem' ],
        },
        SelectionVariant : {
            $Type         : 'UI.SelectionVariantType',
            SelectOptions : [],
        },
        Text : 'Category',
    },
);
annotate service.Customers with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },
        {
            $Type : 'UI.DataField',
            Value : City,
            Label : 'City',
        },
        {
            $Type : 'UI.DataField',
            Value : CompanyName,
            Label : 'CompanyName',
        },
        {
            $Type : 'UI.DataField',
            Value : ContactName,
            Label : 'ContactName',
        },
        {
            $Type : 'UI.DataField',
            Value : ContactTitle,
            Label : 'ContactTitle',
        },
        {
            $Type : 'UI.DataField',
            Value : Country,
            Label : 'Country',
        },
        {
            $Type : 'UI.DataField',
            Value : CustomerID,
            Label : 'CustomerID',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Customers',
    },
);

annotate service.Employees with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : Address,
            Label : 'Address',
        },
        {
            $Type : 'UI.DataField',
            Value : BirthDate,
            Label : 'BirthDate',
        },
        {
            $Type : 'UI.DataField',
            Value : City,
            Label : 'City',
        },
        {
            $Type : 'UI.DataField',
            Value : Country,
            Label : 'Country',
        },
        {
            $Type : 'UI.DataField',
            Value : Extension,
            Label : 'Extension',
        },
        {
            $Type : 'UI.DataField',
            Value : FirstName,
            Label : 'FirstName',
        },
        {
            $Type : 'UI.DataField',
            Value : EmployeeID,
            Label : 'EmployeeID',
        },
        {
            $Type : 'UI.DataField',
            Value : HireDate,
            Label : 'HireDate',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Employees',
    },
);

annotate service.Products with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Test',
            ID : 'Test',
            Target : '@UI.FieldGroup#Test',
        },
    ],
    UI.FieldGroup #Test : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : CategoryID,
                Label : 'CategoryID',
            },
            {
                $Type : 'UI.DataField',
                Value : Discontinued,
                Label : 'Discontinued',
            },
            {
                $Type : 'UI.DataField',
                Value : ProductID,
                Label : 'ProductID',
            },
            {
                $Type : 'UI.DataField',
                Value : ProductName,
                Label : 'ProductName',
            },
            {
                $Type : 'UI.DataField',
                Value : QuantityPerUnit,
                Label : 'QuantityPerUnit',
            },
            {
                $Type : 'UI.DataField',
                Value : SupplierID,
                Label : 'SupplierID',
            },
            {
                $Type : 'UI.DataField',
                Value : ReorderLevel,
                Label : 'ReorderLevel',
            },
            {
                $Type : 'UI.DataField',
                Value : UnitsInStock,
                Label : 'UnitsInStock',
            },
            {
                $Type : 'UI.DataField',
                Value : UnitsOnOrder,
                Label : 'UnitsOnOrder',
            },
        ],
    },
);

// ─── Customer Object Page ─────────────────────────────────────
annotate service.Customers with @(
    UI.FieldGroup #CustomerDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            { $Type : 'UI.DataField', Value : CustomerID,    Label : 'Customer ID' },
            { $Type : 'UI.DataField', Value : CompanyName,   Label : 'Company Name' },
            { $Type : 'UI.DataField', Value : ContactName,   Label : 'Contact Name' },
            { $Type : 'UI.DataField', Value : ContactTitle,  Label : 'Contact Title' },
            { $Type : 'UI.DataField', Value : Address,       Label : 'Address' },
            { $Type : 'UI.DataField', Value : City,          Label : 'City' },
            { $Type : 'UI.DataField', Value : Region,        Label : 'Region' },
            { $Type : 'UI.DataField', Value : PostalCode,    Label : 'Postal Code' },
            { $Type : 'UI.DataField', Value : Country,       Label : 'Country' },
            { $Type : 'UI.DataField', Value : Phone,         Label : 'Phone' },
            { $Type : 'UI.DataField', Value : Fax,           Label : 'Fax' },
        ],
    },
    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'CustomerDetailsFacet',
            Label  : 'Customer Details',
            Target : '@UI.FieldGroup#CustomerDetails',
        },
    ],
    UI.HeaderInfo : {
        TypeName       : 'Customer',
        TypeNamePlural : 'Customers',
        Title          : { $Type : 'UI.DataField', Value : CompanyName },
        Description    : { $Type : 'UI.DataField', Value : ContactName },
    },
);

// ─── Employee Object Page ─────────────────────────────────────
annotate service.Employees with @(
    UI.FieldGroup #EmployeeDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            { $Type : 'UI.DataField', Value : EmployeeID,       Label : 'Employee ID' },
            { $Type : 'UI.DataField', Value : FirstName,        Label : 'First Name' },
            { $Type : 'UI.DataField', Value : LastName,         Label : 'Last Name' },
            { $Type : 'UI.DataField', Value : Title,            Label : 'Title' },
            { $Type : 'UI.DataField', Value : TitleOfCourtesy,  Label : 'Title Of Courtesy' },
            { $Type : 'UI.DataField', Value : BirthDate,        Label : 'Birth Date' },
            { $Type : 'UI.DataField', Value : HireDate,         Label : 'Hire Date' },
            { $Type : 'UI.DataField', Value : Address,          Label : 'Address' },
            { $Type : 'UI.DataField', Value : City,             Label : 'City' },
            { $Type : 'UI.DataField', Value : Country,          Label : 'Country' },
            { $Type : 'UI.DataField', Value : HomePhone,        Label : 'Home Phone' },
            { $Type : 'UI.DataField', Value : Notes,            Label : 'Notes' },
        ],
    },
    UI.Facets : [
        {
            $Type  : 'UI.ReferenceFacet',
            ID     : 'EmployeeDetailsFacet',
            Label  : 'Employee Details',
            Target : '@UI.FieldGroup#EmployeeDetails',
        },
    ],
    UI.HeaderInfo : {
        TypeName       : 'Employee',
        TypeNamePlural : 'Employees',
        Title          : { $Type : 'UI.DataField', Value : LastName },
        Description    : { $Type : 'UI.DataField', Value : FirstName },
    },
);
annotate service.Products with @(

    UI.LineItem : [
        { $Type : 'UI.DataField', Value : ProductID,       Label : 'Product ID' },
        { $Type : 'UI.DataField', Value : ProductName,     Label : 'Product Name' },
        { $Type : 'UI.DataField', Value : QuantityPerUnit, Label : 'Qty Per Unit' },
        { $Type : 'UI.DataField', Value : UnitPrice,       Label : 'Unit Price' },
        { $Type : 'UI.DataField', Value : UnitsInStock,    Label : 'Units In Stock' },
        { $Type : 'UI.DataField', Value : UnitsOnOrder,    Label : 'Units On Order' },
        { $Type : 'UI.DataField', Value : Discontinued,    Label : 'Discontinued' },
    ],

);
annotate service.Orders with @(
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : CustomerID,
            Label : 'CustomerID',
        },
        {
            $Type : 'UI.DataField',
            Value : EmployeeID,
            Label : 'EmployeeID',
        },
        {
            $Type : 'UI.DataField',
            Value : Freight,
            Label : 'Freight',
        },
        {
            $Type : 'UI.DataField',
            Value : OrderDate,
            Label : 'OrderDate',
        },
        {
            $Type : 'UI.DataField',
            Value : OrderID,
            Label : 'OrderID',
        },
        {
            $Type : 'UI.DataField',
            Value : RequiredDate,
            Label : 'RequiredDate',
        },
        {
            $Type : 'UI.DataField',
            Value : ShipAddress,
            Label : 'ShipAddress',
        },
        {
            $Type : 'UI.DataField',
            Value : ShipVia,
            Label : 'ShipVia',
        },
        {
            $Type : 'UI.DataField',
            Value : ShipRegion,
            Label : 'ShipRegion',
        },
        {
            $Type : 'UI.DataField',
            Value : ShippedDate,
            Label : 'ShippedDate',
        },
        {
            $Type : 'UI.DataField',
            Value : ShipName,
            Label : 'ShipName',
        },
        {
            $Type : 'UI.DataField',
            Value : ShipPostalCode,
            Label : 'ShipPostalCode',
        },
        {
            $Type : 'UI.DataField',
            Value : ShipCountry,
            Label : 'ShipCountry',
        },
        {
            $Type : 'UI.DataField',
            Value : ShipCity,
            Label : 'ShipCity',
        },
        {
            $Type : 'UI.DataFieldForAnnotation',
            Target : '@UI.Chart#OrderID',
            Label : 'OrderID',
        },
    ],
    UI.SelectionPresentationVariant #tableView : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
            ],
        },
        Text : 'Orders',
    },
    UI.DataPoint #OrderID : {
        Value : OrderID,
        MinimumValue : 0,
        MaximumValue : 100,
    },
    UI.Chart #OrderID : {
        ChartType : #Bullet,
        Measures : [
            OrderID,
        ],
        MeasureAttributes : [
            {
                DataPoint : '@UI.DataPoint#OrderID',
                Role : #Axis1,
                Measure : OrderID,
            },
        ],
    },
);

