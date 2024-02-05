import { DocumentResource, Resource } from 'ngx-jsonapi';
import { Subject } from './subject';

export class Documents extends Resource {
    public attributes = {
        name: '',
        description: '',
        link: '',
        linkImage: '',
        'document-status': 0,
        semester: 0
    };
    
    public relationships = {
        'subject': new DocumentResource<Subject>()
    }
}