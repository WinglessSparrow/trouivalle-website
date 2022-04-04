export class Order {

    private _idOrder: number;
    private _paymentMethod: string;
    private _customerId: number;

    public constructor(orderID: number, paymentMethod: string, customerId: number) {

        this._idOrder = orderID;
        this._paymentMethod = paymentMethod;
        this._customerId = customerId;
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

    get customerId(): number {
        return this._customerId;
    }

    set customerId(value: number) {
        this._customerId = value;
    }
}
