import { OnInit, Component } from '@angular/core';
import { CocktailService } from 'src/app/services/cocktail/CocktailResource.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'template.html',
    styleUrls: [
        './styles.scss'
    ]
})
export class ViewComponent implements OnInit {
    public id;

    public isReady = false;
    public drink;

    public counter = 0;
    public size = 15;
    public pack = [];

    constructor(private cocktailSvc: CocktailService, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        this.cocktailSvc.loadById(this.id)
            .subscribe(cocktail => {
                this.isReady = true;
                this.drink = cocktail;
            });
    }
}

