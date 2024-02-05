import { Resource, DocumentCollection } from 'ngx-jsonapi';
import { Role } from './role';

export class User extends Resource {
    public attributes = {
        username: '',
        'first-name': '',
        'last-name': '',
        email: '',
        password: '',
        'old-password': '',
        'confirm-password': '',
        'given-name': '',
        'is-enabled': Boolean
    };

    public relationships = {
        'roles': new DocumentCollection<Role>()
    }
}