export function timeConverter(isoTime: string, timeZone = 3){
    if (isoTime){
        const timeForConverting = isoTime.split('T');
        const date = timeForConverting[0];
        const time = timeForConverting[1].split('.')[0];
        const convertTime = [date, time];
        convertTime[0] = convertTime[0].split('-').reverse().join('-');
        const timeWithCurrentTimezone= convertTime[1].split(':');
        timeWithCurrentTimezone[0] = String(+timeWithCurrentTimezone[0] + timeZone);
        convertTime[1] = timeWithCurrentTimezone.join(':');
        return convertTime.join(' ');
    }
    return '';
}