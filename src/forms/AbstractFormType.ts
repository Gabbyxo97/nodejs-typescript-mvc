import {FormFieldType} from './FormFieldType';
import forms, {FieldParameters, Form, widgets} from 'forms';
import express from 'express';

export default class AbstractFormType {
    protected form: any;
    protected fields: {[id: string]: any} = [];
    private _data: any;
    private _submitted: boolean = false;
    private _valid: boolean = false;

    protected addField(name: string, type: FormFieldType, options: FieldParameters) {
        const fields = forms.fields;
        let value: any;

        switch (type) {
            case FormFieldType.Text:
                value = fields.string(options);
                break;
            case FormFieldType.Textarea:
                if (options['widget'] === undefined) {
                    options['widget'] = widgets.textarea({});
                } else {
                    options['widget'] = widgets.textarea(options['widget']);
                }
                value = fields.string(options)
                break;
        }

        this.fields[name] = value;
    }

    protected buildForm() {
        this.form = forms.create(this.fields);
    }

    public render(): string {
        return this.form.toHTML();
    }

    public handle(req: express.Request) {
        if (req.method !== 'POST') {
            return;
        }

        this.form.handle(req, {
            success: (form: { data: any; }) => { this._valid = true; this.form = form; this._data = form.data },
            error: (form: Form) => { this._valid = false; this.form = form }
        });

        this._submitted = true;
    }

    public get submitted(): boolean {
        return this._submitted;
    }

    public get valid(): boolean {
        return this._valid;
    }

    public get data(): any {
        return this._data;
    }
}
