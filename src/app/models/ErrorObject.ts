import {HttpStatusCode} from "@angular/common/http";

export class ErrorObject {

    private _timestamp!: string;
    private _status!: HttpStatusCode;
    private _error!: string;
    private _message!: string;
    private _path!: string;

    get path(): string {
        return this._path;
    }

    set path(value: string) {
        this._path = value;
    }
    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
    get error(): string {
        return this._error;
    }

    set error(value: string) {
        this._error = value;
    }
    get status(): HttpStatusCode {
        return this._status;
    }

    set status(value: HttpStatusCode) {
        this._status = value;
    }
    get timestamp(): string {
        return this._timestamp;
    }

    set timestamp(value: string) {
        this._timestamp = value;
    }
}
