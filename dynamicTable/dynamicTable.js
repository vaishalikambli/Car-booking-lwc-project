import { LightningElement, api } from 'lwc';

export default class DynamicTable extends LightningElement {
  @api content = [];
  label;
  fieldName;
  type;
  @api tableColumns = [
    { label: 'Name', fieldName: 'Name', type: 'String' },
    { label: 'Car Model', fieldName: 'Car_Model__c', type: 'String' },
    { label: 'Car Type', fieldName: 'Car_Type__c', type: 'String' },
    { label: 'Price - (Per day)', fieldName: 'Price__c', type: 'String' }                                    
  ];
}