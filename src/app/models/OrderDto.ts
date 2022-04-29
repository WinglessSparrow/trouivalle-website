import {Order} from "./Order";
import {Customer} from "./Customer";
import {Package} from "./Package";
import {Address} from "./Address";

export class OrderDto {

    private _order!: Order;
    private _customer!: Customer;
    private _pack!: Package;
    private _destAddress!: Address;
    private _srcAddress!: Address;

    get srcAddress(): Address {
        return this._srcAddress;
    }

    set srcAddress(value: Address) {
        this._srcAddress = value;
    }
    get destAddress(): Address {
        return this._destAddress;
    }

    set destAddress(value: Address) {
        this._destAddress = value;
    }
    get pack(): Package {
        return this._pack;
    }

    set pack(value: Package) {
        this._pack = value;
    }
    get customer(): Customer {
        return this._customer;
    }

    set customer(value: Customer) {
        this._customer = value;
    }
    get order(): Order {
        return this._order;
    }

    set order(value: Order) {
        this._order = value;
    }
}
