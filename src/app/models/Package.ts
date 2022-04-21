import {Pickup} from "./Pickup";
import {Address} from "./Address";

export class Package {

    private _idDelivery!: string;
    private _pickup!: Pickup;
    private _idOrder!: number;
    private _weight!: number;
    private _height!: number;
    private _idNode!: number;
    private _idReturn!: number;
    private _width!: number;
    private _length!: number;

    private _sourceAddress!: Address;
    private _destinationAddress!: Address;

    private _priority!: number;
    private _price!: number;

    public constructor() {
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get priority(): number {
        return this._priority;
    }

    set priority(value: number) {
        this._priority = value;
    }

    get length(): number {
        return this._length;
    }

    set length(value: number) {
        this._length = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get idReturn(): number {
        return this._idReturn;
    }

    set idReturn(value: number) {
        this._idReturn = value;
    }

    get idNode(): number {
        return this._idNode;
    }

    set idNode(value: number) {
        this._idNode = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get weight(): number {
        return this._weight;
    }

    set weight(value: number) {
        this._weight = value;
    }

    get idOrder(): number {
        return this._idOrder;
    }

    set idOrder(value: number) {
        this._idOrder = value;
    }

    get idDelivery(): string {
        return this._idDelivery;
    }

    set idDelivery(value: string) {
        this._idDelivery = value;
    }

    get destinationAddress(): Address {
        return this._destinationAddress;
    }

    set destinationAddress(value: Address) {
        this._destinationAddress = value;
    }

    get sourceAddress(): Address {
        return this._sourceAddress;
    }

    set sourceAddress(value: Address) {
        this._sourceAddress = value;
    }

    get pickup(): Pickup {
        return this._pickup;
    }

    set pickup(value: Pickup) {
        this._pickup = value;
    }

}
