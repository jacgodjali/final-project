import { TestBed, inject } from '@angular/core/testing';

import { TopheaderComponent } from './topheader.component';

describe('a topheader component', () => {
	let component: TopheaderComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TopheaderComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TopheaderComponent], (TopheaderComponent) => {
		component = TopheaderComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});