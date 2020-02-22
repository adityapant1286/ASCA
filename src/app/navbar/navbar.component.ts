import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  selectedConfigFile = '';
  prevSelectedConfigFile = this.selectedConfigFile;

  constructor() { }

  ngOnInit(): void {
  }

  onConfigFileSelected() {
    const inputNode: any = document.querySelector('#fileConfig');
    const tempSelected = inputNode.files[0];

    if (tempSelected) {
      this.selectedConfigFile = inputNode.files[0].name;
      this.prevSelectedConfigFile = this.selectedConfigFile;
    } else {
      this.selectedConfigFile = this.prevSelectedConfigFile;
    }

    // if (typeof FileReader !== 'undefined') {
    //   const reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     this.srcResult = e.target.result;
    //   };

    //   reader.readAsArrayBuffer(inputNode.files[0]);
    // }

  }

}
