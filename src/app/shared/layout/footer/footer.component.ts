import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RequestType} from "../../../../assets/types/request.type";
import {DefaultResponseType} from "../../../../assets/types/default-response.type";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  isPopUp: boolean = false;
  isSuccess: boolean = false;

  popupForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  closePopUp() {
    this.isPopUp = false;
  }

  openPopUp() {
    this.isPopUp = true;
    this.isSuccess = false;
    this.popupForm.reset();
  }

  makeAppointment() {
    if (this.popupForm.valid && this.popupForm.value.name && this.popupForm.value.phone) {
      this.isSuccess = true;
    }
  }
}
