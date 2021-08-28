# ngx-pending-changes

[![npm](https://img.shields.io/npm/v/ngx-pending-changes)](https://www.npmjs.com/package/ngx-pending-changes)
[![Build Status](https://github.com/exportarts/ngx-pending-changes/workflows/ci/badge.svg)](https://github.com/exportarts/ngx-pending-changes/actions)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=exportarts_ngx-pending-changes&metric=alert_status)](https://sonarcloud.io/dashboard?id=exportarts_ngx-pending-changes)

This library allows you to prevent users from navigating away from a page that has pending changes.

## Installation

- `npm i -E ngx-pending-changes`
- Optionally configure the module with [providers in your `app.module.ts`](./projects/ngx-pending-changes/src/lib/tokens.ts)

## Example

#### **`routing.module.ts`**
```ts
const routes: Routes = [
  // ...
  {
    path: `:id`,
    component: DetailComponent,
    resolve: {
      transport: DetailResolver
    },
    // To re-fetch the transport after it has been updated on the detail view
    runGuardsAndResolvers: 'always',
    canDeactivate: [
      PendingChangesGuard
    ]
  },
  // ...
];
```

#### **`detail.component.ts`**
```ts
import { GuardedDetailView, Mode } from 'ngx-pending-changes';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends GuardedDetailView {

  readonly form = new FormGroup({ /* ... */ });

  // This tells the Guard if it should prevent the user from navigating away
  readonly allowDeactivate = () => this.form.pristine;
  override onModeChange(mode: Mode) {
    if (mode === 'edit') {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  // When the form is saved, we change the URL to trigger the resolver
  save() {
    this.dataService.save().pipe(
      switchMap(_ => this.router.navigate([], {
        queryParams: {
          reload: Date.now()
        },
        queryParamsHandling: 'merge'
      })),
      tap(_ => this.mode = 'readonly';)
    ).subscribe();
  }

}
```

## Contributing

Contributions via issues or Pull Requests are welcome!

When making commits, please follow the commit message guidelines from
[conventionalcommits.org](https://www.conventionalcommits.org).
This makes it easy to auto-generate a changelog.

Have a look at previous commits in this repo for examples.
