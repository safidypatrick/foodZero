import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from '@/axios';
import { ImSpinner9 } from 'react-icons/im';
import './styles.scss';

export const useMutation = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const buttonRef = React.useRef(null);
    let buttonText = "";

    const handleDisable = (props) => {
        if (props && props?.disabled) {
            return props?.disabled;
        }

        return loading;
    }

    const fusion = (props) => {
        return {
            disabled: handleDisable(props),
            ref: buttonRef
        }
    }

    const postFunction = (params) => {
        setLoading(true);

        if (buttonRef?.current) {
            buttonText = buttonRef.current.textContent;
            let appContainer = document.createElement(`div`);
            const element = (<div className="h735-loading-spinner"><ImSpinner9 className="icon"/> Loading</div>);

            ReactDOM.render (
                element,
                appContainer
            );

            buttonRef.current.innerHTML = appContainer.innerHTML;
        }

        return new Promise((resolve, reject) => {
            return axios.post(url, params)
            .then(response => {
                if (response) {
                    
                    setResponse(response);
                    setError(null);
                    setLoading(false);

                    if (buttonRef?.current) {
                        buttonRef.current.innerText = buttonText;
                    }
                    resolve(response);
                } else {
                    setLoading(false);
                    if (buttonRef?.current) {
                        buttonRef.current.innerText = buttonText;
                    }
                    resolve(response);
                    setError(true);
                }
            }).catch(error => {
                
                setError(error);

                setLoading(false);
                if (buttonRef?.current) {
                    buttonRef.current.innerText = buttonText;
                }
                reject(error);
            })
        })
    }

    // custom hook returns value
    return [postFunction, { response, error, loading, fusion }];
};