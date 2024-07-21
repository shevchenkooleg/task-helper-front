export enum MaintenancePeriodicity {
    ONCE = 'once',
    TWO_WEEKS = 'twoWeeks',
    MONTH = 'month',
    HALF_YEAR = 'halfYear',
    YEAR = 'year',
    TREE_YEAR = 'treeYear',
    FIVE_YEAR = 'fiveYear',
    SIX_YEAR = 'sixYear',
    EIGHT_YEAR = 'eightYear',
    NINE_YEAR = 'nineYear',
    TEN_YEAR = 'tenYear',
}

export const maintenancePeriodicityMapper: Record<MaintenancePeriodicity, string> = {
    [MaintenancePeriodicity.ONCE]: 'Единожды',
    [MaintenancePeriodicity.TWO_WEEKS]: 'Раз в 2 недели',
    [MaintenancePeriodicity.MONTH]: 'Раз в 1 месяц',
    [MaintenancePeriodicity.HALF_YEAR]: 'Раз в 6 месяцев',
    [MaintenancePeriodicity.YEAR]: 'Раз в 1 год',
    [MaintenancePeriodicity.TREE_YEAR]: 'Раз в 3 года',
    [MaintenancePeriodicity.FIVE_YEAR]: 'Раз в 5 лет',
    [MaintenancePeriodicity.SIX_YEAR]: 'Раз в 6 лет',
    [MaintenancePeriodicity.EIGHT_YEAR]: 'Раз в 8 лет',
    [MaintenancePeriodicity.NINE_YEAR]: 'Раз в 9 лет',
    [MaintenancePeriodicity.TEN_YEAR]: 'Раз в 10 лет',
};

export const maintenanceSelectorOptions = [
    { value: MaintenancePeriodicity.ONCE, content: maintenancePeriodicityMapper.once },
    { value: MaintenancePeriodicity.TWO_WEEKS, content: maintenancePeriodicityMapper.twoWeeks },
    { value: MaintenancePeriodicity.MONTH, content: maintenancePeriodicityMapper.month },
    { value: MaintenancePeriodicity.HALF_YEAR, content: maintenancePeriodicityMapper.halfYear },
    { value: MaintenancePeriodicity.YEAR, content: maintenancePeriodicityMapper.year },
    { value: MaintenancePeriodicity.TREE_YEAR, content: maintenancePeriodicityMapper.treeYear },
    { value: MaintenancePeriodicity.FIVE_YEAR, content: maintenancePeriodicityMapper.fiveYear },
    { value: MaintenancePeriodicity.SIX_YEAR, content: maintenancePeriodicityMapper.sixYear },
    { value: MaintenancePeriodicity.EIGHT_YEAR, content: maintenancePeriodicityMapper.eightYear },
    { value: MaintenancePeriodicity.NINE_YEAR, content: maintenancePeriodicityMapper.nineYear },
    { value: MaintenancePeriodicity.TEN_YEAR, content: maintenancePeriodicityMapper.tenYear },
];