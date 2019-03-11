export function sealed(param: string) {
    return function(target: Function): void {
        console.log(`Sealing the constructor ${param}`);
        Object.seal(target);
        Object.seal(target.prototype);
    }
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    let newConstrunctor: Function = function() {
        console.log('Creating new instance');
        console.log(target.name);

        this.age = 29;
    }

    newConstrunctor.prototype = Object.create(target.prototype);
    newConstrunctor.prototype.constructor = target;
    newConstrunctor.prototype.printLibrarian = function() {
        console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
    }

    return <TFunction>newConstrunctor;
}