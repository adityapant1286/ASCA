import { Injectable } from '@angular/core';
import { SnackbarService } from 'ngx-snackbar';

@Injectable({
  providedIn: 'root'
})
export class AppSnackbarService {

  constructor(private snackbarService: SnackbarService) { }

  info(msg: any, isJson = false) {
    this.addSnackbar('#375A7F', '#FFFFFF', '#FFEA00',
                      isJson ? JSON.stringify(msg) : msg);
  }

  warn(msg: any, isJson = false) {
    this.addSnackbar('#FFCE56', '#375A7F', '#F50057',
                      isJson ? JSON.stringify(msg) : msg);
  }

  success(msg: any, isJson = false) {
    this.addSnackbar('#4BC0C0', '#FFFFFF', '#FFEA00',
                      isJson ? JSON.stringify(msg) : msg);
  }

  error(msg: any, isJson = false) {
    this.addSnackbar('#FF6384', '#FFFFFF', '#FFEA00',
                      isJson ? JSON.stringify(msg) : msg);
  }

  private addSnackbar(backColor: any, frontColor: any, actionColor: any, smsg: any) {
    this.snackbarService.add({
      msg: smsg,
      background: backColor,
      color: frontColor,
      action: {
        text: 'Dismiss',
        color: actionColor
      }
    });
  }
}
