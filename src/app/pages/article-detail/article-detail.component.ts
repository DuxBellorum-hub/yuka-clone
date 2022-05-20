import { Subscription } from 'rxjs';
import { Food } from './../../interfaces/food';
import { FirebaseService } from './../../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {

  id: number;
  food: Food | Food[];
  key: string;
  subFood: Subscription;


  @Input() idArticle: any;

  constructor(private activRoute: ActivatedRoute, private fbService: FirebaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.idArticle || +this.activRoute.snapshot.paramMap.get('id');
    this.key = this.activRoute.snapshot.queryParamMap.get("clé");

    this.subFood = this.fbService.getFoods().subscribe((datas: Food[]) => {
      this.food = datas.filter((d: Food) => +d.addedDate == this.id);
      console.log(this.food);
    });
  }
  deleteItem(): void {
    this.fbService.deleteItem(this.key)
      .then(() => this.router.navigate(['/']))
      .catch(e => console.log(e))
  }

  ngOnDestroy(): void {
    this.subFood.unsubscribe();

  }


}
