import {Address} from "./Address";

export class Customer {

    private _idCustomer!: number;
    private _firstName!: string;
    private _lastName!: string;
    private _email!: string;
    private _idaddress!: number;

    public constructor() {
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get firstName(): string {
        return this._firstName;
    }

    set firstName(value: string) {
        this._firstName = value;
    }

    get idaddress(): number {
        return this._idaddress;
    }

    set idaddress(value: number) {
        this._idaddress = value;
    }

    get idCustomer(): number {
        return this._idCustomer;
    }

    set idCustomer(value: number) {
        this._idCustomer = value;
    }
}
