import { InjectionToken } from '@angular/core';
import { ShouldAllowNavigationExpression } from './types';

/**
 * Provide this token to overwrite the message that is shown in the
 * `confirm()` dialog when the user tries to navigate away and has pending changes.
 */
export const PENDING_CHANGES_DEFAULT_MESSAGE = new InjectionToken<string>('PENDING_CHANGES_DEFAULT_MESSAGE');

/**
 * If the default `SHOULD_SKIP_GUARD_EXPRESSION` is used, it checks if a query param
 * with this name is present to determine if the navigation took place just to reload
 * the current page with updated data.
 */
export const RELOAD_QUERY_PARAM_NAME = new InjectionToken<string>('RELOAD_TABLE_FROM_NETWORK');

/**
 * You can provide a function that determines if the current navigation should be
 * allowed.
 *
 * For example, if you use `router.navigate([])` on the same page to reload data in the
 * resolvers, you want to allow the navigation.
 *
 * The implementation depends on your routing structure and how you want to handle reloads.
 * Have a look at the default implementation and adapt it to your needs.
 */
export const SHOULD_ALLOW_NAVIGATION_EXPRESSION = new InjectionToken<ShouldAllowNavigationExpression>('SHOULD_ALLOW_NAVIGATION_EXPRESSION');
