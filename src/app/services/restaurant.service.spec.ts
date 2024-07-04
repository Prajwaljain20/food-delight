import { TestBed } from '@angular/core/testing';

import { RestaurantService } from './restaurant.service';
import * as data from '../../assets/data.json';
import * as categoriesJsonData from '../../assets/categories.json';
import * as dishesJsonData from '../../assets/dishes.json';
import { Firestore, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

let restaurantData = data;
let categoriesData = categoriesJsonData;
let dishesData = dishesJsonData;

describe('RestaurantService', () => {
  let service: RestaurantService;
  let firestoreMock: any;

  beforeEach(() => {
    firestoreMock = {
      collection: jasmine.createSpy('collection').and.callFake(() => ({
        valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of([])),
      })),
      doc: jasmine.createSpy('doc').and.callFake(() => ({
        valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({})),
        delete: jasmine.createSpy('delete').and.returnValue(Promise.resolve()),
        set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
      })),
      add: jasmine.createSpy('add').and.returnValue(Promise.resolve()),
    };
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore())
      ],
      providers: [
        RestaurantService,
        { provide: Firestore, useValue: firestoreMock },
      ],
    });
    service = TestBed.inject(RestaurantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all the restaurants', (done) => {
    firestoreMock.collection.and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(restaurantData)),
    });
    service.getAllRestaurants().subscribe(res => {
      expect(res).toEqual(restaurantData);
      done();
    });
  });

  it('should return the restaurant by Id', (done) => {
    firestoreMock.doc.and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(restaurantData[0])),
    });
    service.getRestaurantById('1').subscribe(res => {
      expect(res).toEqual(restaurantData[0]);
      done();
    });
  });

  it('should return all the categories', (done) => {
    firestoreMock.collection.and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(categoriesData)),
    });
    service.getCategories().subscribe(res => {
      expect(res).toEqual(categoriesData);
      done();
    });
  });

  it('should return all the dishes', (done) => {
    firestoreMock.collection.and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of(dishesData)),
    });
    service.getDishesByCategory('1').subscribe(res => {
      expect(res).toEqual(dishesData[0]);
      done();
    });
  });
});
