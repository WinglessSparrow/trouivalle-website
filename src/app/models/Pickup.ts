export class Pickup {

    private _idPickup!: number;
    private _desiredPickupDate!: Date;

    public constructor() {
    }

    get desiredPickupDate(): Date {
        return this._desiredPickupDate;
    }

    set desiredPickupDate(value: Date) {
        this._desiredPickupDate = value;
    }

    get idPickup(): number {
        return this._idPickup;
    }

    set idPickup(value: number) {
        this._idPickup = value;
    }
}
