import { useField } from 'formik';

function Input({ name, label, required = true, ...props }) {
    const [field, meta] = useField(name);
    return (
        <div className='field-container'>
            <label htmlFor={field.name}>
                {label}
                <span className="required field-err-message">
                    <span>{required && ' *'}</span>
                </span>
            </label>
            {/* <input {...field} {...props} className="w-full bg-white px-4 py-2 rounded-none focus:outline-none" /> */}
            {props.type === 'textarea' ?
                <textarea {...field} {...props}></textarea> :
                <input {...field} {...props} />
            }
            {meta.touched && meta.error ? (
                <div className="f-sm greenText fst-italic">*{meta.error}</div>
            ) : null}
        </div>
    );
};

export default Input;
