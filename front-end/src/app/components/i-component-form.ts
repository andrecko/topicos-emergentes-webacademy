import { NgForm } from "@angular/forms";

export interface IComponentForm<T> {

    registro: T;

    submit(form: NgForm): void;

}
