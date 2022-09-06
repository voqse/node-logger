export enum LogLevel {
    off,
    error,
    info,
    debug,
    verbose,
}

export interface LoggerOptions {
    tag: string;
    level?: LogLevel;
}

export interface LoggerInterface {
    error(...message: any[]): void;
    info(...message: any[]): void;
    debug(...message: any[]): void;
    verbose(...message: any[]): void;
}

export function logger(opts: LoggerOptions): LoggerInterface {
    const { tag, level = LogLevel.error } = opts;
    const methods = {};

    for (const [name, value] of Object.entries(LogLevel)) {
        methods[name] = (...message: any[]) => {
            if (!value) return;

            if (level >= value) {
                const formattedMessage = [`[${new Date().toUTCString()}]`, `(${tag})`, ...message];
                console?.[name] ? console[name](...formattedMessage) : console.log(...formattedMessage);
            }
        };
    }
    return <LoggerInterface>methods;
}