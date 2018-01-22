import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'bookFilter'})
export class BookFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string=args?args.toLocaleLowerCase():null;
        return filter?value.filter((book) => 
            book.title.toLocaleLowerCase().startsWith(filter)!=false) : value;
    }
}