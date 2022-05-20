import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((Date.now() - value) / 1000);
            if (seconds < 29)
                return 'à l\'instant';
            const intervals: { [key: string]: number } = {
                'ans': 31536000,
                'mois': 2592000,
                'semaines': 604800,
                'jours': 86400,
                'heures': 3600,
                'minutes': 60,
                'secondes': 1
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return 'il y a ' + counter + ' ' + i;
                    } else {
                        return 'il y a ' + counter + ' ' + i;
                    }
            }
        }
        return value;
    }

}
