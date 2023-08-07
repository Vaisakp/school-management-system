import { ViewportRuler } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";
import { MatDialogConfig } from "@angular/material/dialog";

@Injectable({
  providedIn: "root",
})
export class SharedUtils {
  constructor(private viewportRuler: ViewportRuler) {}
  getMatCommonDialogConfig() {
    const dialogConfig = new MatDialogConfig();
    const availableWidth = this.viewportRuler.getViewportSize().width;
    if (availableWidth >= 1200) {
      dialogConfig.width = "500px";
    } else if (availableWidth >= 600) {
      dialogConfig.width = "300px";
    } else {
      dialogConfig.width = "90%";
    }
    dialogConfig.disableClose = true;
    return dialogConfig;
  }
}
