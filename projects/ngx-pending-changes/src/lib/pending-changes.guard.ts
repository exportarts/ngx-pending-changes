import { Inject, Injectable, isDevMode, Optional } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { defaultMessage, getDeactivateMessageMethodName, skipIfSameUuidAndReloadQueryParam } from './defaults';
import { GuardedComponent } from './guarded.component';
import { PENDING_CHANGES_DEFAULT_MESSAGE, RELOAD_QUERY_PARAM_NAME, SHOULD_ALLOW_NAVIGATION_EXPRESSION } from './tokens';
import { ShouldAllowNavigationExpression } from './types';

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<GuardedComponent> {

  private readonly defaultMessageIsUsed: boolean = false;

  constructor(
    @Inject(PENDING_CHANGES_DEFAULT_MESSAGE)
    @Optional()
    private readonly message?: string,
    @Inject(SHOULD_ALLOW_NAVIGATION_EXPRESSION)
    @Optional()
    private readonly shouldAllowNavigationFunc?: ShouldAllowNavigationExpression,
    @Inject(RELOAD_QUERY_PARAM_NAME)
    @Optional()
    private readonly reloadQueryParamName?: string,
  ) {
    if (typeof this.shouldAllowNavigationFunc !== 'function') {
      this.shouldAllowNavigationFunc = skipIfSameUuidAndReloadQueryParam(this.reloadQueryParamName);
    }
    if (!message) {
      this.message = defaultMessage;
      this.defaultMessageIsUsed = true;
    }
  }

  canDeactivate(
    component: GuardedComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (typeof component.allowDeactivate !== 'function') {
      console.error(component);
      throw new Error(`[ngx-pending-changes] Your component must extend the \`${GuardedComponent.name}\` class.`);
    }

    if (component.allowDeactivate()) {
      return true;
    }

    if (typeof this.shouldAllowNavigationFunc === 'function') {
      if (this.shouldAllowNavigationFunc(component, currentRoute, currentState, nextState)) {
        return true;
      }
    }

    let message = this.message;
    if (typeof component.getDeactivateMessage === 'function') {
      message = component.getDeactivateMessage();
    } else {
      if (this.defaultMessageIsUsed && isDevMode()) {
        console.warn(`[ngx-pending-changes] The default message is used in the confirm dialog. You can use either the ${PENDING_CHANGES_DEFAULT_MESSAGE.toString()} injection token or implement the ${getDeactivateMessageMethodName}() method to provide a custom message. This warning will not be shown in prod mode.`);
      }
    }

    const forceDeactivate = confirm(message);
    return forceDeactivate;
  }

}
