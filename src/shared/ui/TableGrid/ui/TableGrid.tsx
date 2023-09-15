import cls from './TableGrid.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TableGridTemplate } from '@/shared/types/ui';

interface TableGridProps<T> {
    className?: string
    tabKeys?: Array<string> //Если не передать параметр 'tabKeys' - компонент отобразить все имеющиеся поля объектов
    items: Array<T>
    callback?: (event:React.MouseEvent<HTMLTableRowElement>, item:T)=>void
    headerKeysMapper?: Record<string, string>
    helpMappers?: Record<string, string>
    tooltip?: boolean
    template?: TableGridTemplate
}

export const TableGrid = <T extends Record<string, any>>(props: TableGridProps<T>) => {

    const {
        className,
        items,
        tabKeys=Object.keys(items[0]),
        headerKeysMapper,
        callback,
        helpMappers,
        tooltip = false,
        template = 'orderTemplate'
    } = props;


    const tabContent = (el: T, i: number) => {

        const orderStatusForColorized = el.orderStatus;
        // console.log('tabKeys ', tabKeys);
        console.log(el);

        return (
            <tr className={cls.cellsRow} key={i} onDoubleClick={(e)=> {
                callback && callback(e, el);
            }}>
                {
                    tabKeys && tabKeys.map(key=>{
                        if (key === 'serialNumber'){
                            return (
                                <td key={i} className={classNames('', { [cls[orderStatusForColorized]]:false }, [])}>
                                    {i+1}
                                </td>
                            );
                        }
                        if (key === 'roles' && typeof el[key] === 'object'){
                            console.log(el[key]);
                            return (
                                <td
                                    key={key}
                                    className={classNames(cls.tooltip, {}, [])}
                                >
                                    {el[key].join(', ')}
                                </td>
                            );
                        }
                        if (typeof el[key] === 'object'){
                            return (
                                <td
                                    key={key}
                                    className={classNames(cls.tooltip, { [cls[el[key].status]]:true }, [])}
                                >
                                    {
                                        helpMappers && el[key].value in helpMappers
                                            ? helpMappers[el[key].value]
                                            : Array.isArray(el[key].value) ? el[key].value.join(', ') : el[key].value
                                    }
                                    {/*{helpMappers && <span className={cls.help}>*/}
                                    {/*    {helpMappers ? helpMappers[el[key].status] : el[key].status}*/}
                                    {/*</span>}*/}
                                </td>
                            );
                        }
                        return (
                            <td key={key} className={classNames('', { [cls[orderStatusForColorized]]:true }, [key === 'description' ? cls.description : undefined])}>
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
        return (
            <table className={classNames(cls.TableGrid, { [cls[template]]:true }, [className])}>
                <thead className={cls.theadBlock}>
                    <tr>
                        {tabKeys && tabKeys.map((header, key)=>headerKeysMapper
                            ? <th key={key}>{headerKeysMapper[header]}</th>
                            : <th key={key}>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody className={cls.tbodyBlock}>
                    {items && items.map((el, i)=>(
                        tabContent(el, i)
                    )
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