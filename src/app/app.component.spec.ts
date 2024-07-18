// import { TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { TrainerService } from './trainer.service';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { Trainer } from './trainer';
// import { of } from 'rxjs';

// describe('AppComponent', () => {
//   let httpTestingController: HttpTestingController;
//   let fixture: any;
//   let app: AppComponent;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       declarations: [AppComponent],
//       providers: [TrainerService]
//     }).compileComponents();

//     httpTestingController = TestBed.inject(HttpTestingController);
//     fixture = TestBed.createComponent(AppComponent);
//     app = fixture.componentInstance;
//   });

//   afterEach(() => {
//     // After each test, assert that there are no outstanding requests.
//     httpTestingController.verify();
//   });

//   it('should create the app', () => {
//     expect(app).toBeTruthy();
//   });

//   it('should render title', () => {
//     fixture.detectChanges();
//     const compiled = fixture.nativeElement as HTMLElement;
//     expect(compiled.querySelector('h1')?.textContent).toContain('Hello, angular_fitness');
//   });

//   it('should get and display trainers', () => {
//     // Arrange: Set up the mock data
//     const mockTrainers: Trainer[] = [
//       { id: 1, name: 'Trainer One' },
//       { id: 2, name: 'Trainer Two' }
//     ];

//     // Act: Trigger the `getTrainer` method
//     app.getTrainer();

//     // Assert: Verify the HTTP request and response
//     const req = httpTestingController.expectOne('http://localhost:3000/trainers'); // Use the actual API URL
//     expect(req.request.method).toEqual('GET');
//     req.flush(mockTrainers); // Respond with the mock data

//     // Check if the `trainers` property has been set correctly
//     fixture.detectChanges(); // Trigger change detection
//     expect(app.trainers).toEqual(mockTrainers);
//   });
// });
