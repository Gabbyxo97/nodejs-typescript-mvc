import {FormFieldType} from './FormFieldType';
import AbstractFormType from './AbstractFormType';

export default class PostFormType extends AbstractFormType {
    constructor() {
        super();

        super.addField('title', FormFieldType.Text, {
            required: true,

        });
        super.addField('body', FormFieldType.Textarea, {
            required: true
        });

        super.buildForm();
    }
}
