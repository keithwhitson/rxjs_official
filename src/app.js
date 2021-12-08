import {of, fromEvent, from, Observable, interval, range} from 'rxjs';
import {map, scan, take, pluck, mergeWith, concatWith, delay, mergeMap, switchMap, exhaustMap, concatMap} from 'rxjs/operators';

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

const source = interval(1000);
source.pipe(
    scan( val => val + 3),
    take(4)
).subscribe(val => console.log(val));

const source2 = range(1, 3);
source2.subscribe( val => console.log('source2: ',val));





const myPromise2 = new Promise((resolve, reject ) => {
    console.log('Creating promise');
    setTimeout( () => {
        resolve({
            title: 'WebDev',
            message: 'WebDev is the best!',
            age: 12
        })
    }, 3000)
});

const observableFromPromise2 = from(myPromise2);

observableFromPromise2.pipe( map(data => data.age)).subscribe( data => {
    document.body.insertAdjacentHTML('beforebegin','<p> Mapped Age: '+data+'</p>')
});




const myPromise3 = new Promise((resolve, reject ) => {
    console.log('Creating promise');
    setTimeout( () => {
        resolve({
            title: 'WebDev',
            message: 'WebDev is the best!',
            age: 12
        })
    }, 3000)
});

const observableFromPromise3 = from(myPromise3);

observableFromPromise3.pipe( pluck('age')).subscribe( data => {
    document.body.insertAdjacentHTML('beforebegin','<p> Plucked Age: '+data+'</p>')
});


// let example = concatWith(
//     of(1).pipe(delay(1000)),
//     of(2),
//     of(3)
// );

// example.subscribe( val => console.log(val))

// example.subscribe(val => console.log(val))

fromEvent(document, 'click').pipe(
    mergeMap(() => interval(1000))
).subscribe(val => console.log('mergeMap: ',val));



fromEvent(document, 'click').pipe(
    switchMap(() => interval(1000))
).subscribe(val => console.log('switchMap: ',val));

fromEvent(document, 'click').pipe(
    exhaustMap(() => interval(1000).pipe(take(5)))
).subscribe(val => console.log('exhaustMap: ',val));

fromEvent(document, 'click').pipe(
    concatMap(() => interval(1000).pipe(take(5)))
).subscribe(val => console.log('concatMap: ',val));

fromEvent(document, 'click').pipe(
    mergeMap(() => interval(1000))
).subscribe(val => console.log('mergeMap: ',val));