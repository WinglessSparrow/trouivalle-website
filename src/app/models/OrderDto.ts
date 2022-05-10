import {Order} from "./Order";
import {Customer} from "./Customer";
import {Package} from "./Package";
import {Address} from "./Address";

export class OrderDto {

    private _customer!: Customer;
    private _pack!: Package;
    private _destAddress!: Address;
    private _srcAddress!: Address;

    private _paymentMethod!: string;

    private _isPickup!: boolean;
    private _pickupDate!: Date;

    public constructor() {
    }

    public toJson() {
        return {
            customer: this.customer.toJson(),
            pack: this.pack.toJson(),
            destAddress: this.destAddress.toJson(),
            srcAddress: this.srcAddress.toJson(),
            paymentMethod: this.paymentMethod,
            isPickup: this.isPickup,
            pickupDate: this.pickupDate
        }
    }

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

    get pickupDate(): Date {
        return this._pickupDate;
    }

    set pickupDate(value: Date) {
        this._pickupDate = value;
    }

    get isPickup(): boolean {
        return this._isPickup;
    }

    set isPickup(value: boolean) {
        this._isPickup = value;
    }

    get paymentMethod(): string {
        return this._paymentMethod;
    }

    set paymentMethod(value: string) {
        this._paymentMethod = value;
    }

}
