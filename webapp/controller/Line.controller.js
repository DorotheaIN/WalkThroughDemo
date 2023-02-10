sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/viz/ui5/format/ChartFormatter',
    'sap/viz/ui5/api/env/Format',
    'sap/viz/ui5/data/FlattenedDataset',
    "sap/ui/core/Fragment",
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
    'sap/m/MessageToast',
    'sap/ui/model/BindingMode'
], function(Controller, JSONModel, ChartFormatter, Format, FlattenedDataset, Fragment, Filter, FilterOperator, MessageToast, BindingMode) {
    "use strict";
    var Controller = Controller.extend("sap.ui.demo.walkthrough.controller.Line", {
        oVizFrame : null,
        settingsModel:{
            depths:{
                'One':{

                }
            },
            dimensions: {
                Date:[{
                    name:'Date',
                    value:'{date}'
                }],
                Hour:[{
                    name:'Hour',
                    value:'{hour}',
                }]
            },
            measures:{
                Date:[{
                    name:'Date_duration',
                    value:'{date_duration}'
                }],
                Hour:[{
                    name:'Hour_duration',
                    value:'{hour_duration}'
                }]
            }
        },
        onInit : function () {
            this._mDialogs = {};


            var viewSettingsModel = {
                DateRange:[
                    {
                        name:'1 day',
                        value:'1'
                    },
                    {
                        name:'10 days',
                        value:'2'
                    },
                    {
                        name:'30 days',
                        value:'3'
                    }
                ],
                Category:[
                    {
                        name:'Failure Rate',
                        value:'1'
                    },
                    {
                        name:'Duration Rate',
                        value:'2'
                    }
                ]
            }
            var oViewSettingModel = new JSONModel(viewSettingsModel);
            oViewSettingModel.setDefaultBindingMode(BindingMode.OneWay);
            this.getView().setModel(oViewSettingModel,'ViewSettings');


            Format.numericFormatter(ChartFormatter.getInstance());
            var formatPattern = ChartFormatter.DefaultPattern;

            var oModel = new JSONModel(this.settingsModel);
            oModel.setDefaultBindingMode(BindingMode.OneWay);
            this.getView().setModel(oModel);

            var oVizFrame = this.oVizFrame = this.getView().byId("frame");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        visible: true
                    }
                },
                valueAxis: {
                    label: {

                    },
                    title: {
                        visible: false
                    }
                },
                categoryAxis: {
                    label:{
                    },
                    title: {
                        visible: false
                    }
                },
                title: {
                    visible: true,
                    text: 'Process Analysis'
                }
            });
            var dataModel = new JSONModel("./data/data.json");
            oVizFrame.setModel(dataModel);

            var oPopOver = this.getView().byId("idPopOver");
            oPopOver.connect(oVizFrame.getVizUid());
            oPopOver.setFormatString(formatPattern.STANDARDFLOAT);
        },
        drillDown : function () {
            if (this.oVizFrame){
                var dataset = {
                    data: {
                        path: "/Processes"
                    }
                };
                var dim = this.settingsModel.dimensions['Hour'];
                dataset.dimensions = dim;
                console.log('dim',dim)
                var val = this.settingsModel.measures['Hour'];
                dataset.measures = val;
                console.log('val',val)
                var oDataset = new FlattenedDataset(dataset);
                this.oVizFrame.setDataset(oDataset);
                var dataModel = new JSONModel('./data/data.json');
                this.oVizFrame.setModel(dataModel);

                var feedCategoryAxis = this.getView().byId('categoryAxisFeed');
                this.oVizFrame.removeFeed(feedCategoryAxis);
                var feed = [];
                for (var i = 0; i < dim.length; i++) {
                    feed.push(dim[i].name);
                }
                feedCategoryAxis.setValues(feed);
                this.oVizFrame.addFeed(feedCategoryAxis);

                var feedValueAxis = this.getView().byId('valueAxisFeed');
                this.oVizFrame.removeFeed(feedValueAxis);
                feedValueAxis.setValues(['Hour_duration']);
                this.oVizFrame.addFeed(feedValueAxis);
                console.log(this.oVizFrame)

            }
        },
        drillUp : function (){
            if (this.oVizFrame){
                var dataset = {
                    data: {
                        path: "/Processes"
                    }
                };
                var dim = this.settingsModel.dimensions['Date'];
                dataset.dimensions = dim;
                console.log('dim',dim)
                var val = this.settingsModel.measures['Date'];
                dataset.measures = val;
                console.log('val',val)
                var oDataset = new FlattenedDataset(dataset);
                this.oVizFrame.setDataset(oDataset);
                var dataModel = new JSONModel('./data/data.json');
                this.oVizFrame.setModel(dataModel);

                var feedCategoryAxis = this.getView().byId('categoryAxisFeed');
                this.oVizFrame.removeFeed(feedCategoryAxis);
                var feed = [];
                for (var i = 0; i < dim.length; i++) {
                    feed.push(dim[i].name);
                }
                feedCategoryAxis.setValues(feed);
                this.oVizFrame.addFeed(feedCategoryAxis);

                var feedValueAxis = this.getView().byId('valueAxisFeed');
                this.oVizFrame.removeFeed(feedValueAxis);
                feedValueAxis.setValues(['Date_duration']);
                this.oVizFrame.addFeed(feedValueAxis);
                console.log(this.oVizFrame)

            }
        },
        _openDialog : function (sName, sPage, fInit) {
            var oView = this.getView();

            // creates requested dialog if not yet created
            if (!this._mDialogs[sName]) {
                this._mDialogs[sName] = Fragment.load({
                    id: oView.getId(),
                    name: "sap.ui.demo.walkthrough.view." + sName,
                    controller: this
                }).then(function(oDialog){
                    oView.addDependent(oDialog);
                    if (fInit) {
                        fInit(oDialog);
                    }
                    return oDialog;
                });
            }
            this._mDialogs[sName].then(function(oDialog){
                // opens the requested dialog
                oDialog.open(sPage);
            });
        },
        handleOpenDialog: function () {
            this._openDialog("ViewSettingsDialog");
        },
        handleConfirm: function (oEvent) {
            console.log(this.byId('idOfDateRange').getProperty('selectedKey'))
            console.log(this.byId('idOfCategory').getProperty('selectedKey'))
            this.testFilter(1)
        },
        testFilter:function (range) {
            var aFilter = [];
            console.log(this._getCurrentDate());
            aFilter.push(new Filter({
                path:"date",
                test:function (oValue) {
                    var oDate = new Date(oValue)
                    var curDate = new Date("2022-07-25")
                    // console.log(this.value1)
                    return oDate.getTime()>curDate.getTime()
                },
                value1:range}))
            var oBinding = this.oVizFrame.getDataset().getBinding('data')
            oBinding.filter(aFilter)
            console.log(oBinding)
        },
        _getCurrentDate:function () {
            var dateIns = new Date();
            return dateIns.getFullYear() + '-' + this._repairMonth(dateIns.getMonth()) + '-' + dateIns.getDate();
        },
        _repairMonth:function (month) {
            month = month + 1;
            return (month < 10) ? '0'+ month.toString() : month.toString();
        }
    });
    return Controller;
});