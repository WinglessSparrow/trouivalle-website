export class Address {

    private _idAddress!: number;
    private _zipCode!: string;
    private _streetName!: string;
    private _streetNumber!: string;
    private _city!: string;
    private _country!: string;

    public constructor() {
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
        return this._streetNumber;
    }

    set streetNumber(value: string) {
        this._streetNumber = value;
    }

    get streetName(): string {
        return this._streetName;
    }

    set streetName(value: string) {
        this._streetName = value;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    set zipCode(value: string) {
        this._zipCode = value;
    }

    get idAddress(): number {
        return this._idAddress;
    }

    set idAddress(value: number) {
        this._idAddress = value;
    }
}
