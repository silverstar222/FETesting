const express = require("express");
const redis = require("redis");
const axios = require("axios");
const _ = require("lodash");
const cors = require('cors');

const app = express();

app.use(cors());

const rdc = redis.createClient({
    host: 'redis'    
});

async function getCachedKey(key) {
    return new Promise((resolve, reject) => {
        if(rdc.exists(key)) {
            rdc.get(key, (err, reply) => {
                if(reply) {
                    return resolve(JSON.parse(reply));
                } else {
                    return resolve(null);
                }
            });
        } else {
            return resolve(null);
        }
    });
}

async function loadAll() {
    let cocktails$ = await axios.get('http://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass')

    switch(cocktails$.status) {
        case 200:

            cocktails = _.map(cocktails$.data.drinks, drink$ => {
                return {
                    id: drink$['idDrink'],
                    title: drink$['strDrink'],
                    image: drink$['strDrinkThumb']
                }
            });

            rdc.set('cocktails', JSON.stringify(cocktails));
            return cocktails;

        default:
            console.log(cocktails$);
            throw new Error('Failed to fetch cocktail data')
    }
}

async function loadById(id) {
    let cocktails$ = await axios.get(`http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)

    switch(cocktails$.status) {
        case 200:
            let drink$ = _.first(cocktails$.data.drinks);

            let drink = {
                id: drink$['idDrink'],
                alcoholic: drink$['strAlcoholic'],
                category: drink$['strCategory'],
                name: drink$['strDrink'],
                name_de: drink$['strDrinkDE'],
                name_se: drink$['strDrinkES'],
                name_fr: drink$['strDrinkFR'],
                image: drink$['strDrinkThumb'],
                glass: drink$['strGlass'],
                ingridients: [],
                measurements: [],
                instructions: drink$['strInstructions'],
                instructions_de: drink$['strInstructionsDE'],
                instructions_es: drink$['strInstructionsES'],
                instructions_fr: drink$['strInstructionsFR'],
                video: drink$['strVideo'],
                modified: drink$['dateModified']
            };

            for(let i = 1; i<=15; i++) {
                if(drink$[`strIngredient${i}`] && !_.isEmpty(_.trim(drink$[`strIngredient${i}`]))) {
                    drink.ingridients.push(_.trim(drink$[`strIngredient${i}`]));
                }

                if(drink$[`strMeasure${i}`] && !_.isEmpty(_.trim(drink$[`strMeasure${i}`]))) {
                    drink.measurements.push(_.trim(drink$[`strMeasure${i}`]));
                }
            }

            rdc.set(`cocktail:${id}`, JSON.stringify(drink));

            return drink;

        default:
            console.log(cocktails$);
            throw new Error('Failed to fetch cocktail data')
    }
}

app.get('/ping', function(req, res) {
    res.send('pong');
});

app.get('/cocktails', async function(req, res) {
    try {
        let cocktails = [];

        if(rdc.exists('cocktails')) {
            cocktails = await getCachedKey('cocktails');

            if(!cocktails) {
                cocktails = await loadAll();    
            }
        } else {
            cocktails = await loadAll();
        }

        res.write(JSON.stringify({
            success: true,
            drinks: cocktails
        }));
    } catch (e) {
        res.write(JSON.stringify({
            error: e.message
        }));
    }

    res.end();
});

app.get('/cocktails/:id', async function(req, res) {
    try {
        let drink;

        if(rdc.exists(`cocktail:${req.params.id}`)) {
            drink = await getCachedKey(`cocktail:${req.params.id}`);

            if(!drink) {
                drink = await loadById(req.params.id);
            }
        } else {
            drink = await loadById(req.params.id);
        }

        res.write(JSON.stringify({
            success: true, 
            drink: drink
        }));
    } catch (e) {
        res.write(JSON.stringify({
            error: e.message
        }));

        console.warn(e);
    }

    res.end();
});

app.listen(1080, function () {
    console.log('Server is listening on port 1080');
});