import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  @Input() pageTitle: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();
  user: any;

  constructor(private authService: AuthService) {
    this.user = this.authService.getUsuarioLogado();
  }

}