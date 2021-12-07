import {of, fromEvent} from 'rxjs';
import {map} from 'rxjs/operators';

of(1, 3, 4).pipe(
    map( x => x * x)
).subscribe( data => console.log(data));

