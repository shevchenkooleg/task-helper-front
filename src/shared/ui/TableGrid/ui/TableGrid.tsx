import cls from './TableGrid.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TableGridTemplate } from '@/shared/types/ui';
import { HStack } from '../../Stack';
import ArrowDown from '@/shared/assets/icons/ArrowDown.svg';
import ArrowUp from '@/shared/assets/icons/ArrowUp.svg';
import { SortOrder } from '@/shared/types/sort';
import { ORDERS_TABLE_TEMPLATE } from '@/shared/const/localStorage';
import { tableTemplateCreator } from '@/shared/lib/tableTemplateCreator/tableTemplateCreator';

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
}

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
        headerFieldClickHandler
    } = props;

    // const tableTemplate = localStorage.getItem(ORDERS_TABLE_TEMPLATE) ?? DefaultTableTemplatesObject[template];
    const tableTemplate = localStorage.getItem(ORDERS_TABLE_TEMPLATE) ?? tableTemplateCreator(tabKeys, template) ??  '1fr 3fr 3fr 12fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr';
    console.log(tableTemplateCreator(tabKeys, template));


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
                        if (key === 'serialNumber') {
                            return (
                                <td key={index} className={classNames(cls.tableCell, {}, [])}>
                                    <div>
                                        <div
                                            className={classNames(cls.colorStripe, { [cls[orderStatusForColorized]]: true }, [])}></div>
                                        {i + 1}
                                    </div>
                                </td>
                            );
                        }
                        if (key === 'roles' && typeof el[key] === 'object') {
                            console.log(el[key]);
                            return (
                                <td
                                    key={index}
                                    className={classNames(cls.tooltip, {}, [])}
                                >
                                    {el[key].join(', ')}
                                </td>
                            );
                        }
                        if (typeof el[key] === 'object') {
                            return (
                                <td
                                    key={index}
                                    className={classNames(cls.tableCell, { [cls[el[key].status]]: false }, [])}
                                >
                                    <div>
                                        <div
                                            className={classNames(cls.colorStripe, { [cls[el[key].status]]: true }, [])}></div>
                                        {
                                            helpMappers && el[key].value in helpMappers
                                                ? helpMappers[el[key].value]
                                                : Array.isArray(el[key].value) ? el[key].value.join(', ') : el[key].value
                                        }
                                    </div>

                                    {/*{helpMappers && <span className={cls.help}>*/}
                                    {/*    {helpMappers ? helpMappers[el[key].status] : el[key].status}*/}
                                    {/*</span>}*/}
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
                                {/*{tooltip && <span className={cls.help}>*/}
                                {/*    {helpMappers ? helpMappers[el[key]] : el[key]}*/}
                                {/*</span>}*/}
                            </td>
                        );
                    })
                }
            </tr>
        );
    };



    if (items.length > 0){
        console.log(tabKeys);
        return (
            <table className={classNames(cls.TableGrid, { [cls[template]]:true }, [className])}
                style={{ gridTemplateColumns: tableTemplate }}
            >
                <thead className={cls.theadBlock}>
                    <tr>
                        {tabKeys && tabKeys.map((header, key)=>headerKeysMapper
                            ? <th
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
                                onClick={()=>{console.log(header);}}
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
        <div></div>
    );
};

TableGrid.displayName = 'TableGrid';