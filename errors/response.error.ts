export class ErrorResponse extends Error {
    constructor(public status: number, public message: string) {
        super(message);
        this.status = status;
    }
}