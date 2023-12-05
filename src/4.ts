class Key {
    private signature: number;

    constructor() {
        this.signature = Math.floor(Math.random() * 10000);
    }

    getSignature() {
        return this.signature;
    }
}

class Person {
    private key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    getKey(): Key {
        return this.key;
    }
}

abstract class House {
    protected key: Key;
    protected door: boolean;
    protected tenants: Person[];

    constructor(key: Key) {
        this.key = key;
        this.door = false;
        this.tenants = [];
    }

    comeIn(person: Person): boolean {
        const tenantsAmount: number = this.tenants.length;
        return this.door && this.tenants.push(person) > tenantsAmount;
    }

    getTenants(): Person[] {
        return this.tenants;
    }

    abstract openDoor(key: Key): boolean;
}

class MyHouse extends House {

    constructor(key: Key) {
        super(key);
    }

    openDoor(key: Key): boolean {
        this.door = this.key.getSignature() === key.getSignature();
        return this.door;
    }
}


const key = new Key();
console.log('Origin key: ', key.getSignature());


const house = new MyHouse(key);
const person = new Person(key);

console.log('Try to come in...');
house.comeIn(person);
console.log('Door is locked. Tenants: ', house.getTenants());

console.log('Try wrong key...');
const wrongKey = new Key();
house.openDoor(new Key());
house.comeIn(person);
console.log(`Wrong key: ${wrongKey.getSignature()} - Tenants:`, house.getTenants());

console.log('Use origin key...');
house.openDoor(person.getKey());
house.comeIn(person);
console.log('Welcome home honey! Tenants: ', house.getTenants());


export {};