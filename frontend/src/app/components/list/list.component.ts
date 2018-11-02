import { CocktailService } from 'src/app/services/cocktail/CocktailResource.service';
import { OnInit, Component } from '@angular/core';

@Component({
    templateUrl: 'template.html',
    styleUrls: [
        './styles.scss'
    ]
})
export class ListComponent implements OnInit {
    public isReady = false;
    public cocktails;

    public searchTerm: string;

    public counter = 0;
    public size = 15;
    public pack = [];

    constructor(private cocktailSvc: CocktailService) {}

    ngOnInit() {
    this.cocktailSvc.loadAll()
        .subscribe(cocktails => {
        this.isReady = true;

        this.cocktails = cocktails;
        this.pack = cocktails.slice(0, 15);
        });
    }

    onScroll() {
    this.counter++;
    this.pack = this.cocktails.slice(0, 15 + 15 * this.counter);
    }
}
