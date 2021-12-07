import {of, fromEvent} from 'rxjs';
import {map, scan} from 'rxjs/operators';

of(1, 3, 4).pipe(
    map( x => x * x)
).subscribe( data => console.log(data));

fromEvent(document, 'click').pipe(
    scan(count => count + 1, 0)
).subscribe(count => {
    console.log('fromEvent',count);
    console.log(`Clicked ${count} times`)
})

let cnt = 0;
document.addEventListener('click', (event) => {
    console.log(event)
    cnt = cnt + 1;
    console.log('eventListener',cnt);
})