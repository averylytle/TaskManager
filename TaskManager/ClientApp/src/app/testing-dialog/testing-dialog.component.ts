import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-testing-dialog',
  templateUrl: './testing-dialog.component.html',
  styleUrls: ['./testing-dialog.component.css']
})
export class TestingDialogComponent implements OnInit {
  form: FormGroup | undefined;
  description: string | undefined;


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<TestingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { description: string }) {

    this.description = data.description;

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, []]

    });
  }

  /*save() {
    this.dialogRef.close(this.form.value ?? ''); 
  }*/

  close() {

    this.dialogRef.close()
  }
}
