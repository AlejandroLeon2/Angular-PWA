import { Component, inject } from '@angular/core';
import { NetworkService } from '../../core/network.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
  network= inject(NetworkService);
}
