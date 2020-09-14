
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

let sum = (salaries) => {
    let total = 0;

    for(const [_, value] of Object.entries(salaries)) {
        total += value;
    }

    return total;
}


console.log(sum(salaries));

let sum1 = (salaries) => {
    let total = 0;

    for(let key in salaries) {
        total = total + salaries[key];
    }

    return total;
}

console.log(sum1(salaries));


// 함수 호출 전
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
}

let multiplyNumeric = (menu) => {
    for(let key in menu) {
        if(typeof menu[key] === 'number') {
            menu[key] *= 2;
        }
    }

    console.log(menu);
}

multiplyNumeric(menu);

let dest = {};
Object.assign(dest, menu);

console.log(dest)


Object.assign(dest, {"key": "value"})

console.log(dest);

console.log(Object.assign({}, {"name": "haekyu"}))


let calculator = {
    first: 0,
    second: 0,
    read() {
        //  this.first = prompt("첫번째 숫자 입력") ;
        //  this.second = prompt("두번째 숫자 입력") ;
    },
    sum() {
        return this.first + this.second;
    },
    mul() {
        return this.first * this.second;
    },
}

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());

let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep: function() { // 사다리에서 몇 번째 단에 올라와 있는지 보여줌
        console.log( this.step );
        return this;
    }
};

ladder.up().up().up().up().down().showStep();


let obj = {};
function A() { return obj; }
function B() { return obj; }

let a = new A;
let b = new B;

console.log( a == b ); // true

function Calc(first, second) {
    this.first = first;
    this.second = second;

    this.read = function() {

    }

    this.sum = function() {
        return this.first + this.second;
    }

    this.mul = function() {
        return this.first * this.second;
    }
}


let calc = new Calc(5,10);
calc.read();

console.log( "Sum=" + calc.sum() );
console.log( "Mul=" + calc.mul() );



// optional chaining

let haekyu = {
    name: "haekyu",
    age: 40,
    company: {
        name: "nhn",
        team: "FE"
    }
}

console.log(haekyu?.company?.name)
console.log(haekyu?.companya?.name)


let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        console.log(`hint: ${hint}`);
        return hint == "string" ? `{name: "${this.name}"}` : this.money;
    }
};

// 데모:
console.log(user); // hint: string -> {name: "John"}
console.log(+user); // hint: number -> 1000
console.log(user + 500); // hint: default -> 1500



function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

let counter = makeCounter();

console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter.count)

function f() {
    let value = Math.random();

    function g() {
        console.log(value);
    }

    return g;
}

let g = f();
g();

function makeCounter2() {
    let count = 0;

    return function() {
        return count++;
    };
}

let counter5 = makeCounter2();
let counter6 = makeCounter2();

console.log(counter5());
console.log(counter5());
console.log(counter6());
console.log(counter5());
console.log(counter5());
console.log(counter5());
console.log(counter5());
console.log(counter6());



let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {
    return function(it) {
        return a <= it && it <= b;
    }
}

function inArray(arg) {
    return (it) => {
        return arg.includes(it)
    }
}

console.log(arr.filter(inBetween(3, 6)) ); // 3,4,5,6
console.log(arr.filter(inArray([1, 2, 10])));


let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(field) {
    return (a, b) => {
        return a[field] > b[field] ? 1 : -1;
    }
}

users.sort(byField('name'));
console.log(JSON.stringify(users))
users.sort(byField('age'));
console.log(JSON.stringify(users))

function makeArmy() {
    let shooters = [];

    for(let i=0; i<10; i++) {
        let shooter = function() {  // shooter 함수
            console.log( i ); // 몇 번째 shooter인지 출력해줘야 함
        };

        shooters.push(shooter);
    }

    return shooters;
}

let army = makeArmy();

army[0](); // 0번째 shooter가 10을 출력함
army[5](); // 5번째 shooter 역시 10을 출력함

function makeCounter3() {
    let count = 0;

    function counter() {
        return count++;
    }

    counter.set = value => count = value;
    counter.decrease = () => count--;

    return counter;
}

let counter3 = makeCounter3();

console.log("\n\n" + counter3());
console.log(counter3());
counter3.set(10);
console.log(counter3());
counter3.decrease();
counter3.decrease();
console.log(counter3() + "\n\n\n");

function sum2(a) {

    let currentSum = a;

    function f(b) {
        currentSum += b;

        return f;
    }

    f.toString = () => {return currentSum;}

    return f;
}

console.log(sum2(2)(3)(-3));



function work(a, b) {
    console.log(a+b);
}

function spy(func) {

    function wrapper(...args) {
        wrapper.calls.push(args);
        return func.apply(this, args);
    }

    wrapper.calls = [];

    return wrapper;
}

work = spy(work);

work(1, 2); // 3
work(4, 5); // 9

for (let args of work.calls) {
    console.log( 'call:' + args.join() ); // "call:1,2", "call:4,5"
}


// delaying decorator
function f1(x) {
    console.log(x.toString());
}

function delay(func, x) {
    return function a(...args) {
        setTimeout(func, x, args);
    }
}

// create wrappers
let f1000 = delay(f1, 1000);
let f1500 = delay(f1, 1500);

f1000("test", "b"); // shows "test" after 1000ms
f1500("test"); // shows "test" after 1500ms

// throttle decorator
function f3(a) {
    console.log(a);
}

function throttle(func, ms) {
    let isThrottled = false;

    return function() {
        if(isThrottled) {
            return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
        }, ms)
    }
}

// f1000 passes calls to f at maximum once per 1000 ms
let f2000 = throttle(f3, 1000);

f2000(10); // shows 1
f2000(2); // (throttling, 1000ms not out yet)
f2000(3); // (throttling, 1000ms not out yet)

// when 1000 ms time out...
// ...outputs 3, intermediate value 2 was ignored


// bind
function askPassword(ok, fail) {
    let password = "rockstar"
    if (password == "rockstar") ok();
    else fail();
}

let user2 = {
    name: 'John',

    loginOk() {
        console.log(`${this.name}님이 로그인하였습니다.`);
    },

    loginFail() {
        console.log(`${this.name}님이 로그인에 실패하였습니다.`);
    },

};

askPassword(user2.loginOk.bind(user2), user2.loginFail.bind(user2));


function askPassword2(ok, fail) {
    let password = "rocksta2r";
    if (password == "rockstar") ok();
    else fail();
}

let user5 = {
    name: 'John',

    login(result) {
        console.log( this.name + (result ? ' 로그인 성공333' : ' 로그인 실패333') );
    }
};

askPassword2(user5.login.bind(user5, true), user5.login.bind(user5, false));

function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms)
    };
}

function sayHi(who) {
    alert('안녕, ' + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("철수"); // 2초 후 "안녕, 철수"가 출력됩니다.