import * as Interfaces from './../interfaces';
import { timeout } from '../decorators';

export abstract class ReferenceItem {
    // title: string;
    // year: number;
    private _publisher: string;
  
    static department: string = 'RD';
  
    // constructor(newTitle: string, newYear: number) {
    //   console.log('Creating a new ReferenceItem...');
    //   this.title = newTitle;
    //   this.year = newYear;
    // }
  
    constructor(public title: string, protected year: number) {
      console.log('Creating a new ReferenceItem...');
    }
  
    get publisher(): string {
      return this._publisher.toLocaleUpperCase();
    }
  
    set publisher(newPublisher: string) {
      this._publisher = newPublisher;
    }
  
    @timeout(2000)
    printItem(): void {
      console.log(`${this.title} was published in ${this.year}`);
      console.log(`Department ${ReferenceItem.department}`)
    }
  
    abstract printCitation(): void;
}