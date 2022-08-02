import { LightningElement, wire } from 'lwc';
//import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';
import { createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NewCarDetails extends LightningElement {
  @wire(CurrentPageReference)
  pageReference;

  carName;
  carModel;
  carType;
  pricePerDay;  

  get carTypeOptions() {
    return [
        { label: 'Petrol', value: 'Petrol' },
        { label: 'Diesel', value: 'Diesel' },
        { label: 'CNG', value: 'CNG' }
    ];
  }

  addNewCarDetails(event){
    if(event.target.name === 'carName'){
      this.carName = event.target.value;
    }else if(event.target.name === 'carModel'){
      this.carModel = event.target.value;
    }else if(event.target.name === 'carType'){
      this.carType = event.detail.value;
    }else if(event.target.name === 'pricePerDay'){
      this.pricePerDay = parseInt(event.target.value);
    }
  }

validateCarFields(){
  let carNameField = this.template.querySelector('.carName');
  let carNameValue = carNameField.value;
  let carModelField = this.template.querySelector('.carModel');
  let carModelValue = carModelField.value;
  let carTypeField = this.template.querySelector('.carType');
  let carTypeValue = carTypeField.value;
  let pricePerDayField = this.template.querySelector('.pricePerDay');
  let pricePerDayValue = pricePerDayField.value;

  if(carNameValue === null || carNameValue === ''){
    carNameField.setCustomValidity("Car name value is required");    
  }else{
    carNameField.setCustomValidity("");
  }
  carNameField.reportValidity();

  if(carModelValue === null || carModelValue === ''){
    console.log('Inside validation!!! ' + carModelValue);
    carModelField.setCustomValidity("Car model value is required");
  }else{
    carModelField.setCustomValidity("");
  }
  carModelField.reportValidity();
  
  if(carTypeValue === null || carTypeValue === ''){
    console.log('Inside validation!!! ' + carTypeValue);
    carTypeField.setCustomValidity("Car type value is required");
  }else{
    carTypeField.setCustomValidity("");
  }
  carTypeField.reportValidity();
  
  if(pricePerDayValue === null || pricePerDayValue === ''){
    console.log('Inside validation!!! ' + pricePerDayValue);
    pricePerDayField.setCustomValidity("price value is required");
  }else{
    pricePerDayField.setCustomValidity("");
  }
  pricePerDayField.reportValidity();
}

  createNewCarEntry(event){
    const fields = {'Name' : this.carName, 'Car_Model__c' : this.carModel, 'Car_Type__c' : this.carType, 'Price__c' : this.pricePerDay};
    const recordDetails = {apiName : 'Car__c', fields : fields};

    this.validateCarFields();

    createRecord(recordDetails).then(response => {
      console.log('Response :: ' + JSON.stringify(response));
      if(response){        
        this.saveRecordToast('Success!', 'You have been created new record Successfully', 'success');        
      }
      }).catch(error => {
       // if(response === null){ 
          this.saveRecordToast('Error!', 'Failed to create new record', 'error');
       // }
      })
  }

  saveRecordToast(title, message, variant){
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);    
  }
}