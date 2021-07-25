class MySet {
    constructor(data) {
        this.data = data.filter(onlyUnique);
    }

    [Symbol.iterator]() {
        let current = 0;
        return {
            next: () => {
                if (current < this.data.length) {
                    return {
                        done: false,
                        value: this.data[current++]
                    };
                } else {
                    return {
                        done: true
                    };
                }
            }
        
        }
    }

    get size() {
        return this.data.length;
    }

    keys() {
        return this.data;
    }

    values() {
        return this.data;
    }

    entries() {
        return this.data.map(value => [value, value]);
    }

    clear() {
        this.data = [];
    }

    add(item) {
        !this.has(item) && this.data.push(item);
    }

    delete(item) {
        this.data = this.data.filter(i => i != item);
    }

    has(item) {
        return this.data.includes(item);
    }

    get [Symbol.toStringTag]() {
        return 'MySet';
    }
    
    forEach(fn, context){
        for (const item of this.data){
            fn.call(context, item);
        }
    }
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

// тесты
const set = new MySet([4, 8, 15, 15, 16, 23, 42]);

// хранит только уникальные значения
console.log([...set]); // [ 4, 8, 15, 16, 23, 42 ]

// есть свойство size
console.log(set.size); // 6

// работает в цикле for-of
for (const item of set) {
    console.log(item); // 4 8 15 16 23 42
}

// есть методы keys, values, entries
for (const item of set.entries()) {
    console.log(item); // [ 4, 4 ] [ 8, 8 ] ...
}

// есть метод clear
set.clear();
console.log(set.size); // 0

const object = {
    getValue () { return this.value }
}

const data = {
    value: 42
}

// есть метод add
set.add(object);
set.add(data);

// есть метод delete
set.delete(data);

// есть метод has
console.log(set.has({})); // false
console.log(set.has(object)); // true
console.log(set.has(data)); // false

// и кое-что еще
console.log(set === set.valueOf()) // true
console.log(String(set)) // [object MySet]
console.log(Object.prototype.toString.call(set)) // [object MySet]

// задание со звездочкой *
// есть forEach, который делает какие-то странные вещи...
set.forEach(function (item) {
    console.log(item.getValue.call(this)); // 42
}, data)