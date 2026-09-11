sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/mindset/onboarding/onboarding/test/integration/pages/OnboardingRequestsList",
	"com/mindset/onboarding/onboarding/test/integration/pages/OnboardingRequestsObjectPage"
], function (JourneyRunner, OnboardingRequestsList, OnboardingRequestsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/mindset/onboarding/onboarding') + '/test/flp.html#app-preview',
        pages: {
			onTheOnboardingRequestsList: OnboardingRequestsList,
			onTheOnboardingRequestsObjectPage: OnboardingRequestsObjectPage
        },
        async: true
    });

    return runner;
});

