sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/mind/set/northwindmultitabv4list/test/integration/pages/CategoriesList",
	"com/mind/set/northwindmultitabv4list/test/integration/pages/CategoriesObjectPage",
	"com/mind/set/northwindmultitabv4list/test/integration/pages/ProductsObjectPage"
], function (JourneyRunner, CategoriesList, CategoriesObjectPage, ProductsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/mind/set/northwindmultitabv4list') + '/test/flp.html#app-preview',
        pages: {
			onTheCategoriesList: CategoriesList,
			onTheCategoriesObjectPage: CategoriesObjectPage,
			onTheProductsObjectPage: ProductsObjectPage
        },
        async: true
    });

    return runner;
});

