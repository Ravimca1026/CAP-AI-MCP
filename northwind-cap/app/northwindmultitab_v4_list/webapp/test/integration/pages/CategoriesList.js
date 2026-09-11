sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.mind.set.northwindmultitabv4list',
            componentId: 'CategoriesList',
            contextPath: '/Categories'
        },
        CustomPageDefinitions
    );
});