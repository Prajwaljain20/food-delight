import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IRestaurant } from '../models/restaurant.interface';
import { ICategories } from '../models/categories.interface';
import { IDishes } from '../models/dishes.interface';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private firestore: Firestore) { }

  getCategories(): Observable<ICategories[]> {
    const ref = collection(this.firestore, 'categories');
    return (collectionData(ref, { idField: 'id' }) as unknown) as Observable<ICategories[]>;
  }

  getAllRestaurants(): Observable<IRestaurant[]> {
    const ref = collection(this.firestore, 'restaurants');
    return (collectionData(ref, { idField: 'id' }) as unknown) as Observable<IRestaurant[]>;
  }

  getRestaurantById(id: string): Observable<IRestaurant> {
    const ref = doc(this.firestore, 'restaurants', id);
    return (docData(ref, {idField: 'id'}) as unknown) as Observable<IRestaurant>;
  }

  deleteRestaurantById(id: string) {
    const ref = doc(this.firestore, 'restaurants', id);
    return deleteDoc(ref);
  }

  updateRestaurantById(request: IRestaurant) {
    const ref = doc(this.firestore, 'restaurants', request.id);
    return setDoc(ref, request);
  }

  addRestaurant(request: IRestaurant) {
    const ref = collection(this.firestore, 'restaurants');
    return addDoc(ref, request);
  }

  getDishesByCategory(id: string): Observable<IDishes> {
    const ref = doc(this.firestore, 'dishes', id);
    return (docData(ref) as unknown) as Observable<IDishes>;
  }
}
