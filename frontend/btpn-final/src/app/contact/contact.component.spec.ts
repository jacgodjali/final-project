import { TestBed, inject } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('a contact component', () => {
	let component: ContactComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ContactComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([ContactComponent], (ContactComponent) => {
		component = ContactComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});