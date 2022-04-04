export class Package {

    private _idDelivery!: string;
    private _idPickup!: number;
    private _idOrder!: number;
    private _weight!: number;
    private _height!: number;
    private _idNode!: number;
    private _idReturn!: number;
    private _width!: number;
    private _depth!: number;

    private _sourceAddressId!: number
    private _destinationAddressId!: number;

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

    get depth(): number {
        return this._depth;
    }

    set depth(value: number) {
        this._depth = value;
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

    get idPickup(): number {
        return this._idPickup;
    }

    set idPickup(value: number) {
        this._idPickup = value;
    }

    get idDelivery(): string {
        return this._idDelivery;
    }

    set idDelivery(value: string) {
        this._idDelivery = value;
    }

    get destinationAddressId(): number {
        return this._destinationAddressId;
    }

    set destinationAddressId(value: number) {
        this._destinationAddressId = value;
    }

    get sourceAddressId(): number {
        return this._sourceAddressId;
    }

    set sourceAddressId(value: number) {
        this._sourceAddressId = value;
    }
}
