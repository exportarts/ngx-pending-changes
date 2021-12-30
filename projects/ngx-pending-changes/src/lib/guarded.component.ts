import { Directive, HostListener } from '@angular/core';
import { getDeactivateMessageMethodName } from './defaults';

@Directive()
export abstract class GuardedComponent {

  /**
   * This method is called in the `PendingChangesGuard` to determine if
   * your component is ready for deactivation.
   *
   * @example
   * ```ts
   * allowDeactivate = () => this.form.pristine;
   * ```
   */
  abstract allowDeactivate(): boolean;

  /**
   * Overwrite the message that is displayed in the confirmation dialog
   * when the component has pending changes.
   *
   * A generic message can be provided with the `PENDING_CHANGES_DEFAULT_MESSAGE`
   * injection token. Otherwise, a default message is used.
   *
   * Note that this message is only shown when navigation inside your app happens.
   * When the page is reloaded or closed, the browser shows a default message.
   */
  [getDeactivateMessageMethodName]?(): string;

  /**
   * Handle closing or reloading of the page.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
   */
  @HostListener('window:beforeunload', ['$event'])
  private onBeforeUnload(event: BeforeUnloadEvent): void {
    if (!this.allowDeactivate()) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

}
