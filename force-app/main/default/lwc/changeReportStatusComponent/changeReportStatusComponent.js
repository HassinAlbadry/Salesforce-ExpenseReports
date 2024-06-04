import { LightningElement, api, wire } from "lwc";

import getAllReports from "@salesforce/apex/Reports.getAllReports";
import getSingleReport  from "@salesforce/apex/Reports.getSingleReport";
import approve  from "@salesforce/apex/ReportStatus.approve";
import reject  from "@salesforce/apex/ReportStatus.reject";



import detailModal from 'c/detailModal';

import { refreshApex } from '@salesforce/apex';
import { notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';



export default class ChangeReportStatusComponent extends LightningElement {


    @wire(getAllReports) reports;
    isModalOpen =false;
    searchKey='';
    render=true;

    id = '';
    approve = false;
    reject = false; 
    approvalResult;
    rejectionResult;
    @wire(getSingleReport,{ searchKey: '$searchKey' }) singleReport;
   

    handleSearch(evt){
        this.searchKey = evt.target.value;
        this.render = false; 
        if(this.searchKey==''){
            this.render = true;
        }
    }
    async handleViewDetails(evt){
          
        const result = await detailModal.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'large',
            description: 'Accessible description of modal\'s purpose',
            content: evt.target.value,
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        console.log(result);

    }
    
    async handleApprove(evt){
            this.id = evt.target.value;
            this.approve = true; 
            try {
                this.approvalResult = await approve({ id: this.id , approve: this.approve });
                this.error = undefined;
                refreshApex(this.reports);
                await notifyRecordUpdateAvailable([{recordId: this.id}]);

            } catch (error) {
                this.error = error;
                this.approvalResult = undefined;
            }


    }
   async handleReject(evt){

    this.id = evt.target.value;
    this.reject = true; 
    try {
        this.rejectionResult = await reject({ id: this.id , reject: this.reject });
        this.error = undefined;
        refreshApex(this.reports);
        await notifyRecordUpdateAvailable([{recordId: this.id}]);

    } catch (error) {
        this.error = error;
        this.rejectionResult = undefined;
    }

   }
    handleCloseModal(){}


}