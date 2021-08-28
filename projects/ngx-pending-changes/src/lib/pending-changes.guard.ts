import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PendingChangesGuardAllowDeactivateMethod, PendingChangesGuardConfirmMessageMethod, skipIfSameUuidAndReloadQueryParam } from './defaults';
import { PENDING_CHANGES_DEFAULT_MESSAGE, RELOAD_QUERY_PARAM_NAME, SHOULD_ALLOW_NAVIGATION_EXPRESSION } from './tokens';
import { ShouldAllowNavigationExpression } from './types';

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<unknown> {

  constructor(
    @Inject(PENDING_CHANGES_DEFAULT_MESSAGE)
    private readonly defaultMessage = 'There are pending changes. Do you really want to leave the page?',
    @Inject(SHOULD_ALLOW_NAVIGATION_EXPRESSION)
    private readonly shouldAllowNavigationFunc: ShouldAllowNavigationExpression,
    @Inject(RELOAD_QUERY_PARAM_NAME)
    private readonly reloadQueryParamName?: string,
  ) {
    if (typeof this.shouldAllowNavigationFunc !== 'function') {
      this.shouldAllowNavigationFunc = skipIfSameUuidAndReloadQueryParam(this.reloadQueryParamName);
    }
  }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const shouldDeactivateFunc = component[PendingChangesGuardAllowDeactivateMethod];
    if (typeof shouldDeactivateFunc === 'function') {
      const shouldDeactivate = shouldDeactivateFunc();
      if (!shouldDeactivate) {
        if (this.shouldAllowNavigationFunc(component, currentRoute, currentState, nextState)) {
          return true;
        }

        let message = this.defaultMessage;
        const messageFunc = component[PendingChangesGuardConfirmMessageMethod];
        if (typeof messageFunc === 'function') {
          message = messageFunc();
        }

        const forceDeactivate = confirm(message);
        return forceDeactivate;
      }
    }

    return true;
  }

}
