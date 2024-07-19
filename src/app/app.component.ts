
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Trainer } from './trainer';
import { TrainerService } from './trainer.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CommonModule, // Add CommonModule here
    FormsModule
  ],
  providers: [
    TrainerService,
    // Add other providers as needed
  ],
})
export class AppComponent implements OnInit {
  selectedDate: string = '';
  public trainers: Trainer[] = []; // Initialize as an empty array
   public deleteTrainer: Trainer | null = null;
   public editTrainer: Trainer | null = null;

  constructor(private trainerservice: TrainerService) {}

  ngOnInit() {
    this.getTrainer();
  }

  public getTrainer(): void {
    this.trainerservice.getTrainer().subscribe(
      (response: Trainer[]) => {
        this.trainers = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTrainer(addForm: NgForm): void {
  document.getElementById('add-trainer-form')?.click();
  if (addForm.invalid) {
    alert('Please fill out the form correctly.');
    return;
  }
  this.trainerservice.addTrainer(addForm.value).subscribe(
    (response: Trainer) => {
      console.log(response);
      this.getTrainer();
      addForm.reset();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    }
  );
}

public onEditTrainer(trainer: Trainer): void {
  if (!trainer || !trainer.id) {
    alert('Invalid trainer data.');
    return;
  }
  this.trainerservice.updateTrainer(trainer).subscribe(
    (response: Trainer) => {
      console.log(response);
      this.getTrainer();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

  public onDeleteTrainer(trainerId : number):void{
    this.trainerservice.deleteTrainer(trainerId).subscribe(
      (response: void) => {
        console.log(response)
        this.getTrainer();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

//To open the add, edit and delete modals 
  public OpenModal(trainer: Trainer | null, mode: string):void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none'; //hides the button in the UI 
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addTrainerModal');

    }if(mode === 'edit'){
      this.editTrainer = trainer;
      button.setAttribute('data-target','#editTrainerModal');

    }if(mode === 'delete'){
      this.deleteTrainer = trainer;
      button.setAttribute('data-target','#deleteTrainerModal');

    }
    container?.appendChild(button);
    button.click();


  }

  public searchTrainers(key:string): void{
    const results : Trainer[] = [];
    for(const trainer of this.trainers){
      if(trainer.fullName.toLowerCase().indexOf(key.toLowerCase())!== -1){
      results.push(trainer);
    }
    }
    this.trainers= results;
    if(results.length == 0 ||!key){
      this.getTrainer();
    }
  }
  validateDate() {
    const currentDate = new Date();
    const selectedDate = new Date(this.selectedDate);

    if (selectedDate > currentDate) {
      // Clear the selected date or take appropriate action
      this.selectedDate = '';
      alert('Please select a date on or before today.');
    }
  }
 
}