export class Coordinate {

    private _latitude!: number;
    private _longitude!: number;

    public constructor() {
    }

    get longitude(): number {
        return this._longitude;
    }

    set longitude(value: number) {
        this._longitude = value;
    }
    get latitude(): number {
        return this._latitude;
    }

    set latitude(value: number) {
        this._latitude = value;
    }
}
