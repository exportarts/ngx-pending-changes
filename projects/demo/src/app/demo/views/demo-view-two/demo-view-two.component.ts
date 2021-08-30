import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GuardedComponent } from 'projects/ngx-pending-changes/src/public-api';

@Component({
  selector: 'app-demo-view-two',
  templateUrl: './demo-view-two.component.html',
  styleUrls: ['./demo-view-two.component.scss']
})
export class DemoViewTwoComponent extends GuardedComponent implements OnInit {

  readonly form = new FormGroup({
    age: new FormControl(null)
  });

  allowDeactivate = () => this.form.pristine;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
