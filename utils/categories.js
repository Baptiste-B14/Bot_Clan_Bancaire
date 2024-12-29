import { Model as armed_entity } from '../models/armed_entity.js';
import { Model as planet } from '../models/2-planet.js';
import { Model as ressource } from '../models/ressource.js';
import { simpleSelect, selectWithWhere } from './queries.js';


export const category = [
    {label : "Vaisseaux", value: "Vaisseaux"},
    {label : "Marcheurs et speeder", value: "Marcheurs et speeder"},
    {label : "Troupes", value: "Troupes"},
    {label : "Planètes", value: "Planètes"},
    {label : "Ressources", value: "Ressources"},
    {label : "Autres", value: "Autres"},
   
    
]


export async function category_value(options) {
    let result = [];

    for (const option of options) {
        if (option == 'Vaisseaux') {
            const data = await selectWithWhere(
                armed_entity,
                ['name'],
                {
                    class: [
                        'Navettes Personnelles',    
                        'Véhicules Aériens',
                        'Véhicules Moyens',
                        'Véhicules Lourds',
                        'Véhicules Légers'
                    ]
                }, false
            );
            result = result.concat(data); 
        }
        if (option == 'Marcheurs et speeder') {
            const data = await selectWithWhere(
                armed_entity,
            ['name'],
            {
                class: ['']
            }, false)
            result = result.concat(data);
        }

        if (option == 'Troupes') {
            const data = await selectWithWhere(
                armed_entity,
            ['name'],
            {
                class: ['Troupes terrestres']
            }, false)
            result = result.concat(data);
        }

        if (option == 'Planètes') {
            const data = await simpleSelect(
                planet,
            ['name'],
            false)
            result = result.concat(data);
        }

        if (option == 'Ressources') {
            const data = await selectWithWhere(
                armed_entity,
            ['name'],
            false)
            result = result.concat(data);
        }
    }

    return result;
}
