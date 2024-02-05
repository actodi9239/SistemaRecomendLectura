import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { DocumentCollection } from 'ngx-jsonapi';
import { DocumentStatusEnum } from 'src/app/models/Enum/document-status-enum';
import { Subject } from 'src/app/models/subject';
import { SubjectService } from 'src/app/recommendation-system/subject/services/subject.service';
import { UploadService } from 'src/app/services/upload.service';
import { Documents } from '../../../../models/document'
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  public documentEditorForm: FormGroup;
  public isLoading: boolean;
  public docummentToEdit: Documents = null;
  public file;
  public subjects: DocumentCollection<Subject>;
  private FILE_MAX_SIZE = 2049000;
  public thumbnail = null;
  public thumbnailData = null;
  public documentErrorSize = null;
  public image;
  public thumbnailImage = null;
  public thumbnailDataImage = null;
  public imageErrorSize = null;
  private FILE_MAX_SIZE_IMAGE = 1000000;  
  public folderName: string = "documents";  
  public pendingDocument = DocumentStatusEnum.PENDING;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private cd: ChangeDetectorRef,
    private subjectService: SubjectService,
    private documentService: DocumentService,
    private toastrService: NbToastrService
    ) { }

  ngOnInit() {
    this.subjectService.listSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });

    this.buildForm();
  }

  private buildForm() {
    this.documentEditorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(36)]],
      description: ['', [Validators.required, Validators.maxLength(36)]],
      file: null,
      image: null,
      documentStatus: null,
      subjectId: [1, [Validators.required]],
      semester: [1, [Validators.required]],
    });
  }

  addDocument() {
    var document = this.documentEditorForm.value;
    var component = this;
    var image;
    var file;
    var loading = false;
    this.isLoading = true;

    var subject = new Subject();

    var subjectName = this.subjects.data.find(s => s.id.toString() === document.subjectId.toString()).attributes.name;
    var subjectDocente = this.subjects.data.find(s => s.id.toString() === document.subjectId.toString()).attributes.docente;

    // @ts-ignore
    subject.id = parseInt(document.subjectId);
    subject.type = "subject";
    subject.attributes.name = subjectName;
    subject.attributes.docente = subjectDocente;
    document.documentStatus = this.pendingDocument;

    this.uploadService.uploadFile(this.image, this.folderName)
      .then(function (data) {
        image = data.Location;
        loading = true;
      })
      .catch(function (error) {
        console.log('There was an error uploading your file: ', error);
      });

    this.uploadService.uploadFile(this.file, this.folderName)
      .then(function (data) {
        document.thumbnailUrl = data.Location;
        document.thumbnailUrlImage = image;
        if (loading) {
          component.sendDocumentData(document, subject);
        }
      })
      .catch(function (error) {
        console.log('There was an error uploading your file: ', error);
      });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      [this.file] = event.target.files;
      const fileSize = this.file.size;
      reader.readAsDataURL(this.file);

      reader.onload = (event: any) => {
        if (fileSize > this.FILE_MAX_SIZE) {
          this.thumbnailData = null;
          this.file = null;
          this.documentErrorSize = "El documento no puede exceder el tamaño de 2MB";
          this.documentEditorForm.controls['file'].setErrors({ incorrect: true });
        } else {
          this.documentErrorSize = null;
          this.thumbnailData = event.target.result;
          // need to run CD since file load runs outside of zone
          this.documentEditorForm.controls['file'].reset();
          this.cd.markForCheck();
        }
      }
    }
  }

  onFileChangeImage(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      [this.image] = event.target.files;
      const fileSize = this.image.size;
      reader.readAsDataURL(this.image);

      reader.onload = (event: any) => {
        if (fileSize > this.FILE_MAX_SIZE_IMAGE) {
          this.thumbnailDataImage = null;
          this.image = null;
          this.imageErrorSize = "La imagen no puede exceder el tamaño de 1 MB";
          this.documentEditorForm.controls['image'].setErrors({ incorrect: true });
        } else {
          this.imageErrorSize = null;
          this.thumbnailDataImage = event.target.result;
          // need to run CD since file load runs outside of zone
          this.documentEditorForm.controls['image'].reset();
          this.cd.markForCheck();
        }
      }
    }
  }

  removeFile() {
    this.file = null;
    this.thumbnailData = null;
  }

  removeImage() {
    this.image = null;
    this.thumbnailDataImage = null;
  }

  sendDocumentData(document, subject) {
    this.documentService.addDocument(document, subject).subscribe(() => {
      this.toastrService.show('Documento sugerido registrado', 'Éxito');
      this.thumbnailData = null;
      this.file = null;
      this.image = null;
      this.thumbnailDataImage = null;
      this.isLoading = false;
      this.documentEditorForm.reset();
      this.buildForm();
    });
  }

  get name() {
    return this.documentEditorForm.get('name');
  }

  get description() {
    return this.documentEditorForm.get('description');
  }

  get subject() {
    return this.documentEditorForm.get('subjectId');
  }

  get semester() {
    return this.documentEditorForm.get('semester');
  }
}
