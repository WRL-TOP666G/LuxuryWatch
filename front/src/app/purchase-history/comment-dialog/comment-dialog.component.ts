import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit{
  reviewForm: FormGroup;

  @Inject(MAT_DIALOG_DATA) public data: any;
  constructor(
    private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.reviewForm = this.formBuilder.group({
      rating: [5],
      comment: ['', Validators.required]
    });
    // this.data = data;
    //
    // this.stockForm = this._fb.group({
    //   rate: this.rate;
    //   comment: this.comment;
    // });
  }

  ngOnInit(): void {
    // this.stockForm.patchValue(this.data);
    // console.log(this.data);
  }

  onFormSubmit() {
    if (this.reviewForm.valid) {
      this._dialogRef.close(this.reviewForm.value);
    }
  }

  // cancel(){this._dialogRef.close();}
}
