import { api, LightningElement } from 'lwc';
import getAllCarRecords from '@salesforce/apex/CarDetails.getAllCarRecords';

export default class CarSearching extends LightningElement {
  @api carData = [];

  /**
   * 
   * Functionto to Search car for rent
   */
  searchCarDetails(event){
    let like = event.target.value;
    
    getAllCarRecords({searchKeyword : like}).then(result => {
      if(result){
        this.carData = result;
      }
    }).catch(error => {
      console.log('Error :: ' + JSON.stringify(error));
    })
  }
}