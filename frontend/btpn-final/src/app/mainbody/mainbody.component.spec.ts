import { TestBed, inject } from '@angular/core/testing';

import { MainbodyComponent } from './mainbody.component';

describe('a mainbody component', () => {
	let component: MainbodyComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				MainbodyComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([MainbodyComponent], (MainbodyComponent) => {
		component = MainbodyComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});