import { Food } from './../interfaces/food';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private afd: AngularFireDatabase) {
  }

  getFoods(): Observable<Food[]> {
    return this.afd.list('/food-articles').snapshotChanges()
      .pipe(map(changes => changes
        .map((c: any) => {
          let data = c.payload.val();
          const key = c.payload.key;
          data['key'] = key;
          return data;
        })));
  }

  addFoodTodb(foodItem) : Promise<any> {
    let addedDate = Date.now().toString();
    let nutriName = { "a": "Excellent", "b": "Bon", "c": "Moyen", "d": "Médiocre", "e": "Mauvais" };
    const item = {
      id: foodItem.id,
      name: foodItem.product_name_fr,
      brand: foodItem.brands,
      nutriscore: foodItem.nutriscore_grade,
      protein: foodItem.nutriments.proteins_100g,
      fiber: foodItem.nutriments.fiber_100g,
      salt: foodItem.nutriments.salt_100g,
      sugar: foodItem.nutriments.sugars_100g,
      energy: foodItem.nutriments['energy-kcal_100g'],
      nutritionName: nutriName[foodItem.nutriscore_grade],
      imgUrl: foodItem.image_front_small_url,
      addedDate: addedDate
    }
    return this.afd.list('/food-articles').push(item);
  }


  deleteItem(id) : Promise<any> {
    return this.afd.list('/food-articles').remove(id);
  }




}
