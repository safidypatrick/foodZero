const handleError = (response, setError = null) => {
    let violations = [];

    if (response && response.hasOwnProperty('data')) {
        const data = response.data;

        if (data && data.hasOwnProperty('errors')) {
            const errors = data.errors;

            if (errors.hasOwnProperty('violations')) {
                violations = errors.violations;
                // console.log(violations);
                if (typeof setError === 'function') {
                    violations.map(violation => {
                        return setError(violation.propertyPath, {
                            type: 'manual',
                            message: violation.title
                        })
                    })
                }
            }
        }
    }

    return violations;
}

const showError = (errors, field) => {
    if (errors) {
        if (errors.hasOwnProperty(field)) {
            const fieldError = errors[field];
    
            if (fieldError.hasOwnProperty('message')) {
    
                if (String(fieldError?.message).length > 0)
                    return fieldError.message
            }
        }
    
        return 'This field is required.';
    }
    
    return null;
}

export {
    showError
}

export default handleError;