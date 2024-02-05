import { Resource } from 'ngx-jsonapi';

export class Role extends Resource {
    public attributes = {
        name: '',
    };
}