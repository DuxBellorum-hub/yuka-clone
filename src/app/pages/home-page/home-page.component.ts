import { Food } from './../../interfaces/food';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { BarcodeScanResult, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";
import { ToastController } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {

  result: BarcodeScanResult;
  url: string = "https://world.openfoodfacts.org/api/v0/product/";
  api_response_raw;
  api_response;
  dbFood: Food[];
  foodsSubscription$ : Subscription;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private router: Router,
    private fbService: FirebaseService
  ) {

  }


  ngOnInit(): void {
   this.foodsSubscription$ =  this.fbService.getFoods().subscribe(datas => this.dbFood = datas);
  }

  scanBarcode(): void {
    const options: BarcodeScannerOptions = {
      prompt: 'pointez votre caméra sur un code barre',
      torchOn: false
    };
    this.barcodeScanner.scan(options)
      .then(res => {
        this.result = res;
        this.getArticleByBarcode(res.text);
      })
      .catch(err => this.toast(err));

  }

  async toast(err): Promise<any> {
    let toast = await this.toastCtrl.create({
      message: err.message
    });
    toast.present();
  }

  getArticleByBarcode(code: string): void {
    this.http.get<HttpClient>(this.url + code)
      .subscribe(data => this.displayResult(data), error => this.handleError(error));
  }

  displayResult(data: any): void {
    this.api_response_raw = data;
    this.api_response = data;
    this.addArticleToFavorite(this.api_response.product);
  }

  handleError(error): void {
    console.log(error.message);
  }

  addArticleToFavorite(foodItem: Food): void {
    this.fbService.addFoodTodb(foodItem).catch(e => console.log(e));
  }

  goToDetail(id: string, key: string): void {
    this.router.navigate(["detail/", id], { queryParams: { clé: key } });
  }

  ngOnDestroy(): void {
    this.foodsSubscription$.unsubscribe()

  }
}
