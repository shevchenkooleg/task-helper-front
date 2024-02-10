import cls from './TableGrid.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TableGridTemplate } from '@/shared/types/ui';
import { HStack, VStack } from '../../Stack';
import ArrowDown from '@/shared/assets/icons/ArrowDown.svg';
import ArrowUp from '@/shared/assets/icons/ArrowUp.svg';
import { SortOrder } from '@/shared/types/sort';
import { Text, TextSize, TextTheme } from '../../Text';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { ORDERS_TABLE_TEMPLATE } from '@/shared/const/localStorage';
import { tableTemplateCreator } from '@/shared/lib/tableTemplateCreator/tableTemplateCreator';
import { Button, ButtonSize, ButtonTheme } from '../../Button';
import CopyIcon from '../../../assets/icons/CopyIcon.svg';
import { Icon } from '../../Icon';

interface TableGridProps<T, R, S> {
    className?: string
    tabKeys?: Array<string> //Если не передать параметр 'tabKeys' - компонент отобразить все имеющиеся поля объектов
    items: Array<T>
    callback?: (event:React.MouseEvent<HTMLTableRowElement>, item:T)=>void
    headerKeysMapper?: Record<string, string>
    helpMappers?: Record<string, string>
    template?: TableGridTemplate
    headerFieldClickHandler?: (newField: R) => void
    currentSortField?: R
    allowSortFields?: S
    currentSortOrder?: SortOrder
    stickyHeader?: boolean
    copyMode?: boolean
    onCopyClick?: (el:T)=>void
}


//TODO fix any
export const TableGrid = <T extends Record<string, any>, R, S>(props: TableGridProps<T, R, S>) => {

    const {
        className,
        items,
        tabKeys=Object.keys(items[0]),
        headerKeysMapper,
        callback,
        helpMappers,
        template = 'orderTemplate',
        currentSortField,
        allowSortFields,
        currentSortOrder,
        headerFieldClickHandler,
        stickyHeader = true,
        copyMode = false,
        onCopyClick
    } = props;

    const tableTemplate = localStorage.getItem(ORDERS_TABLE_TEMPLATE) ?? tableTemplateCreator(tabKeys, template) ??  '1fr 3fr 3fr 12fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr';
    const { theme } = useTheme();

    console.log('currentSortOrder ', currentSortOrder);
    console.log('items ', items);

    const tabContent = (el: T, i: number) => {



        const orderStatusForColorized = el.orderStatus;
        return (
            <tr className={cls.cellsRow} key={el._id} onDoubleClick={(e)=> {
                callback && callback(e, el);
            }}>
                {
                    tabKeys && tabKeys.map((key, index)=> {
                        if (!tabKeys.includes(key)){
                            return null;
                        }
                        if (key === 'orderId') {
                            return (
                                <td key={index}
                                    className={classNames('', { [cls[orderStatusForColorized]]: false }, [])}>
                                    <span>{el[key]}</span>
                                    {el['orderExecutionType'] === 'unplanned' && <span className={cls.unplanned}>н</span>}
                                </td>
                            );
                        }
                        if (key === 'materialName'){
                            return(
                                <td key={index} className={cls.materialNameBlock}>
                                    {copyMode &&
                                        <Button
                                            size={ButtonSize.SIZE_XS}
                                            theme={ButtonTheme.CLEAR}
                                            className={cls.copyBtn}
                                            onClick={()=>onCopyClick && onCopyClick(el)}
                                        >
                                            <Icon Svg={CopyIcon}/>
                                        </Button>}
                                    <span>{el[key]}</span>
                                </td>
                            );
                        }
                        if (key === 'description') {
                            return (
                                <td key={index}
                                    className={classNames('', { [cls[orderStatusForColorized]]: false }, [])}>
                                    <HStack justify={'between'} >
                                        <span>{el[key]}</span>
                                        {
                                            el['orderType'] !== 'independent' &&
                                            <Text
                                                className={cls.unplanned}
                                                text={'Подрядный'}
                                                size={TextSize.SIZE_S}
                                                theme={TextTheme.HIGHLIGHT}
                                            />}
                                    </HStack>
                                </td>
                            );
                        }
                        if (key === 'serialNumber') {
                            const mods = {
                                [cls[orderStatusForColorized]]: true,
                                [cls.opacityDark]: theme === Theme.DARK
                            };

                            return (
                                <td key={index} className={classNames(cls.tableCell, {}, [])}>
                                    <div>
                                        <div
                                            className={classNames(cls.colorStripe, mods, [])}></div>
                                        {i + 1}
                                    </div>
                                </td>
                            );
                        }
                        if (key === 'roles' && typeof el[key] === 'object') {
                            // console.log(el[key]);
                            return (
                                <td
                                    key={index}
                                    className={classNames(cls.tooltip, {}, [])}
                                >
                                    {el[key].join(', ')}
                                </td>
                            );
                        }
                        if (key === 'materials' && Array.isArray(el[key])){
                            return (
                                <td  key={index}>
                                    <VStack max={true} gap={'8px'}>
                                        {el[key].map((material: T) => (
                                            <HStack gap={'32px'} className={cls.tableCell} key={material._id} justify={'center'}>
                                                <div className={cls.tableRowElement}>
                                                    {material.materialName}
                                                </div>
                                                <div>
                                                    {material.totalQuantity}
                                                </div>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </td>
                            );
                        }
                        if (Array.isArray(el[key]) && el[key].length > 0) {
                            console.log('el[key]-key ', el[key], key);

                            return (
                                <td  key={index}>
                                    <VStack max={true} gap={'8px'}>
                                        {el[key].map((document: T) => (
                                            <HStack className={cls.tableCell} key={document._id} justify={'center'}>
                                                <div className={classNames(cls.colorStripe, { [cls[document.status]]: true, [cls.opacityDark]: theme === Theme.DARK }, [cls.stripeMove])}></div>
                                                <div className={cls.tableRowElement} style={{ height: '30px' }}>
                                                    {
                                                        helpMappers && document.value in helpMappers
                                                            ? helpMappers[document.value]
                                                            : Array.isArray(document.value) ? document.value.join(', ') : document.value
                                                    }
                                                </div>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </td>
                            );
                        }

                        return (
                            <td key={index}
                                className={classNames('', { [cls[orderStatusForColorized]]: false }, [key === 'description' ? cls.description : undefined])}>
                                {
                                    helpMappers && el[key] in helpMappers
                                        ? helpMappers[el[key]]
                                        : Array.isArray(el[key]) ? el[key].join(', ') : el[key]
                                }
                            </td>
                        );
                    })
                }
            </tr>
        );
    };



    if (items.length > 0){
        return (
            <table className={classNames(cls.TableGrid, { [cls[template]]:true }, [className])}
                style={{ gridTemplateColumns: tableTemplate }}
            >
                <thead className={cls.theadBlock}>
                    <tr>
                        {tabKeys && tabKeys.map((header, key)=>headerKeysMapper
                            ? <th
                                className={classNames('', { [cls.stickyHeader]: stickyHeader }, [])}
                                key={key}
                                onClick={()=>{
                                    if (allowSortFields && Object.values(allowSortFields).includes(header as R)){
                                        headerFieldClickHandler && headerFieldClickHandler(header as R);
                                    }
                                }}
                            >
                                <HStack gap={'4px'} max justify={'center'}>
                                    {headerKeysMapper[header]}
                                    {
                                        currentSortOrder === 'asc'
                                            ? <ArrowDown
                                                className={classNames(cls.sortIndicator, {}, [header === currentSortField ? cls.activeField : undefined])}/>
                                            : <ArrowUp
                                                className={classNames(cls.sortIndicator, {}, [header === currentSortField ? cls.activeField : undefined])}/>
                                    }
                                </HStack>

                            </th>
                            : <th
                                key={key}
                            >
                                {header}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody className={cls.tbodyBlock}>
                    {items && items.map((el, i)=>{
                        return(
                            tabContent(el, i)
                        );
                    }
                    )}
                </tbody>
            </table>
        );
    }

    return (
        <div className={cls.skeleton}>
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}
            {/*<Skeleton height={50} width={availDisplayResolution - 100}/>*/}

        </div>
    );

};

TableGrid.displayName = 'TableGrid';