import {Component, Inject} from '@angular/core';
import {Product} from "../../shared/models/product";
import { initializeApp } from "firebase/app";
import {getDownloadURL, getStorage, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {addDoc, collection, Firestore, getFirestore} from "@angular/fire/firestore";
import {getApp} from "@angular/fire/app";
import AWSS3UploadAshClient from "aws-s3-upload-ash";
import {UploadResponse} from "aws-s3-upload-ash/dist/types";
import {environment} from "../../../environments/environment.development";

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})



export class AddProductsComponent {
  addProductMessage: string | undefined;
  url: string | undefined;
  file: any;

  config = {
    bucketName: 'elasticbeanstalk-us-east-2-177698627657',
    region: 'us-east-2',
    accessKeyId: environment.AWS_ACCESS_KEY,
    secretAccessKey: environment.AWS_SECRET_KEY,
    s3Url: 'https://aws-s3-upload-ash.s3.amazonaws.com/'
  }
  S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);



  constructor(
    // private storage: Storage,
    // private firestore: Firestore
  ) {
    // const firebaseApp = getApp();
    // console.log(firebaseApp);
    // const storage = getStorage(firebaseApp, "gs://l-watch-micro.appspot.com");
    // console.log(storage)
  }

  ngOnInit(): void {

  }

  selectFile(e: any){
    console.log(e)
    if(e.target.files){
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) =>{
        this.url = event.target.result;
        this.file = e.target.files[0];
      }
    }
  }
  async submit(data: any) {
    //TODO: Update images
    console.log(this.addProductMessage)
    console.log('data: ', data.value);
    console.log('url: ', this.url);
    console.log('file', this.file);

    await this.S3CustomClient
      .uploadFile(this.file, this.file.type, undefined, this.file.name, "public-read")
      .then(data => console.log('aws data: ',data))
      .catch(err => console.log('aws error: ',err));


    setTimeout(() => {
      this.addProductMessage=undefined
    }, 100);

    // Reset form & img
    data.resetForm();
    this.url = '';
  }


}
