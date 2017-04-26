import { TestBed, inject } from '@angular/core/testing';

import { SidelistComponent } from './sidelist.component';

describe('a sidelist component', () => {
	let component: SidelistComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SidelistComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SidelistComponent], (SidelistComponent) => {
		component = SidelistComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});