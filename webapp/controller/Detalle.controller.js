sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel",
    'sap/ui/model/Filter',
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, MessageBox, JSONModel, Filter, FilterOperator    ) {
        "use strict";

        return Controller.extend("ypf.zz1com512freelm4.controller.Detalle", {
            onInit: function () {

                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Detalle").attachPatternMatched(this._onRouteMatched, this);

                              


            },
            _onRouteMatched: function (oEvent) {

               
				var oModel = oEvent.getParameter("arguments").parameter.split(';');
				var oModeloParse = JSON.parse(oModel);

				this.DetalleModel(oModeloParse);
 
                ////this.callPdf(b64Data);   

         
            },
            DetalleModel: function(oModeloParse){

				var oModel = this.getOwnerComponent().getModel();
				var oFilter = [];	
				var that = this;			

                var fechaDesde = new sap.ui.model.Filter({
                    path: "Fecha_Desde",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oModeloParse[0].Fecha_Desde
                });
                var fechaHasta = new sap.ui.model.Filter({
                    path: "Fecha_Hasta",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oModeloParse[0].Fecha_Hasta
                });
				var Pdf_Nombre = new sap.ui.model.Filter({
                    path: "Pdf_Nombre",
                    operator: sap.ui.model.FilterOperator.EQ,
                    value1: oModeloParse[0].Pdf_Nombre
                });


                oFilter.push(fechaDesde, fechaHasta, Pdf_Nombre);


				oModel.read("/ResumenSet", {
                    filters: oFilter,
                    success: function (oData, oResponse) {
						console.log(oResponse);
                       var b64Data = oResponse.data.results[0].Pdf_data;

					   that.callPdf(b64Data);	  

						
					}.bind(this),
					error: function (oError) {
						this.getView().setBusy(false);
						var mensaje = "Error al Leer " + Contrato;
						MessageToast.show(mensaje);
					}.bind(this)
				});
	



			},




            callPdf: function(b64Data){            
                
          
          			//Convierte los datos del PDF a Blob
			var contentType = 'application/pdf';
			var blob = this.b64toBlob(b64Data, contentType);

			//Convierte blob a URL para poder mostrarlo en el PDFviewer
			var blobUrl = URL.createObjectURL(blob);
			jQuery.sap.addUrlWhitelist("blob");
            this.getView().byId("pdfView").setSource(blobUrl); 
			
		},

		b64toBlob: function (b64Data, contentType, sliceSize) {
			contentType = contentType || '';
			sliceSize = sliceSize || 512;
			var byteCharacters = atob(b64Data);
			var byteArrays = [];
			for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				var slice = byteCharacters.slice(offset, offset + sliceSize);
				var byteNumbers = new Array(slice.length);
				for (var i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				}
				var byteArray = new Uint8Array(byteNumbers);
				byteArrays.push(byteArray);
			}
			var blob = new Blob(byteArrays, {
				type: contentType
			});
			return blob;
		},

		hextob64: function (str) {
			var targetStr = str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "");
			targetStr = targetStr.split(" ");
			targetStr = new Uint8Array(targetStr).reduce(function (data, byte) {
				return data + String.fromCharCode(byte);
			}, '');
			targetStr = btoa(targetStr);
			return targetStr;
		}


        });
    });
