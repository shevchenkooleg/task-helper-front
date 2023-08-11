export function timeConverter(isoTime: string){
    const timeForConverting = isoTime.split('T');
    const date = timeForConverting[0];
    const time = timeForConverting[1].split('.')[0];
    const convertTime = [date, time];
    return convertTime.join(' ');
}