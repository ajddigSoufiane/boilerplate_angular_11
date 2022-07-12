import { NzUploadFile } from "ng-zorro-antd/upload";

export class UploadModel {
  constructor(uploadUrl?: any, uploadHeaders?: any) { 
    this.uploadUrl = uploadUrl;
    this.uploadHeaders = uploadHeaders;
  }
  uploadUrl = null;
  uploadHeaders = null;
  isUploadLoading = false;
  fileAlreadyUploaded: Boolean = false;
  maxSizeUpload: number = 600;
  fileList: NzUploadFile []= [];
  toString() {
    return JSON.stringify(this);
  }
}
