import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { loginUser, registerUser } from 'src/app/ngRx/product.actions';
import { AppState } from 'src/app/ngRx/product.state';
import { DataserviceService } from 'src/app/services/dataservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private store: Store<AppState>,
    private data: DataserviceService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registerUser(form: FormGroup) {
    console.log(form.valid);
    if (form.valid) {
      this.store.dispatch(registerUser());
      localStorage.setItem('loggedIn', 'Yes');
      setTimeout(() => {
        this.store.dispatch(
          loginUser({ login: localStorage.getItem('loggedIn') })
        );
      }, 1000);
      this.dialogRef.close();
    }
  }
}
