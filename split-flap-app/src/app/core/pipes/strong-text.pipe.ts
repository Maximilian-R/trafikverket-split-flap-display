import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'strongText',
})
export class StrongTextPipe implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	transform(value: string, regex): any {
		return this.sanitize(this.replace(value, regex));
	}

	replace(str, regex) {
		return str.replace(new RegExp(`(${regex})`, 'gi'), '<strong>$1</strong>');
	}

	sanitize(str) {
		return this.sanitizer.sanitize(SecurityContext.HTML, str);
	}
}
