import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss']
})
export class EditSubjectComponent implements OnInit {

  public subjectEditorForm: FormGroup;
  public isLoading: boolean;
  public subjectToEdit: Subject = null;
  public subject: Subject;
  public subjects: Subject[] = [];

  constructor(private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private toastrService: NbToastrService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.buildForm();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.subjectService.findSubjectById(params['id']).subscribe(subject => {
          this.subjectToEdit = subject;
          this.subjectEditorForm.patchValue({
            name: subject.attributes.name,
            docente: subject.attributes.docente
          });
        });
      }
    });
  }

  private buildForm() {
    this.subjectEditorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(70), Validators.pattern(/^[a-zA-Z0-9*\s()]+$/)]],
      docente: ['', [Validators.required, Validators.maxLength(70), Validators.pattern(/^[a-zA-Z0-9*\s()]+$/)]],
    });
  }

  addSubject() {
    var exist = false;
    var subject = this.subjectEditorForm.value;    
    this.isLoading = true;
    
    this.subjectService.listSubjects().subscribe(subjects => {
      this.subjects = subjects.data;
    });

    this.subjects.forEach(sub => {
      if (sub.attributes.name == subject.name && sub.attributes.docente == subject.docente) {
        exist = true;
      }
    });

    if (!exist) {
      if (this.subjectToEdit) {
        this.subjectService.updateSubject(this.subjectToEdit, subject).subscribe(() => {
          this.toastrService.show('Materia Actualizada', 'Exito');
          this.subjectService.listSubjects().subscribe(subjects => {
            this.subjects = subjects.data;
          });
          this.isLoading = false;
        });
      } else {
        this.subjectService.addSubject(subject).subscribe(() => {
          this.toastrService.show('Materia Registrada', 'Exito');
          this.subjectService.listSubjects().subscribe(subjects => {
            this.subjects = subjects.data;
          });
          this.subjectEditorForm.reset();
          this.isLoading = false;
        });
      }
    }else{
      
      this.toastrService.danger('No se pueden repetir materias', 'No se pudo registrar');
      this.isLoading = false;
    }
  }

  get name() {
    return this.subjectEditorForm.get('name');
  }

  get docente() {
    return this.subjectEditorForm.get('docente');
  }
}
