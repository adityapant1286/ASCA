import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../_services/config.service';
import { AppSnackbarService } from '../_services/app-snackbar.service';
import { OauthGeneratorService } from '../_services/oauth-generator.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectedConfigFile = '';
  prevSelectedConfigFile = this.selectedConfigFile;
  instances = [];
  compareNames = [];

  constructor(
    private configService: ConfigService,
    private snackbarService: AppSnackbarService,
    private oauthService: OauthGeneratorService
  ) {}

  ngOnInit(): void {}

  private readFileContents(configFile) {
    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const data = e.target.result;
        this.loadConfigurations(JSON.parse(data));
      };

      reader.onerror = e => {
        console.error('(X) Error in reading file: ');
        console.error(e);
      };

      reader.readAsText(configFile);
    }
  }

  private loadConfigurations(fileContents) {
    this.configService.loadConfigs(fileContents).subscribe(
      resp => this.snackbarService.info(resp.msg),
      error => this.snackbarService.error(error.msg)
    );
  }

  onConfigFileSelected() {
    const inputNode: any = document.querySelector('#fileConfig');
    const tempSelected = inputNode.files[0];

    if (tempSelected) {
      this.selectedConfigFile = inputNode.files[0].name;
      this.prevSelectedConfigFile = this.selectedConfigFile;
      this.readFileContents(inputNode.files[0]);
    } else {
      this.selectedConfigFile = this.prevSelectedConfigFile;
    }
  }

  onCompareDrawerOpened() {
    console.log('opened');

    this.configService.findAll().subscribe(
      configs => {
        this.instances = configs;
      },
      error => this.snackbarService.error(error.msg)
    );
  }

  onCompareDrawerClosed() {
    console.log('closed');
  }

  checkboxToggle(isChecked: boolean, instanceName: string) {
    if (isChecked) {
      this.compareNames.push(instanceName);
    } else {
      this.compareNames = this.compareNames.filter(
        name => name !== instanceName
      );
    }
  }

  onCompare() {
    if (this.compareNames.length > 0) {
      this.oauthService.retrieveOAuthTokens(this.compareNames)
                      .subscribe(tokens => {
                        console.log(tokens);
                      });
    }
  }
}
