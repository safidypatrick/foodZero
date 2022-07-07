import React, { Component } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { FaPencilAlt } from 'react-icons/fa';
import { RiSave3Fill, RiCloseFill } from 'react-icons/ri';
import './InlineEdit.style.scss';

class InlineEdit extends Component {
    constructor() {
        super();

        this.state = {
            label: '',
            value: '',
            isEdit: false,
            defaultValue: ''
        }

        // this.textInput = React.createRef();
    }

    componentDidMount() {
        const { value } = this.props;

        document.addEventListener("keydown", this.handleKeyDown);

        this.setState({
            defaultValue: value,
            loading: false,
            value: value,
            labelText: value
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const { value } = this.props;
        const { labelText } = this.state
        if (labelText !== value) {
                this.setState({
                    labelText: value
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            if (this.state.isEdit === true) {
                const { defaultValue } = this.state;
                this.setState({
                    value: defaultValue
                }, () => {
                    this.toggleEdit();
                })
            }
        }
    }

    toggleEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        }, () => {

        });
    }

    handleChange = (value) => {
        this.setState({
            value: value
        });
    }

    cancelChange = () => {
        const { defaultValue } = this.state;

        this.setState({
            value: defaultValue
        }, () => {
            this.toggleEdit();
        })      
    }

    onSave = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        }, () => {
            if (this.props.onSave) {
                const { value } = this.state;
                const { setEdit } = this.props;
                this.props.onSave(value);

                if (!setEdit) {
                    this.setState({
                        labelText: value
                    })
                }
            }
        });
    }

    render() {
        const { value, labelText, isEdit, loading } = this.state;
        const { disabled, setEdit } = this.props;

        let defaultEdit = (
                <form className="flex" onSubmit={this.onSave}>
                    <div className="flex">
                        <input 
                            autoFocus
                            type="text"
                            className="edit-input" 
                            value={value} 
                            onChange={({target: {value}}) => this.handleChange(value)}/>
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className="ml-1 py-2 px-3 text-white text-xl font-bold bg-green-600">
                        { loading ? (<div className="flex items-center"><div className="rotate-animation"><ImSpinner2/></div></div>) : <RiSave3Fill /> }
                    </button>
                    <button type="button" onClick={this.cancelChange} className="ml-1 py-2 px-3 text-white text-xl font-bold bg-red-500"><RiCloseFill/></button>
                </form>);

        if (setEdit) {
            defaultEdit = setEdit({
                handleChange: this.handleChange,
                cancelChange: this.cancelChange, 
                onSave: this.onSave,
                labelText: labelText,
                value: value
            });
        }

        const isValueEmpty = () => {
            if (value === null || typeof value === "undefined" || value?.length === 0)
                return true;

            return false;
        }

        return (
        <div className="flex inline-edit">
            { !isEdit ? (
                // Champ initial / mode affichage
                <>
                    { !isValueEmpty() ? (
                        <div className="inline-display">
                            <input
                                type="text"
                                readOnly={true}
                                defaultValue={labelText}
                                className="edit-input" />
                            {
                                !disabled ? (
                                    <div className="edit-action" onClick={this.toggleEdit}><FaPencilAlt className="mr-1"/> Editer</div>
                                ) : null
                            }   
                        </div>) : null }

                                     
                </>
            ) : (
            <div className="edit-modal">
                { defaultEdit }
            </div>) }
        </div>)
    }
}

export default InlineEdit;