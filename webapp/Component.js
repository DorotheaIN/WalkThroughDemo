
// sap.ui.define([
//    "sap/ui/core/UIComponent"
// ], function (UIComponent) {
//    "use strict";
//    return UIComponent.extend("", {

//       init : function () {
//          // call the init function of the parent
//          UIComponent.prototype.init.apply(this, arguments);
//       }
//    });
// });




sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/Device"
], function (UIComponent, JSONModel,Device) {
   "use strict";
   return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
      metadata : {
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            manifest: "json"
      },
      init : function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            recipient : {
               name : "World"
            },
            Invoices: [
               {
                  ProductName: "Pineapple",
                  Quantity: 21,
                  ExtendedPrice: 87.2,
                  ShipperName: "Fun Inc.",
                  ShippedDate: "2015-04-01T00:00:00",
                  Status: "A"
               },
               {
                  ProductName: "Milk",
                  Quantity: 21,
                  ExtendedPrice: 87.2,
                  ShipperName: "Fun Inc.",
                  ShippedDate: "2015-04-01T00:00:00",
                  Status: "A"
               }
            ]
         };


         var oModel = new JSONModel(oData);
         this.setModel(oModel);

         // set device model
         var oDeviceModel = new JSONModel(Device);
         oDeviceModel.setDefaultBindingMode("OneWay");
         this.setModel(oDeviceModel, "device");

         // create the views based on the url/hash
         this.getRouter().initialize();
      },
      getContentDensityClass : function () {
         if (!this._sContentDensityClass) {
            if (!Device.support.touch) {
               this._sContentDensityClass = "sapUiSizeCompact";
            } else {
               this._sContentDensityClass = "sapUiSizeCozy";
            }
         }
         return this._sContentDensityClass;
      }
   });
});

