import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PendingChangesGuardAllowDeactivateMethod, PendingChangesGuardConfirmMessageMethod } from './defaults';

export type ShouldAllowNavigationExpression = (
  component: any,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState?: RouterStateSnapshot
) => boolean;

/**
 * Configuration for the `PendingChangesGuard`.
 */
export interface GuardPendingChanges {

  [PendingChangesGuardAllowDeactivateMethod]: () => boolean;
  [PendingChangesGuardConfirmMessageMethod]?: () => string;

}

export type Mode = 'readonly' | 'edit';
