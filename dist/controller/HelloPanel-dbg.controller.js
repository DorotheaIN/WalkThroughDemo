
// sap.ui.define([
//    "sap/ui/core/mvc/Controller",
//    "sap/m/MessageToast"
// ], function (Controller, MessageToast) {
//    "use strict";
//    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
//       onShowHello : function () {
//          // read msg from i18n model
//          var oBundle = this.getView().getModel("i18n").getResourceBundle();
//          var sRecipient = this.getView().getModel().getProperty("/recipient/name");
//          var sMsg = oBundle.getText("helloMsg", [sRecipient]);
//          // show message
//          MessageToast.show(sMsg);
//       }
//    });
// });




// sap.ui.define([
//    "sap/ui/core/mvc/Controller",
//    "sap/m/MessageToast"
// ], function (Controller, MessageToast) {
//    "use strict";
//    return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
//       onShowHello : function () {
//          // read msg from i18n model
//          var oBundle = this.getView().getModel("i18n").getResourceBundle();
//          var sRecipient = this.getView().getModel().getProperty("/recipient/name");
//          var sMsg = oBundle.getText("helloMsg", [sRecipient]);
//          // show message
//          MessageToast.show(sMsg);
//       }
//    });
// });




sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/core/Fragment"
], function (Controller, MessageToast, Fragment) {
   "use strict";

   return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
      fragment: Fragment,
      onInit : function () {
         var check = this
         console.log(check)
      },

      onShowHello : function () {
         // var check = this
         // console.log(check)
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient = this.getView().getModel().getProperty("/recipient/name");
         var sMsg = oBundle.getText("helloMsg", [sRecipient]);
         // show message
         MessageToast.show(sMsg);
      },
      onOpenDialog : function () {
         var _this = this
         // console.log(_this)

         // create dialog lazily
         if (!this.pDialog) {
            this.pDialog = this.loadFragment({
               name: "sap.ui.demo.walkthrough.view.HelloDialog"
            });
            // this.pDialog = this.fragment.load({
            //    name: "sap.ui.demo.walkthrough.view.HelloDialog"
            // });
            console.log(_this)
         }
         // if (!this.pDialog) {
         //    this.pDialog = this.loadFragment({
         //       name: "sap.ui.demo.walkthrough.view.HelloDialog"
         //    }).then(function (oDialog){
         //       // forward compact/cozy style into dialog
         //       syncStyleClass(this.getOwnerComponent().getContentDensityClass(), this.getView(), oDialog);
         //       return oDialog;
         //    }.bind(this));
         //    // console.log(_this)
         // }


         this.pDialog.then(function(oDialog) {
            // fragment.load
            console.log("oDialog",oDialog)
            // _this.getView().addDependent(oDialog);
            oDialog.open();
            console.log(_this)
         });
      },

      onCloseDialog : function () {
         // note: We don't need to chain to the pDialog promise, since this event-handler
         // is only called from within the loaded dialog itself.
         this.byId("helloDialog").close();
      },
      onNavLine : function () {
         var oRouter = this.getOwnerComponent().getRouter();
         oRouter.navTo("line");
      }

   });
});

