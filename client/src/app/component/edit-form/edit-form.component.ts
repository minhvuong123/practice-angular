import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/config/api.service';
import { VariableService } from 'src/app/config/variable.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  editForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    public dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private variableService: VariableService,
  ) { }

  ngOnInit() {
    delete this.data.createdAt;
    delete this.data.updatedAt;
    this.editForm.setValue(this.data); // mapping data into edit form
  }

  getErrorMessage(value: string) {
    if (value === 'firstName' || value === 'lastName') {
      return  this.editForm.controls[value].hasError('required')
              ? 'You must enter a value'
              :  ''
    }
    if (value === 'email') {
      return  this.editForm.controls[value].hasError('required')
              ? 'You must enter a value'
              : this.editForm.controls[value].hasError('email')
                ? 'Not a valid email'
                : ''
    }
    if (value === 'password') {
      return  this.editForm.controls[value].hasError('required')
              ? 'You must enter a value'
              : this.editForm.controls[value].hasError('minlength')
                ? 'min lenght 6 characters'
                : ''
    }
  }

  updateUser() {
    this.apiService.updateUser(this.editForm.value).subscribe( _ => {
      this.dialogRef.close();
      
      this.variableService.changeloadingStatus(true);

      setInterval(() => {
        this.variableService.changeloadingStatus(false);
      }, 1000);
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
