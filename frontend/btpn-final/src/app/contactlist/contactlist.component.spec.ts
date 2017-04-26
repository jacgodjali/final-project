import { TestBed, inject } from '@angular/core/testing';

import { ContactlistComponent } from './contactlist.component';

describe('a navigator component', () => {
	let component: ContactlistComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContactlistComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ContactlistComponent], (ContactlistComponent) => {
		component = ContactlistComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});