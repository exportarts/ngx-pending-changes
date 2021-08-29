import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GuardedComponent } from './guarded.component';

export type ShouldAllowNavigationExpression = (
  component: GuardedComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
) => boolean;
