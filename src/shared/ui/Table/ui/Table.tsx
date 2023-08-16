import cls from './Table.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface TableProps<T> {
    className?: string
    tabKeys?: Array<string> //Если не передать параметр 'tabKeys' - компонент отобразить все имеющиеся поля объектов
    items: Array<T>
    callback?: (event:React.MouseEvent<HTMLTableRowElement>, item:T)=>void
    headerKeysMapper?: Record<string, string>
}

export const Table = <T extends Record<string, any>>(props: TableProps<T>) => {
    
    const { className, items, tabKeys=Object.keys(items[0]), headerKeysMapper, callback } = props;

    console.log(items);
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
                        <tr key={i} onDoubleClick={(e)=> {
                            callback && callback(e, el);
                        }}>
                            {
                                tabKeys && tabKeys.map(key=>{
                                    return (
                                        <td key={key}>
                                            {Array.isArray(el[key]) ? el[key].join(', ') : el[key]}
                                        </td>
                                    );
                                })
                            }
                        </tr>
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