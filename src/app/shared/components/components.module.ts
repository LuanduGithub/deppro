import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


import { HeaderComponent } from './header/header.component';
import { PopoverComponent } from './popover/popover.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    declarations: [HeaderComponent, PopoverComponent],
    exports: [HeaderComponent, PopoverComponent],
    entryComponents: [],
})
export class ComponentsModule {
}
