import { Observer } from "./observers/observer";

export class Subject {
    private observers: Observer[] = [];
    private state: number = 0;

    public getState(): number {
        return this.state;
    }

    public setState(state: number): void {
        this.state = state;
        this.notifyAllObservers();
    }

    public attach(observer: Observer): void {
        if (this.observers.includes(observer)) {
            console.log("Subject: Observer já está anexado.");
            return;
        }
        console.log("Subject: Anexou um observer.");
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            console.log("Subject: Observer não-existente.");
            return;
        }
        this.observers.splice(observerIndex, 1);
        console.log("Subject: Separou um observer.");
    }

    public notifyAllObservers(): void {
        console.log("Subject: Notificando observers...");
        for (const observer of this.observers) {
            observer.update(); 
        }
    }
}