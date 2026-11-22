import { InjectionToken, type WritableSignal } from '@angular/core';

export interface UwItemApi {
  expanded: WritableSignal<boolean>;
  toggle: () => void;
}

export const UW_ACCORDION_ITEM = new InjectionToken<UwItemApi>('UW_ACCORDION_ITEM');
