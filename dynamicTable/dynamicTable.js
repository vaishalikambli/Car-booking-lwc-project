import { LightningElement, api } from 'lwc';
import getBookCarRecord from '@salesforce/apex/CarDetails.getBookCarRecord';

export default class DynamicTable extends LightningElement {
  @api content = [];
  label;
  fieldName;
  type;
  @api carData;
  @api tableColumns = [
    { Label: 'Id', fieldName: 'Id', hideLabel: true },
    { label: 'Name', fieldName: 'Name', type: 'String' },
    { label: 'Car Model', fieldName: 'Car_Model__c', type: 'String' },
    { label: 'Car Type', fieldName: 'Car_Type__c', type: 'String' },
    { label: 'Price - (Per day)', fieldName: 'Price__c', type: 'String' },
    { label: 'Book Car', type: "button", typeAttributes: {  
        label: 'Book',  
        name: 'Book',  
        title: 'Book',  
        disabled: false,  
        value: 'Book', 
        iconPosition: 'left'  
      }
    }      
  ];

  bookCar(event){
    const recId = event.detail.row.Id;
    const actionName = event.detail.action.name;
    
    if(actionName === 'Book'){
      console.log('Book here :: ' + recId);

      getBookCarRecord({carId : recId}).then(result => {
        console.log('Inside getBookCarRecord method');
        if(result){
          this.carData = result;
          console.log('Car data :: ' + JSON.stringify(result));
        }
      }).catch(error => {
        console.log('Error :: ' + JSON.stringify(error));        
      })
    }
  }

}