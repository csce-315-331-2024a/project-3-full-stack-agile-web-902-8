
/**
 * Represents a single error chain with context.
 * Where msg represents the current level in the stack,
 * and cause represents the lower level error that caused
 * the failure.
 */
export default class Error {
    msg: string;
    cause: any;

    constructor (
        msg: string,
        cause: any,
    ) {
        this.msg = msg;
        this.cause = cause;
    }

    toString(): string {
        return `${this.msg}: ${this.cause}`
    }
}
