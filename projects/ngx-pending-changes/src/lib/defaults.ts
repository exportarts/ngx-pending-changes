import { ShouldAllowNavigationExpression } from './types';

const uuidRegex = /(\w|\d){8}-((\w|\d){4}-){3}(\w|\d){12}/;

/**
 * Creates a `ShouldAllowNavigationExpression` with the following behaviour.
 *
 * It expects a URL structure in which the current record is represented by its uuid,
 * for example `/users/f2b51687-84cb-477c-b8e3-9d982a2d882f`.
 *
 * When the record's data is changed, the host component triggers a reload and places
 * the `reloadQueryParam`. The changing param is important to trigger route resolvers.
 *
 * This behaviour assumes the usage of the `runGuardsAndResolvers: 'always'` route config.
 */
export const skipIfSameUuidAndReloadQueryParam: (reloadQueryParamName?: string) => ShouldAllowNavigationExpression = (reloadQueryParamName = 'reload') => {
  return (
    component,
    currentRoute,
    currentState,
    nextState
  ) => {
    const currentUuid = (uuidRegex.exec(currentState.url) || [])[0];
    // If the next URL is in the same "scope" as the current UUID, we should
    // allow it. This is likely an empty navigation to re-run the resolver.
    const shouldSkipCheckRegex = new RegExp(`\/${currentUuid}.*(\\?|&)${reloadQueryParamName}=\\d{13}`);

    return shouldSkipCheckRegex.test(nextState?.url || '');
  }
}

export const PendingChangesGuardAllowDeactivateMethod = 'allowDeactivate';
export const PendingChangesGuardConfirmMessageMethod = 'forceDeactivateMessage';
