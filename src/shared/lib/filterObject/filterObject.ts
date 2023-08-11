
export function filterObject<T extends object>(incObject:T, exceptions:Array<string | number | symbol>)  {

    const filteredObject:T = { ...incObject };
    exceptions.forEach((ex)=>{
        if (ex in filteredObject){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            delete filteredObject[ex];
        }
    });
    return filteredObject;

}