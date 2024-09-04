import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsCreatedComponent } from './projects-created.component';

describe('ProjectsCreatedComponent', () => {
  let component: ProjectsCreatedComponent;
  let fixture: ComponentFixture<ProjectsCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
