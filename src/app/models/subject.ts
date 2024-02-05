import { Resource } from 'ngx-jsonapi';

export class Subject extends Resource {
    public attributes = {
        name: '',
        docente: ''
    };
}