sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/mindset/empondoard/ui/emponboardingui/test/integration/pages/OnboardingRequestsList",
	"com/mindset/empondoard/ui/emponboardingui/test/integration/pages/OnboardingRequestsObjectPage"
], function (JourneyRunner, OnboardingRequestsList, OnboardingRequestsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/mindset/empondoard/ui/emponboardingui') + '/test/flp.html#app-preview',
        pages: {
			onTheOnboardingRequestsList: OnboardingRequestsList,
			onTheOnboardingRequestsObjectPage: OnboardingRequestsObjectPage
        },
        async: true
    });

    return runner;
});

