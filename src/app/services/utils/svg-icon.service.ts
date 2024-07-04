import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SvgIconService {
  iconList = [
    { name: 'profile-icon', fileName: 'profile.svg'},
    { name: 'back-icon', fileName: 'arrow-back.svg'},
    { name: 'edit-icon', fileName: 'edit.svg'},
    { name: 'delete-icon', fileName: 'delete.svg'},
  ];

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  init(): void {
    this.iconList.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/svg/${icon.fileName}`)
      );
    });
  }
}
