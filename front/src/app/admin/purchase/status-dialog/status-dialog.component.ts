import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommentDialogComponent} from "../../../purchase-history/comment-dialog/comment-dialog.component";

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent {
  disabledCancel = false;
  disabledComplete = false;
  statusForm: FormGroup;

  @Inject(MAT_DIALOG_DATA) public data: any;
  constructor(
    private formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
  ) {
    this.statusForm = this.formBuilder.group({
      // rating: [5],
      // comment: ['', Validators.required],
      cancel: false,
      complete: false
    });
  }

  ngOnInit(): void {}

  onFormSubmit() {
    if (this.statusForm.valid) {
      // console.log('status form: ', this.statusForm.value);
      this._dialogRef.close(this.statusForm.value);
    }
  }

  doDisCancel(){
    this.disabledCancel = !this.disabledCancel;
  }

  doDisComplete(){
    this.disabledComplete = !this.disabledComplete;
  }

}
