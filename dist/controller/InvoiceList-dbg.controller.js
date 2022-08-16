
// sap.ui.define([
// 	"sap/ui/core/mvc/Controller",
// 	"sap/ui/model/json/JSONModel"
// ], function (Controller, JSONModel) {
// 	"use strict";

// 	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {

// 		onInit : function () {
// 			var oViewModel = new JSONModel({
// 				currency: "USD"
// 			});
// 			this.getView().setModel(oViewModel, "view");
// 		}

// 	});
// });



sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"../model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.InvoiceList", {
		formatter: formatter,
		onInit : function () {
			var oViewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterInvoices : function (oEvent) {
			console.log("oEvent in filter",oEvent);
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			console.log("sQuery in filter",sQuery);
			if (sQuery) {
				console.log("oEvent in filter",oEvent);
				aFilter.push(new Filter("ShipperName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("invoiceList");
			var oBinding = oList.getBinding("items");
			console.log("oBinding",oBinding);
			oBinding.filter(aFilter);
			console.log("after filtering",oBinding.filter(aFilter))
		},
		onPress: function (oEvent) {
			console.log("oEvent in onPress",oEvent)
			var oItem = oEvent.getSource();
			console.log("oItem.getBindingContext(\"invoice\")",oItem.getBindingContext("invoice"));
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail",{
				invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substr(1))
			});
		}
	});
});


