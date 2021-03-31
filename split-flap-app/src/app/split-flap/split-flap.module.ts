import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitFlapComponent } from './split-flap.component';
import { SplitFlapExampleComponent } from './example/split-flap-example.component';

@NgModule({
	declarations: [SplitFlapComponent, SplitFlapExampleComponent],
	imports: [CommonModule],
	exports: [SplitFlapComponent, SplitFlapExampleComponent],
})
export class SplitFlapModule {}
