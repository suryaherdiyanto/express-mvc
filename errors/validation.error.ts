export interface ValidationErrorAttribute {
    [key: string]: string
}

export class ValidationError extends Error {
    constructor(public message: string, public status = 422, public errors: ValidationErrorAttribute) {
        super(message);
    }
}