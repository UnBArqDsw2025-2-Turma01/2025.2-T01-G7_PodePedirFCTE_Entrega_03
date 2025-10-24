import { Subject } from "../subject";
export abstract class Observer {
    constructor(subject: Subject) {
        this.subject = subject;
    }
    protected subject: Subject;
    public abstract update(): void;
}
