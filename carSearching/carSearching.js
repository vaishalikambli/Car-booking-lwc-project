import { api, LightningElement } from 'lwc';
import getAllCarRecords from '@salesforce/apex/CarDetails.getAllCarRecords';

export default class CarSearching extends LightningElement {
  @api carData = [];
  //label;
  //fieldName;
  //type;
  // @api tableColumns = [
  //                 { label: 'Name', fieldName: 'Name', type: 'String' },
  //                 { label: 'Car Model', fieldName: 'Car_Model__c', type: 'String' },
  //                 { label: 'Car Type', fieldName: 'Car_Type__c', type: 'String' },
  //                 { label: 'Price - (Per day)', fieldName: 'Price__c', type: 'String' }                                    
  //               ];

  // connectedCallback(event){
  //   this.searchRelatedAccounts(event);
  //   console.log('Inside connected callback');
  // }

  searchCarDetails(event){
    let like = event.target.value;
    
    getAllCarRecords({searchKeyword : like}).then(result => {
      if(result){
        this.carData = result;
        console.log('Response :: ' + this.carData);
      }
    }).catch(error => {
      console.log('Error :: ' + JSON.stringify(error));
    })
  }
}