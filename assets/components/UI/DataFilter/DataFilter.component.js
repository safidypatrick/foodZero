import React from 'react';
import './DataFilter.styles.scss';

class DataFilter extends React.Component {

    state = {
        typingTimeout: null,
        filters: null
    };

    componentDidMount() {
        this.handleSearchable();
    }

    handleSearchable = () => {
        const self = this;

        const { columns } = this.props;

        const fields = columns.filter(column => !column.hasOwnProperty('component'));

        let searchable = [];

        fields.map(field => {
            if (field?.searchable === true || !field.hasOwnProperty('searchable')) searchable.push(field.name)
        });

        self.setState({
            filters: {
                search: {
                    fields: searchable,
                    value: ""
                },
                sort: {
                    field: fields[0].name,
                    value: 'ASC'
                }
            }
        });
    }

    handleFilterChange = (event, type, filter) => {
        const self = this;
        const filters = self.state.filters;
        const newValue = String(event.target.value).trim();

        if (self.state.typingTimeout) {
            clearTimeout(self.state.typingTimeout);
        }

        self.setState({
            typingTimeout: setTimeout(function () {

                self.setState({
                    filters: {
                        ...filters,
                        [filter]: {
                            ...filters[filter],
                            [type]: newValue
                        }
                    },
                }, () => {
                    const { onFilter } = self.props;
                    event.target.value = newValue;
                    if (typeof onFilter === 'function') onFilter(self.state.filters);
                });
            }, 500)
        })
    }

    render() {
        return (
            <div className="data-filters">
                <div className="flex">
                    <div className="search-group">
                        <div className="search-input">
                            <input
                                type="text"
                                className="border"
                                placeholder={`Recherche...`}
                                onChange={(event) => this.handleFilterChange(event, 'value', 'search')}/>
                        </div>
                    </div>

                    {/* { this.state.filters?.search ? (
                    <>
                        Search : { this.state.filters.search.value }
                    </>) : null} */}
                    
                    
                    <div className="flex-auto">
                        {/* Filter options here */}
                    </div>
                </div>
            </div>
        )
    }
}

export default DataFilter
