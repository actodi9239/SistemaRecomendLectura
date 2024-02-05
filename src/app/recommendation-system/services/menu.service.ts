import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/authentication/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private authService: AuthService) { }

  getMenu() {
    return [
      {
        title: "Home",
        icon: "home-outline",
        link: "/"
      },
      {
        title: 'Usuarios',
        icon: 'people-outline',
        hidden: !this.authService.getRoles().includes('Admin'),
        children: [
          {
            title: "Ver Usuarios",
            link: "/users/view-users"
          }
        ]
      },
      {
        title: "Materias",
        icon: "file-outline",
        hidden: !this.authService.getRoles().includes('Admin'),
        children: [
            {
                title: 'Agregar Materia',
                link: '/subjects/add-subject'
            },
            {
                title: 'Ver Materias',
                link: '/subjects/view-subjects'
            }
        ]
      },
      {
        title: "Documentos",
        icon: "file-text-outline",
        hidden: !this.authService.getRoles().includes('Admin'),
        children: [
            {
                title: 'Ver Documentos',
                link: '/documents/view-documents'
            }
        ]
      }
    ];
  }
}
