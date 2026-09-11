sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.mindset.empondoard.ui.emponboardingui',
            componentId: 'OnboardingRequestsList',
            contextPath: '/OnboardingRequests'
        },
        CustomPageDefinitions
    );
});