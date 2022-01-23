import { Spinner } from 'react-bootstrap';

const Button = ({
    variant = 'primary',
    loading,
    disabled,
    onClick,
    children,
    type = 'button',
    className,
}) => {
    const getVariantClass = () => {
        let classes = '';
        if (variant === 'primary') {
            classes += ' custom-primary-outline-btn ';
        }
        return classes;
    };
    return (
        <button
            className={
                `
                ${getVariantClass()}
                ${loading || disabled ? 'opacity-75 pointer-events-none' : ''}
                ${className}
                `
            }
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {loading && (
                <Spinner animation="border" size="sm" />
            )}
            {children}
        </button>
    );
};

export default Button;
