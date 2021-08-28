import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PENDING_CHANGES_DEFAULT_MESSAGE, RELOAD_QUERY_PARAM_NAME } from './tokens';

const PendingChangesGuardAllowDeactivateMethod = 'allowDeactivate';
const PendingChangesGuardConfirmMessageMethod = 'forceDeactivateMessage';

/**
 * Configuration for the `PendingChangesGuard`.
 */
export interface GuardPendingChanges {

  [PendingChangesGuardAllowDeactivateMethod]: () => boolean;
  [PendingChangesGuardConfirmMessageMethod]?: () => string;

}

const uuidRegex = /(\w|\d){8}-((\w|\d){4}-){3}(\w|\d){12}/;

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<unknown> {

  constructor(
    @Inject(RELOAD_QUERY_PARAM_NAME)
    private readonly reloadQueryParamName = 'reload',
    @Inject(PENDING_CHANGES_DEFAULT_MESSAGE)
    private readonly defaultMessage = 'There are pending changes. Do you really want to leave the page?'
  ) {}

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentUuid = (uuidRegex.exec(currentState.url) || [])[0];
    // If the next URL is in the same "scope" as the current UUID, we should
    // allow it. This is likely an empty navigation to re-run the resolver.
    const shouldSkipCheckRegex = new RegExp(`\/${currentUuid}.*(\\?|&)${this.reloadQueryParamName}=\\d{13}`);

    const shouldDeactivateFunc = component[PendingChangesGuardAllowDeactivateMethod];
    if (typeof shouldDeactivateFunc === 'function') {
      const shouldDeactivate = shouldDeactivateFunc();
      if (!shouldDeactivate) {
        if (shouldSkipCheckRegex.test(nextState?.url || '')) {
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
