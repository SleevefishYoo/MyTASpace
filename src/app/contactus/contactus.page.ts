import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-grading',
  templateUrl: 'contactus.page.html'
})
export class ContactusPage {

  currentImage = null;

  constructor(private camera: Camera,
              private emailComposer: EmailComposer) { }

  captureImage() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
    };

    this.camera.getPicture(options).then((imageData) => {
      this.currentImage = imageData;
    }, (err) => {
      // Handle error
      prompt('Image error: ', err);
    });
  }

  sendEmail() {
    let email = {
      to: 'ziyaowangwayne@gmail.com',
      attachments: [this.currentImage],
      subject: 'Test',
      body: 'test',
      isHtml: true
    };

    this.emailComposer.open(email);
  }
 
}