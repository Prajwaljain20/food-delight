import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRestaurantComponent } from './add-edit-restaurant.component';
import { RouterTestingModule } from '@angular/router/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';

describe('AddEditRestaurantComponent', () => {
  let component: AddEditRestaurantComponent;
  let fixture: ComponentFixture<AddEditRestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatListModule
      ],
      declarations: [AddEditRestaurantComponent]
    });
    fixture = TestBed.createComponent(AddEditRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
