sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, JSONModel, Filter, FilterOperator, DateFormat) {
        "use strict";

        return Controller.extend("ypf.zz1com512freelm4.controller.View", {
            onInit: function () {

            },
            onEnviar: function () {

                var that = this;

                var desde = this.getView().byId("DP1").getValue();
                var hasta = this.getView().byId("DP2").getValue();

                if (desde == "" || hasta == "") {

                    MessageToast.show("Ambos campos de fecha son obligatorios");

                }

                var oModel = this.getOwnerComponent().getModel();
                var oFilter = [];

                var fechaDesde = new sap.ui.model.Filter({
                    path: "Fecha_Desde",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: desde
                });
                var fechaHasta = new sap.ui.model.Filter({
                    path: "Fecha_Hasta",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: hasta
                });

                oFilter.push(fechaDesde, fechaHasta);

                oModel.read("/ResumenSet", {
                    filters: oFilter,
                    success: function (oData, oResponse) {

                        var oModel = oResponse.data.results;



                        oModel.forEach(function (elem) {

                            var oDate = elem.Emision;                           
                         
                        });

                        console.log(oModel);

                        const oModelResumen = new JSONModel(oModel);
                        that.getView().setModel(oModelResumen, "Resumen");


                    },
                    error: function (oError) {
                        console.log(oError)
                    }
                });


            },
            onPdf: function (oEvent) {

                var sPath = oEvent.getSource().getParent().getBindingContextPath();
                var oItemD = this.getView().getModel("Resumen").getProperty(sPath);

                var array = [];
                var Objet = {};

                Objet.Pdf_Nombre = oItemD.Pdf_Nombre;
                Objet.Fecha_Desde = this.getView().byId("DP1").getValue();
                Objet.Fecha_Hasta = this.getView().byId("DP2").getValue();

                array.push(Objet);

                var jsonModel = new sap.ui.model.json.JSONModel(array);

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("Detalle", { parameter: JSON.stringify(jsonModel.oData) });

            }

        });
    });
