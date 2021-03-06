import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { faTrash, faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { Dragon } from '../../state/dragons.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmationModalComponent } from '../../../../components/confirmation-modal/confirmation-modal.component';
import { DragonsService } from '../../state/dragons.service';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dragon-list-item',
  templateUrl: './dragon-list-item.component.html',
  styleUrls: ['./dragon-list-item.component.scss'],
})
export class DragonListItemComponent implements OnInit, OnDestroy {
  @Input() dragon!: Dragon;
  @Output() editDragon = new EventEmitter<Dragon>();

  trashIcon = faTrash;
  pencilIcon = faPencilAlt;
  detailIcon = faEye;
  loading = false;
  unSubscribe = new Subject<void>();

  constructor(
    private simpleModalService: SimpleModalService,
    private dragonsService: DragonsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  showConfirm() {
    this.simpleModalService
      .addModal(ConfirmationModalComponent, {
        title: 'Exclusão de item',
        message: `Tem certeza que deseja excluir o dragão: ${this.dragon.name}?`,
      })
      .subscribe((isConfirmed) => {
        if (isConfirmed) this.deleteDragon();
      });
  }

  deleteDragon() {
    this.loading = true;
    this.dragonsService
      .deleteDragon(this.dragon.id)
      .pipe(takeUntil(this.unSubscribe))
      .subscribe(
        () => {
          this.loading = false;
          this.toastr.success('Dragão excluído com sucesso!');
        },
        () => {
          this.loading = false;
          this.showErrorMessage(
            'Ocorreu um problema e não foi possível excluir o dragão!',
            'Não foi possível excluir!'
          );
        }
      );
  }

  showErrorMessage(message: string, title?: string) {
    this.toastr.error(message, title);
  }

  redirectToDetail() {
    this.router.navigate(['/dragons', this.dragon.id]);
  }

  ngOnDestroy() {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
