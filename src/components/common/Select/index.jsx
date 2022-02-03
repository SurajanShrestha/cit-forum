import { useField } from 'formik';

const Select = ({ name, label, required = true, ...props }) => {
    const [field, meta] = useField(name);

    return (
        <div className="field-container">
            <label htmlFor={field.name}>
                {label}
                <span className="required field-err-message">
                    <strong>{required && ' *'}</strong>
                </span>
            </label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="f-sm greenText fst-italic">*{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Select;
