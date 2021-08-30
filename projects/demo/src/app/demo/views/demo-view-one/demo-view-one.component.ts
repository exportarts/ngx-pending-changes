import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GuardedComponent } from 'ngx-pending-changes';

@Component({
  selector: 'app-demo-view-one',
  templateUrl: './demo-view-one.component.html',
  styleUrls: ['./demo-view-one.component.scss']
})
export class DemoViewOneComponent extends GuardedComponent implements OnInit {

  readonly form = new FormGroup({
    name: new FormControl(null)
  });

  allowDeactivate = () => this.form.pristine;
  getDeactivateMessage = () => `View 1 has pending changes! This message comes from the component. Navigate away?`;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
