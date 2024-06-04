import { LightningElement, api, wire } from "lwc";
import LightningModal from 'lightning/modal';
import viewModalId  from "@salesforce/apex/Reports.viewModalId";
import { refreshApex } from '@salesforce/apex';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';


export default class MyModal extends LightningModal {
    @api content;
    @wire(viewModalId,{ id: '$content' }) modalDetail;

 
     handleOkay() {
        this.close('okay');
        
    

    }

    
    async updateStatus(){
        refreshApex(this.modalDetail);
        await notifyRecordUpdateAvailable([{recordId: this.content}]);

    }

    renderedCallback(){
        this.updateStatus();
    }

}