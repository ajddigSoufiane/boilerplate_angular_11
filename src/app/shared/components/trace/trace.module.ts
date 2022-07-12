import { NgModule } from '@angular/core';
import { TraceComponent } from './trace.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule( {
    imports: [
        TranslateModule
    ],
    declarations: [
        TraceComponent
    ]
    , exports: [TraceComponent]

} )
export class TraceModule {
}
