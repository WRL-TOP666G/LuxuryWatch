import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-quantity',
  templateUrl: './update-quantity.component.html',
  styleUrls: ['./update-quantity.component.scss']
})
export class UpdateQuantityComponent implements OnInit {
  stockForm: FormGroup;

  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateQuantityComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.data = data;

    this.stockForm = this._fb.group({
      quantity: data,
    });
  }

  ngOnInit(): void {
    this.stockForm.patchValue(this.data);
    console.log(this.data);
  }

  onFormSubmit() {
    if (this.stockForm.valid) {
      this._dialogRef.close(this.stockForm.value);
    }
  }
}
