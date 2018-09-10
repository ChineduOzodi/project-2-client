import { TestBed, inject } from '@angular/core/testing';

import { NutrientService } from './nutrient.service';

describe('NutrientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NutrientService]
    });
  });

  it('should be created', inject([NutrientService], (service: NutrientService) => {
    expect(service).toBeTruthy();
  }));
});
