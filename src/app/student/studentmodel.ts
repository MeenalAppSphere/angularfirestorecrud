import { FormGroup, FormBuilder } from "@angular/forms";

export interface StudentModel{
  id?:string;
  fname:string;
  lname:string;
  age:number;
  country:{
    countryName:string,
    countryId:number
  };
  state:{
    stateName:string,
    stateId:number
  };
  city:{
    cityName:string,
    cityId:number
  };
}