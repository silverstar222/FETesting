import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface DrinkDetailed {
    id: number;
    alcoholic: string;
    category: string;
    name: string;
    name_de: string;
    name_se: string;
    name_fr: string;
    image: string;
    glass: string;
    ingridients: string[];
    measurements: string[];
    instructions: string;
    instructions_de: string;
    instructions_es: string;
    instructions_fr: string;
    video: string;
    modified: string;
}

export interface DrinkSimplified {
    id: number;
    title: string;
    image: string;
}

@Injectable()
export class CocktailService {
    constructor(private http: HttpClient) {
    }

    loadAll(): Observable<DrinkSimplified[]> {
        return this.http.get(`${environment.api.url}/cocktails`)
            .pipe(
                map(response => {
                    return response['drinks'];
                })
            );
    }

    loadById(id: number): Observable<DrinkDetailed> {
        return this.http.get(`${environment.api.url}/cocktails/${id}`)
            .pipe(
                map(response => {
                    return response['drink'];
                })
            );
    }
}
