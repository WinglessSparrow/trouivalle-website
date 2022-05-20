export class Address {

    private _idaddress!: number;
    private _zipcode!: string;
    private _streetname!: string;
    private _streetnumber!: string;
    private _city!: string;
    private _country!: string;

    public constructor() {
    }

    public toJson() {
        return {
            idaddress: this.idAddress,
            zipcode: this.zipCode,
            streetname: this.streetName,
            streetnumber: this.streetNumber,
            city: this.city,
            country: this.country
        }
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get city(): string {
        return this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get streetNumber(): string {
        return this._streetnumber;
    }

    set streetNumber(value: string) {
        this._streetnumber = value;
    }

    get streetName(): string {
        return this._streetname;
    }

    set streetName(value: string) {
        this._streetname = value;
    }

    get zipCode(): string {
        return this._zipcode;
    }

    set zipCode(value: string) {
        this._zipcode = value;
    }

    get idAddress(): number {
        return this._idaddress;
    }

    set idAddress(value: number) {
        this._idaddress = value;
    }
}
