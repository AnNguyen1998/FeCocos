export function log(target: any, propertyKey: any){
    let value: any;

    const getter = () => {
        console.log("aaaa")
        return value;
    }

    const setter = (newValue: any) => {
        value = newValue;
    }

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}