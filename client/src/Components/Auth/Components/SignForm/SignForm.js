import React from 'react';
import PropTypes from 'prop-types';

const SignForm = ({ setField, submitForm, values, fields }) => {
    return <>
        <form onSubmit={submitForm}>
            {fields.map(d => {
                const { key, name } = d;
                return <div key={key} className="input-box">
                    <p><b>{name}</b></p>
                    <input
                        className="text-field"
                        value={values[key]}
                        name={key}
                        onChange={setField}
                        type={key === "password" || key === "passwordConf" ? "password" : ''}
                    />
                </div>
            })}
            <input id="submit" className="btn green-button" type="submit" value="Continue" />
        </form>
    </>
}

SignForm.propTypes = {
    setField: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    values: PropTypes.shape({
        email: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        passwordConf: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
    fields: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        name: PropTypes.string
    }))
}

export default SignForm;
