import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { validateAllFields } from 'src/app/utils/validateField';
import { Dragon } from '../../state/dragons.model';
import { DragonsService } from '../../state/dragons.service';

@Component({
  selector: 'app-dragon-form',
  templateUrl: './dragon-form.component.html',
  styleUrls: ['./dragon-form.component.scss'],
})
export class DragonFormComponent implements OnInit {
  @Input() dragon?: Dragon;
  @Output() saved = new EventEmitter<void>();

  loading = false;
  errorMessage = { required: 'Este campo é obrigatório' };

  dragonForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dragonService: DragonsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const { name, type, avatar } = this.dragon || {};
    this.dragonForm = this.fb.group({
      name: this.fb.control(name || '', [Validators.required]),
      type: this.fb.control(type || '', [Validators.required]),
      avatar: this.fb.control(avatar || ''),
    });
  }

  handleSave() {
    if (this.dragonForm.invalid) {
      validateAllFields(this.dragonForm);
      return;
    }

    this.saveDragon();
  }

  saveDragon() {
    this.loading = true;

    this.getSaveDragonObservable().subscribe(
      () => {
        this.loading = false;
        this.showMessage(
          false,
          `Dragão ${this.getActionText().success} com sucesso!`
        );
        this.saved.emit(this.dragonForm.value);
      },
      () => {
        this.loading = false;
        this.showMessage(
          true,
          `Ocorreu um problema ao ${this.getActionText().error} o dragão!`
        );
      }
    );
  }

  getActionText(): { error: string; success: string } {
    return !this.dragon
      ? { success: 'salvo', error: 'salvar' }
      : { success: 'alterado', error: 'alterar' };
  }

  showMessage(error: boolean, message: string, title?: string) {
    error
      ? this.toastr.error(message, title)
      : this.toastr.success(message, title);
  }

  getSaveDragonObservable(): Observable<Dragon> {
    if (!this.dragon) {
      return this.dragonService.saveDragon(this.dragonForm.value);
    } else {
      const newDragonValue: Dragon = {
        ...this.dragon,
        ...this.dragonForm.value,
      };
      return this.dragonService.update(newDragonValue);
    }
  }
}
