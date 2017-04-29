import { TestBed, inject } from '@angular/core/testing';

import { AddedComponent } from './added.component';

describe('a added component', () => {
	let component: AddedComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AddedComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([AddedComponent], (AddedComponent) => {
		component = AddedComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});