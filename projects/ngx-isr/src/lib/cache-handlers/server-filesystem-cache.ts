import { CacheData, CacheHandler } from "../models/cache-handler";
import * as fs from "fs";
import { join } from "path";

export class ServerFileSystemCache implements CacheHandler {
  // in cache we will save url and path to file
  private cachedUrls: string[] = [];
  private cacheFolderPath: string;

  constructor(cacheFolderPath: string) {
    this.cacheFolderPath = cacheFolderPath;

    this.populateCacheFromFilesystem();
  }

  async add(url: string, html: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const fileName = url.charAt(0) === "/" ? url.slice(1) : url;
      const filePath = this.getFileFullPath(fileName);
      fs.writeFile(`${filePath}.html`, html, "utf-8", (err) => {
        if (err) {
          reject("Error: 💥 The request was not cached!");
        }
        this.cachedUrls.push(url);
        console.log("The request was cached!", url);
        resolve();
      });
    });
  }

  get(url: string): Promise<CacheData> {
    return new Promise(async (resolve, reject) => {
      if (this.cachedUrls.includes(url)) {
        const data = await this.readFromFile(url);
        // resolve();
        // TODO: fix this
      }
      reject("This url does not exist in cache!");
    });
  }

  has(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.cachedUrls.includes(url));
    });
  }

  delete(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {

      if (!this.cachedUrls.includes(url)) {
        reject("Error: 💥 Url is not cached.");
      }

      const filePath = this.getFileFullPath(url);
      fs.unlink(`${filePath}.html`, (err) => {
        if (err) {
          reject("Error: 💥 Cannot delete file" + filePath);
        } else {
          this.cachedUrls = this.cachedUrls.filter((u) => u !== url);
          console.log('Cached urls: ', this.cachedUrls)
          resolve(true);
        }
      });
    });
  }

  getAll(): Promise<string[]> {
    return Promise.resolve(this.cachedUrls);
  }

  private populateCacheFromFilesystem(): void {
    if (!fs.existsSync(this.cacheFolderPath)) {
      console.log("Cache folder doesnt exist.");

      fs.mkdir(this.cacheFolderPath, (err) => {
        if (!err) {
          console.log("Cache folder was created.");
        }
      });
      return;
    }

    fs.readdir(this.cacheFolderPath, (err, files) => {
      this.cachedUrls = files.map((fileName) => `/${fileName.replace('.html', '')}`);
      console.log("Cached urls: ", this.cachedUrls);
    });
  }

  private async readFromFile(fileName: string): Promise<string> {
    const filePath = this.getFileFullPath(fileName);

    return new Promise((resolve, reject) => {
      fs.readFile(`${filePath}.html`, "utf-8", (err, data) => {
        if (err) {
          console.error("ERROR! 💥 ! Cannot read file: " + filePath);
          reject(err);
        }
        resolve(data);
      });
    });
  }

  private getFileFullPath(fileName: string): string {
    // fileName may have a / in the beginning, so we want to remove it first
    if (fileName.charAt(0) === "/") {
      fileName = fileName.slice(1);
    }

    return join(this.cacheFolderPath, "/", fileName);
  }
}
