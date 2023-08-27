import cls from './Table.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface TableProps<T> {
    className?: string
    tabKeys?: Array<string> //Если не передать параметр 'tabKeys' - компонент отобразить все имеющиеся поля объектов
    items: Array<T>
    callback?: (event:React.MouseEvent<HTMLTableRowElement>, item:T)=>void
    headerKeysMapper?: Record<string, string>
    helpMappers?: Record<string, string>
}

export const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
    
    const { className, items, tabKeys=Object.keys(items[0]), headerKeysMapper, callback, helpMappers } = props;

    const tabContent = (el: T, i: number) => {

        const orderStatusForColorized = el.orderStatus;
        // console.log('tabKeys ', tabKeys);

        return (
            <tr className={cls.cellsRow} key={i} onDoubleClick={(e)=> {
                callback && callback(e, el);
            }}>
                {
                    tabKeys && tabKeys.map(key=>{
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
                                    {helpMappers && <span className={cls.help}>
                                        {helpMappers ? helpMappers[el[key].status] : el[key].status}
                                    </span>}
                                </td>
                            );
                        }
                        return (
                            <td key={key} className={classNames('', { [cls[orderStatusForColorized]]:true }, [])}>
                                {
                                    helpMappers && el[key] in helpMappers
                                        ? helpMappers[el[key]]
                                        : Array.isArray(el[key]) ? el[key].join(', ') : el[key]
                                }
                                {helpMappers && <span className={cls.help}>
                                    {helpMappers ? helpMappers[el[key]] : el[key]}
                                </span>}
                            </td>
                        );
                    })
                }
            </tr>
        );
    };


    if (items.length > 0){
        return (
            <table className={classNames(cls.Table, {}, [className])}>
                <thead>
                    <tr>
                        {tabKeys && tabKeys.map((header, key)=>headerKeysMapper
                            ? <th key={key}>{headerKeysMapper[header]}</th>
                            : <th key={key}>{header}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
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

Table.displayName = 'Table';




// Object.values(el).map((value, key)=>(
//     <td key={key}>
//         {Array.isArray(value) ? value.join(', ')  : value }
//     </td>
// ))