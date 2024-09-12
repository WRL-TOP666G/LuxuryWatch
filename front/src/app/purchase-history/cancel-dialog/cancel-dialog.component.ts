import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";

@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-dialog.component.html',
  styleUrls: ['./cancel-dialog.component.scss']
})
export class CancelDialogComponent {
  cancelForm: FormGroup;

  @Inject(MAT_DIALOG_DATA) public data: any;
  constructor(
    private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.cancelForm = this.formBuilder.group({
      // rating: [5],
      // comment: ['', Validators.required],
      cancel: false
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.cancelForm.valid) {
      this._dialogRef.close(this.cancelForm.value);
    }
  }

}
