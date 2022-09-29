export enum LoggerLevel {
    off,
    error,
    info,
    debug,
    verbose,
}

export interface LoggerOptions {
    logLevel?: LoggerLevel;
}

export interface LoggerInterface {
    error(...message: any[]): void;
    info(...message: any[]): void;
    debug(...message: any[]): void;
    verbose(...message: any[]): void;
}

export function logger(tag, opts: LoggerOptions): LoggerInterface {
    const { logLevel = LoggerLevel.error } = opts;

    function format(message: any[]) {
        return [`[${new Date().toUTCString()}]`, `(${tag})`, ...message];
    }

    return {
        error: logLevel >= LoggerLevel.error ? (...message) => console.error(...format(message)) : () => {},
        info: logLevel >= LoggerLevel.info ? (...message) => console.info(...format(message)) : () => {},
        debug: logLevel >= LoggerLevel.debug ? (...message) => console.debug(...format(message)) : () => {},
        verbose: logLevel >= LoggerLevel.verbose ? (...message) => console.log(...format(message)) : () => {},
    };
}
