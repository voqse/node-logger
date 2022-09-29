export enum LoggerVerbosity {
    off,
    info,
    debug,
    verbose,
}

export interface LoggerOptions {
    verbosity?: number;
}

export interface LoggerInterface {
    error(...message: any[]): void;
    info(...message: any[]): void;
    debug(...message: any[]): void;
    verbose(...message: any[]): void;
}

export function logger(tag, opts: LoggerOptions): LoggerInterface {
    const { verbosity = LoggerVerbosity.off } = opts;

    function format(message: any[]) {
        return [`[${new Date().toUTCString()}]`, `(${tag})`, ...message];
    }

    return {
        error: (...message) => console.error(...format(message)),
        info: verbosity >= LoggerVerbosity.info ? (...message) => console.info(...format(message)) : () => {},
        debug: verbosity >= LoggerVerbosity.debug ? (...message) => console.debug(...format(message)) : () => {},
        verbose: verbosity >= LoggerVerbosity.verbose ? (...message) => console.log(...format(message)) : () => {},
    };
}
