export class ISRLogger {
    constructor(private showLogs: boolean) {}

    log(message?: any, ...optionalParams: any[]): void {
        this.showLogs && console.log(message, ...optionalParams);
    }
}