// import { LoadingStyled } from '@/components/UI';
import React from 'react';

const Body = ({ columns, rows, loading = false }) => {

    const handleColumnName = (column, row) => {
        let subkeys = (column.name).split(".");

        return subkeys.reduce((o, d) => o ? o[d] : null, row)
    }

    const handleEmpty = (column, row) => {
        if (column.hasOwnProperty('isEmpty') && column.isEmpty) {
            if (handleColumnName(column, row) === null || typeof handleColumnName(column, row) === "undefined" || handleColumnName(column, row)?.length === 0) {
                return column.isEmpty;
            }
        }

        return handleColumnName(column, row);
    }

    const handleRender = (column, row) => {
        // Handling component function
        if (column.hasOwnProperty('component') && typeof column.component === 'function') {
            return column.component(row);
        }

        return handleEmpty(column, row);
    }

    const renderColumnByRow = (row) => {
        let renderColumn = [];

        (columns && columns.map((column, index) => {
            
            return renderColumn.push(
            <React.Fragment key={index}>
                <td>
                    { handleRender(column, row) }
                </td>
            </React.Fragment>
            )
        }))

        return renderColumn;
    }

    // if (loading) 
    // return (<tbody>
    //             <tr>
    //                 <td
    //                     align="center"
    //                     style={{textAlign: 'center'}}
    //                     colSpan={columns.length}>
    //                     Chargement en cours
    //                 </td>
    //             </tr>
    //         </tbody>);

    return (
        <tbody>
            { rows && rows.map((row, index) => {
                return (
                    <tr key={index} style={{whiteSpace: 'nowrap'}}>
                        { renderColumnByRow(row) }
                    </tr>)
            }) }
        </tbody>
    )
}

export default Body;
