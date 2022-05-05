import {ErrorObject} from "./ErrorObject";

export class GlobalResponseModel {

    private _error!: ErrorObject;
    private _hasError!: boolean;
    private _hasWarning!: boolean;
    private _warnings!: string[];
    private _data!: any[];

    get error(): ErrorObject {
        return this._error;
    }

    set error(value: ErrorObject) {
        this._error = value;
    }
    get data(): any[] {
        return this._data;
    }

    set data(value: any[]) {
        this._data = value;
    }
    get warnings(): string[] {
        return this._warnings;
    }

    set warnings(value: string[]) {
        this._warnings = value;
    }
    get hasWarning(): boolean {
        return this._hasWarning;
    }

    set hasWarning(value: boolean) {
        this._hasWarning = value;
    }
    get hasError(): boolean {
        return this._hasError;
    }

    set hasError(value: boolean) {
        this._hasError = value;
    }
}
