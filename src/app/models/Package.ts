import {Pickup} from "./Pickup";
import {Address} from "./Address";

export class Package {

    private _packageid!: number;
    private _iddelivery!: string;
    private _idpickup!: number;
    private _weight!: number;
    private _height!: number;
    private _idnode!: number;
    private _idreturn!: number;
    private _width!: number;
    private _depth!: number;

    private _sourceIdaddress!: number;
    private _destinationIdaddress!: number;

    private _priority!: number;
    private _price!: number;
    private _returnIdaddress!: number;
    private _externTrackingnumber!: string;

    public constructor() {
    }

    public toJson() {
        return {
            packageid: this.packageid,
            iddelivery: this._iddelivery,
            idpickup: this.idpickup,
            weight: this.weight / 1000,
            height: this.height,
            idnode: this.idNode,
            idreturn: this.idReturn,
            width: this.width,
            depth: this.depth,
            sourceIdaddress: this.sourceIdaddress,
            destinationIdaddress: this.destinationIdaddress,
            priority: this.priority,
            price: this.price,
            returnIdaddress: this.returnIdaddress,
            externTrackingnumber: this.externTrackingnumber
        }
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
        return this._idreturn;
    }

    set idReturn(value: number) {
        this._idreturn = value;
    }

    get idNode(): number {
        return this._idnode;
    }

    set idNode(value: number) {
        this._idnode = value;
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

    get idDelivery(): string {
        return this._iddelivery;
    }

    set idDelivery(value: string) {
        this._iddelivery = value;
    }
    get externTrackingnumber(): string {
        return this._externTrackingnumber;
    }

    set externTrackingnumber(value: string) {
        this._externTrackingnumber = value;
    }
    get returnIdaddress(): number {
        return this._returnIdaddress;
    }

    set returnIdaddress(value: number) {
        this._returnIdaddress = value;
    }

    get destinationIdaddress(): number {
        return this._destinationIdaddress;
    }

    set destinationIdaddress(value: number) {
        this._destinationIdaddress = value;
    }

    get sourceIdaddress(): number {
        return this._sourceIdaddress;
    }

    set sourceIdaddress(value: number) {
        this._sourceIdaddress = value;
    }

    get packageid(): number {
        return this._packageid;
    }

    set packageid(value: number) {
        this._packageid = value;
    }

    get idpickup(): number {
        return this._idpickup;
    }

    set idpickup(value: number) {
        this._idpickup = value;
    }
}
