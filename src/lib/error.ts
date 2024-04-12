/**
 * Represents a single error chain with context.
 * Where msg represents the current level in the stack,
 * and cause represents the lower level error that caused
 * the failure.
 */
export default class Error<T = any, K = any> {
    msg: string;
    cause: T;
    context?: K;

    constructor(msg: string, cause: T, context: K | undefined = undefined) {
        this.msg = msg;
        this.cause = cause;
        this.context = context;
    }

    toString(): string {
        return `${this.msg} {${this.context}}: ${this.cause}`;
    }
}
