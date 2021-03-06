import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { StatusComponent } from './status/status.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerificationComponent } from './verification/verification.component';
import { LoginRegComponent } from './login-reg/login-reg.component';

@NgModule({
  declarations: [RegisterComponent, StatusComponent, VerificationComponent, LoginRegComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[RegisterComponent, StatusComponent]
})
export class ApplicantModule { }
