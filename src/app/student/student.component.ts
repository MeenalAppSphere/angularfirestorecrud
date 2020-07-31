import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { StudentModel } from "./studentmodel";
import { StudentService } from "./student.service";
import { CountriesService } from "./countries.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private studentService: StudentService,
    private toastr: ToastrService,
    private activatedroute: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  studentModel: StudentModel[] = [];
  studentId: string;
  updateData = false;
  completed: boolean;
  stateInfo: any[] = [];
  countryInfo: any[] = [];
  cityInfo: any[] = [];

  studentForm = this.formBuilder.group({
    fname: ["", Validators.required],
    lname: ["", Validators.required],
    age: ["", Validators.required],
    country: ["", Validators.required],
    state: ["", Validators.required],
    city: ["", Validators.required]
  });

  ngOnInit() {
    this.studentId = this.activatedroute.snapshot.params.id;
    //console.log(this.studentId);
    if (this.studentId) {
      this.studentService.getStudentIdData(this.studentId).subscribe(doc => {
        this.studentForm.patchValue(doc.data());
        this.updateData = true;
      });
    }
    this.getCountries();
  }

  addStudent(studentModel: StudentModel) {
    this.studentService.addStudentService(studentModel).then(res => {
      this.toastr.success("Student Record Added");
      this.studentForm.reset();
    });
    console.log(studentModel);
  }

  getStudent() {
    this.route.navigate(["/listStudent"]);
  }

  resetData() {
    this.studentForm.reset();
    this.updateData = false;
  }

  updateStudent(studentModel: StudentModel) {
    studentModel.id = this.studentId;
    this.studentService.updateStudentService(studentModel);
    this.toastr.success("Data Updated");
    this.studentForm.reset();
  }
  getCountries() {
    this.countriesService.allCountries().subscribe(
      data2 => {
        this.countryInfo = data2.Countries;
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err)
    );
  }

  onChangeCountry(countryValue) {
    countryValue = parseInt(countryValue.target.value);
    this.studentForm
      .get("country")
      .patchValue(this.countryInfo[countryValue].CountryName);
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
  }

  onChangeState(stateValue) {
    stateValue = parseInt(stateValue.target.value);
    this.studentForm.get("state").patchValue(this.stateInfo[stateValue].StateName);
    this.cityInfo = this.stateInfo[stateValue].Cities;
  }

  OnChangeCity(cityValue)
  {
    cityValue =parseInt(cityValue.target.value);
    this.studentForm.get("city").patchValue(this.cityInfo[cityValue]);
  }
}
