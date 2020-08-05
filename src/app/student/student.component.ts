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
    country: [-1, Validators.required],
    state: [-1, Validators.required],
    city: [-1, Validators.required]
  });

  ngOnInit() {
    this.studentId = this.activatedroute.snapshot.params.id;
    //console.log(this.studentId);
    if (this.studentId) {
      this.studentService.getStudentIdData(this.studentId).subscribe(doc => {
        this.onChangeCountry({
          target: { value: doc.data().country.countryId }
        },true);
        this.onChangeState({target:{value:doc.data().state.stateId}},true);
        this.studentForm.patchValue({
          fname: doc.data().fname,
          lname: doc.data().lname,
          age: doc.data().age,
          country: doc.data().country.countryId,
          state: doc.data().state.stateId,
          city: doc.data().city.cityId
        });
       /* this.onChangeCountry({
          target: { value: doc.data().country.countryId }
        });
        this.onChangeState({target:{value:doc.data().state.stateId}});*/
        this.updateData = true;
      });
    }
    this.getCountries();
  }

  addStudent(studentModel) {
    let model: StudentModel = {
      fname: this.studentForm.get("fname").value,
      lname: this.studentForm.get("lname").value,
      age: this.studentForm.get("age").value,
      country: {
        countryName: this.countryInfo[this.studentForm.get("country").value]
          .CountryName,
        countryId: this.studentForm.get("country").value
      },
      state: {
        stateName: this.stateInfo[this.studentForm.get("state").value]
          .StateName,
        stateId: this.studentForm.get("state").value
      },
      city: {
        cityName: this.cityInfo[this.studentForm.get("city").value],
        cityId: this.studentForm.get("city").value
      }
    };
    this.studentService.addStudentService(model).then(res => {
      this.toastr.success("Student Record Added");
      this.studentForm.reset();
    });
    console.log(model);
  }

  getStudent() {
    this.route.navigate(["/listStudent"]);
  }

  resetData() {
    this.studentForm.reset();
    this.updateData = false;
  }

  updateStudent(studentModel) {
    let model: StudentModel = {
      id: this.studentId,
      fname: this.studentForm.get("fname").value,
      lname: this.studentForm.get("lname").value,
      age: this.studentForm.get("age").value,
      country: {
        countryName: this.countryInfo[this.studentForm.get("country").value]
          .CountryName,
        countryId: this.studentForm.get("country").value
      },
      state: {
        stateName: this.stateInfo[this.studentForm.get("state").value]
          .StateName,
        stateId: this.studentForm.get("state").value
      },
      city: {
        cityName: this.cityInfo[this.studentForm.get("city").value],
        cityId: this.studentForm.get("city").value
      }
    };
    this.studentService.updateStudentService(model);
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

  onChangeCountry(countryValue, isEdit: boolean = false) {
    countryValue = parseInt(countryValue.target.value);
    if (countryValue === -1) {
      this.studentForm.patchValue({
        state: -1,
        city: -1
      });
      this.stateInfo = [];
      this.cityInfo = [];
      return;
    }
    this.stateInfo = this.countryInfo[countryValue].States;
    this.cityInfo = this.stateInfo[0].Cities;
    if (!isEdit) {
      setTimeout(() => {
        this.studentForm.patchValue({
          state: 0,
          city: 0
        });
      }, 100);
    }
  }

  onChangeState(stateValue, isEdit: boolean = false) {
    stateValue = parseInt(stateValue.target.value);
    if (stateValue === -1) {
      this.studentForm.patchValue({
        city: -1
      });
      this.cityInfo = [];
      return;
    }
    this.cityInfo = this.stateInfo[stateValue].Cities;
    if (!isEdit) {
      setTimeout(() => {
        this.studentForm.patchValue({
          city: 0
        });
      }, 100);
    }
  }
  OnChangeCity(cityValue) {
    cityValue = parseInt(cityValue.target.value);
  }
}
