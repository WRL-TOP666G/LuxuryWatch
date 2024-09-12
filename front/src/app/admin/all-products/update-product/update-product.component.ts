import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  stockForm: FormGroup;

  @Inject(MAT_DIALOG_DATA) public data: any;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.data = data;
    this.stockForm = this._fb.group({
      stock: data.stock,
    });
  }

  ngOnInit(): void {
    this.stockForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.stockForm.valid) {
      this._dialogRef.close(this.stockForm.value);
    }
  }
}
