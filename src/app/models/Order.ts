import {Customer} from "./Customer";
import {Package} from "./Package";

export class Order {

    private _idOrder!: number;
    private _paymentMethod!: string;
    private _customer!: Customer;
    private _package!: Package;

    public constructor() {
    }

    get paymentMethod(): string {
        return this._paymentMethod;
    }

    set paymentMethod(value: string) {
        this._paymentMethod = value;
    }

    get idOrder(): number {
        return this._idOrder;
    }

    set idOrder(value: number) {
        this._idOrder = value;
    }

    get customer(): Customer {
        return this._customer;
    }

    set customer(value: Customer) {
        this._customer = value;
    }

    get package(): Package {
        return this._package;
    }

    set package(value: Package) {
        this._package = value;
    }

}
