import React from 'react';
import Body from './partials/Body.partial';
import Header from './partials/Header.partial';
import { DataFilter } from '@/components/UI';
import ReactPaginate from 'react-paginate';
import './DataTable.style.scss';

class DataTable extends React.Component {

    state = {
        filters: null,
        pagination: {
            current: 1,
            limit: 10
        }
    }

    handleFilter = (values) => {
        const self = this;
        const { pagination } = self.state;
        self.setState({
            pagination: {
                ...pagination,
                current: 1
            },
            filters: values
        }, () => this.combineFilter())
    }

    handlePagination = ({ selected }) => {
        const self = this;
        const { pagination } = self.state;
        self.setState({
            pagination: {
                ...pagination,
                current: selected + 1
            }
        }, () => this.combineFilter());
    }

    combineFilter = () => {
        const self = this;
        const { onFilter } = self.props;
        const { filters, pagination } = self.state;

        if (typeof onFilter === 'function') onFilter({
            ...filters,
            pagination
        });
    }

    render() {
        const {
            columns,
            rows,
            page,
            className,
            visible = true,
            loading = false,
            classique = false
        } = this.props;

        const {
            pagination
        } = this.state;

        return (
            <div className={`datatable ${visible ? 'visible' : 'hidden'}`}>
                <div className="datatable-responsive">
                    { classique === false ? (
                        <div className="filters">
                            <DataFilter
                                columns={columns}
                                onFilter={this.handleFilter}/>
                        </div>            
                    ) : null }
                    
    
                    <table className={className}>
                        <Header 
                            columns={columns}/>
    
                        {/* Handle rows display */}
                        { !rows || rows.length === 0 ? (      
                            <tbody>
                                <tr>
                                    <td colSpan={columns.length + 1}>
                                        Aucunes données ne sont disponibles pour le moment
                                    </td>
                                </tr>
                            </tbody>
                            ) 
                        : <Body
                            columns={columns}
                            rows={rows}/> }
                    </table>
                </div>
                
                { classique === false && page && page.hasOwnProperty('number') ? (
                    <div className="table-footer">
                        <div className="pagination-display">Affichage de { pagination.current } sur { page.number } sur un total de : { page.total }</div>
                        <div className="pagination-links">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel="suivant >"
                                onPageChange={this.handlePagination}
                                pageRangeDisplayed={3}
                                pageCount={page.number}
                                previousLabel="< precedent"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    </div>
                ) : null }
            </div>
        )
    }
    
}

export default DataTable;
