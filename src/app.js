import {of, fromEvent, from, Observable} from 'rxjs';
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

const arraySource = from([1,2,3,4,5]);
arraySource.subscribe(val => console.log("arraySource",val));

const arraySources = of(1,2,3,4,5);
arraySources.subscribe(val => console.log("arraySources",val));

const observable = new Observable(subscriber => {
    subscriber.next(1);
    subscriber.next(2);
    throw 'This is an error';
    subscriber.next(3);
    setTimeout( () => {
        subscriber.next(4);
        subscriber.complete();
    }, 1000);
});

observable.subscribe(
    val => console.log("observable",val),
    err => console.log(err),
    () => {console.log('complete')}
);

document.body.innerHTML = '<p>Loading</p>';

const myPromise = new Promise((resolve, reject ) => {
    console.log('Creating promise');
    setTimeout( () => {
        resolve({
            title: 'WebDev',
            message: 'WebDev is the best!',
            age: 12
        })
    }, 3000)
});

const observableFromPromise = from(myPromise);

observableFromPromise.subscribe( data => {
    document.body.innerHTML = '';
    for(let key in data){
        document.body.insertAdjacentHTML('beforebegin','<p>'+data[key]+'</p>')
    }
});