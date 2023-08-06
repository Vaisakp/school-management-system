import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  getDataForm: FormGroup;
  stageData: Array<string> = [ 'Primary', 'Secondary' ];
  yearData!: Array<string>;
  classData!: Array<string>;
  getClassListLoader: boolean = false;
  getUserDataLoader: boolean = false;
  constructor(private formBuilder: FormBuilder){
    this.getDataForm = this.formBuilder.group({
      stage: ['Primary', Validators.required],
      year: ['', Validators.required],
      class: ['', Validators.required,],
    });
    this.setYear();
  }

  setYear(){
    if(this.getDataForm.controls["stage"].value === 'Primary'){
      this.yearData = [ 'KG 1', 'KG 2', 'KG 3', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'];
    }
    else{
      this.yearData = [ 'Year 6', 'Year 7', 'Year 8', 'Year 9' ];
    }
    this.getDataForm.controls['year'].setValue(this.yearData[0]);
    this.setClass();
  }

  setClass(){
    this.getClassListLoader = true;
    this.getDataForm.get('class')?.disable();
    const classList = [ 'Class A', 'Class B', 'Class C', 'Class D', 'Class E' ];    
    const number  = Math.floor(Math.random() * 5) + 1;
    this.classData = classList.slice(0, number);
    this.getDataForm.controls['class'].setValue(this.classData[0]);
      this.getClassListLoader = false;
      this.getDataForm.get('class')?.enable();
  }

  getUserData(){
    this.getUserDataLoader = true;
  }
}
