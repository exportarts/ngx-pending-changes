import { Directive, HostListener } from '@angular/core';
import { GuardPendingChanges, Mode } from './types';

@Directive()
export abstract class GuardedDetailView implements GuardPendingChanges {

  abstract allowDeactivate(): boolean;
  abstract save(): void;
  onModeChange(mode: Mode) {}

  private _mode: Mode = 'readonly';
  get mode() {
    return this._mode;
  };
  set mode(mode: Mode) {
    this._mode = mode;
    this.onModeChange(mode);
  }

  /**
   * Handle closing or reloading of the page.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
   */
  @HostListener('window:beforeunload', ['$event'])
  private onBeforeUnload(event: BeforeUnloadEvent) {
    if (!this.allowDeactivate()) {
      event.preventDefault();
      event.returnValue = '';
    }
  }

}
