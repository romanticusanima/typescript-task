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

export function writable(isWritable: boolean) {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log(`Decorate ${propertyKey}`);
        descriptor.writable = isWritable;
    }
}

export function timeout(ms: number = 0) {
    return function(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            setTimeout(() => {
                originalMethod.apply(this, args)
            }, ms)
        }
        return descriptor;
    }
}

export function logParameter(target: Object, methodName: string, index: number) {
    console.log(target);
    console.log(methodName);
    console.log(index);

    const key = `${methodName}_decor_params_indexes`;

    if(Array.isArray(target[key])) {
        target[key].push(index);
    } else {
        target[key] = [index];
    }
}

export function logMethod(
    target: Object, 
    methodName: string, 
    descriptor: PropertyDescriptor
) {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args) {
        const indexes = target[`${methodName}_decor_params_indexes`];
        if(Array.isArray(indexes)) {
            args.forEach((arg,index) => {
              if(indexes.indexOf(index) !== -1) {
                  const arg = args[index];
                  console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
              }      
            });
        } 
        const result = originalMethod.apply(this, args)
        return result;
    }
    return descriptor;
}

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T
) {
    const values = new Map<any, T>();
  
    Object.defineProperty(prototype, propertyName, {
      set(firstValue: any) {
        Object.defineProperty(this, propertyName, {
          get() {
            if (getTransformer) {
              return getTransformer(values.get(this));
            } else {
              values.get(this);
            }
          },
          set(value: any) {
            if (setTransformer) {
              values.set(this, setTransformer(value));
            } else {
              values.set(this, value);
            }
          },
          enumerable: true
        });
        this[propertyName] = firstValue;
      },
      enumerable: true,
      configurable: true
    });
}
  
export function format(pref: string = 'Mr./Mrs.') {
    return function(target: Object, propertyName: string) {
        makeProperty(
            target, 
            propertyName, 
            value => `${pref} ${value}`,
            value => value
        );
    }
}

export function positiveInteger(
    target: Object, 
    propertyName: string, 
    descriptor: PropertyDescriptor
) {
    const oldSet = descriptor.set;

    descriptor.set = function(value: number) {
        if (value <= 0 || !Number.isInteger(value)) {
            throw new Error('Invalid value');
        }

        oldSet.call(this, value);
    }
}