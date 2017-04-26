import { TestBed, inject } from '@angular/core/testing';

import { SearchtoolComponent } from './searchtool.component';

describe('a searchtool component', () => {
	let component: SearchtoolComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				SearchtoolComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([SearchtoolComponent], (SearchtoolComponent) => {
		component = SearchtoolComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});