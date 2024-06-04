import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemposReligiosoComponent } from './tempos-religioso.component';

describe('TemposReligiosoComponent', () => {
  let component: TemposReligiosoComponent;
  let fixture: ComponentFixture<TemposReligiosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemposReligiosoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemposReligiosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
