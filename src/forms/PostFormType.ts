import {FormFieldType} from './FormFieldType';
import AbstractFormType from './AbstractFormType';
import Post from "../models/Post";

export default class PostFormType extends AbstractFormType {
    constructor(post: Post|null = null) {
        super(post);

        super.addField('title', FormFieldType.Text, {
            required: true,

        });
        super.addField('body', FormFieldType.Textarea, {
            required: true
        });

        super.buildForm();
    }
}
