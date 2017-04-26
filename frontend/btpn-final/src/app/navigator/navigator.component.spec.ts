import { TestBed, inject } from '@angular/core/testing';

import { NavigatorComponent } from './navigator.component';

describe('a navigator component', () => {
	let component: NavigatorComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				NavigatorComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([NavigatorComponent], (NavigatorComponent) => {
		component = NavigatorComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});