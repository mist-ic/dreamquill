type LogLevel = 'error' | 'warn' | 'info';

interface LogEntry {
  level: LogLevel;
  message: string;
  error?: unknown;
  timestamp: string;
  attempt?: number;
}

export class Logger {
  private static formatError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}${error.stack ? `\n${error.stack}` : ''}`;
    }
    return String(error);
  }

  private static createEntry(level: LogLevel, message: string, error?: unknown, attempt?: number): LogEntry {
    return {
      level,
      message,
      error,
      timestamp: new Date().toISOString(),
      attempt
    };
  }

  static error(message: string, error?: unknown, attempt?: number): void {
    const entry = this.createEntry('error', message, error, attempt);
    console.error(
      `[${entry.timestamp}] ${message}`,
      error ? `\n${this.formatError(error)}` : '',
      attempt ? `\nAttempt: ${attempt}` : ''
    );
  }

  static warn(message: string, error?: unknown): void {
    const entry = this.createEntry('warn', message, error);
    console.warn(`[${entry.timestamp}] ${message}`, error ? `\n${this.formatError(error)}` : '');
  }

  static info(message: string): void {
    const entry = this.createEntry('info', message);
    console.info(`[${entry.timestamp}] ${message}`);
  }
}