import { Maintenance } from '@/entities/Unit';

export function expandUnitDetailsData(expandedData: Maintenance[], possibleMaintenanceList: Maintenance[]): Maintenance[] {
    const result: Maintenance[] = [];
    try {
        expandedData.forEach(el=> {
            const newEl = { ...el, replaceableMaintenance: [] };
            result.push(newEl);
        });
        result.map(el=>{
            if (el.replaceableMaintenanceId && el.replaceableMaintenanceId.length) {
                el.replaceableMaintenanceId.forEach(m=>{
                    const replaceableMaintenanceItem = possibleMaintenanceList?.filter(pm=>pm._id === m)[0];
                    replaceableMaintenanceItem && el.replaceableMaintenance?.push(replaceableMaintenanceItem);
                });
            }
        });
    } catch (e) {
        console.log(e);
    }
    return result;

}