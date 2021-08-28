import { Directive } from '@angular/core';
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

}
