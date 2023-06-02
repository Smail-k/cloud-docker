import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import { MenuItemsManager } from './menu-items/menu-items-manager';
import { MenuItemsCollab } from './menu-items/menu-items-collab';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  providers: [MenuItems, MenuItemsManager, MenuItemsCollab]
})
export class SharedModule {}
