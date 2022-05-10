import {Address} from "./Address";

export class Customer {

    private _idcustomer!: number;
    private _firstname!: string;
    private _lastname!: string;
    private _email!: string;
    private _idaddress!: number;

    public constructor() {
    }


    public toJson() {
        return {
            idcustomer: this.idaddress,
            firstname: this.firstName,
            lastname: this.lastName,
            email: this.email,
            idaddress: this.idaddress
        }
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get lastName(): string {
        return this._lastname;
    }

    set lastName(value: string) {
        this._lastname = value;
    }

    get firstName(): string {
        return this._firstname;
    }

    set firstName(value: string) {
        this._firstname = value;
    }

    get idaddress(): number {
        return this._idaddress;
    }

    set idaddress(value: number) {
        this._idaddress = value;
    }

    get idCustomer(): number {
        return this._idcustomer;
    }

    set idCustomer(value: number) {
        this._idcustomer = value;
    }
}
