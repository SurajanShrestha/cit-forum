import * as Yup from 'yup'

export const numberValidation = (dimension, max = 5) => {
    return Yup
        .string()
        .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
        .required(`${dimension} is required`)
        .max(max, `${dimension} is at most ${max} characters`)
        .nullable()
}
export const numberValidationWithDecimal = (dimension, max = 5) => {
    return Yup
        .string()
        .matches(/^\d*\.?\d*$/, 'Only numbers are allowed for this field')
        .max(max, `${dimension} is at most ${max} characters`)
        .required(`${dimension} is required`)
        .nullable()
}

export const UserNameValidation = () => {
    return Yup
        .string()
        .required('User Name is required')
        .matches(
            /^[a-zA-Z0-9_.-]*$/,
            'Only alphabets and numbers are allowed for this field'
        )
        .min(3, 'Username should be minimum 3 characters length')
        .max(15, 'Username should be maximum 15 characters length')
}

export const PhoneValidation = (name = 'Phone Number', min = 10, max = 14, minMessage = 'Phone Number is not valid', maxMessage = 'Phone Number is not valid') => {
    return Yup
        .string()
        .required(`${name} is required`)
        .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
        .min(min, minMessage)
        .max(max, maxMessage)
        .nullable()
}

export const checkEmailValidity = (email) =>
    Yup
        .object()
        .shape({
            email: Yup.string().email()
        })
        .isValid({ email })

export const EmailValidation = () => {
    return Yup.string().email('Enter a valid email')
}

export const EmailValidationWithoutRequiredField = (message) => {
    return Yup.string().email(message)
}

export const AlphabetsValidation = (name) => {
    return Yup
        .string()
        .required(name + ' is required')
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
}

export const LoginPasswordValidation = () => {
    return Yup.string().required('Password is required')
}

export const PasswordValidation = () => {
    return Yup.string()
        .required('Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Password must be minimum of six characters, with at least one uppercase letter, one lowercase letter, one number and one special character'
        )
}

export const NewPasswordValidation = () => {
    return Yup.string()
        .required('New Password is required')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Password must be minimum of six characters, with at least one uppercase letter, one lowercase letter, one number and one special character'
        )
}

export const ConfirmNewPassword = () => {
    return Yup.string()
        .required('Confirmed Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Password must be minimum of six characters, with at least one uppercase letter, one lowercase letter, one number and one special character'
        )
}

export const ConfirmPassword = () => {
    return Yup.string()
        .required('Confirmed Password is required')
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Password must be minimum of six characters, with at least one uppercase letter, one lowercase letter, one number and one special character'
        )
}

export const ConfirmPasswordNot = () => {
    return Yup
        .string('Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must be minimum of eight characters, with at least one uppercase letter, one lowercase letter, one number and one special character'
        )
}

// TODO better validation

export const AlphabetsWithoutRequiredValidation = () => {
    return Yup
        .string()
        .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
}

export const NumberWithoutRequiredValidation = (name) => {
    return Yup
        .string()
        .matches(/^[0-9]+$/, 'Only numbers are allowed for this field')
        .max(10, name + ' should be maximum 10 characters length')
}
export const EmailValidationWithoutRequiredValidation = () => {
    return Yup.string('Email is required').email('Enter a valid email')
}

export const RequiredValidation = (name) => {
    return Yup.string().required(`${name} is required`)
}
export const OnlyNumberWithoutRequired = (message) => {
    return Yup.number().typeError(message)
}
export const RequiredField = (message) => {
    return Yup.string().required(`${message} is required`)
}
export const RequiredArray = (message) => {
    return Yup.array().min(1, `${message} is required`)
}

export const DecimalValidation = () => {
    return (
        Yup
            .string()
            // .matches('^\d+(\.\d{1,2})?$','Can input Decimal')
            // // .min(3, 'Username should be minimum 3 characters length')
            // // .max(15, 'Username should be maximum 15 characters length');

            // .min(2, 'Maximum Torque must be at least 2')
            // .max(50, 'Maximum Torque must be at most 50')
            .required('Maximum Torque is required')
            .optional('^d+(.d{1,2})?$')
    )
}

/* Min Max Validations */
export const AlphabetsMinMaxValidationWithReq = (name, min, max, minMessage, maxMessage) => {
    return Yup
      .string()
      .required(name + ' is required')
      // With Spaces
      .matches(/^((?!_)[A-Za-z\s])+$/, 'Only alphabets are allowed for this field ')
      // Without Spaces
      // .matches(/^((?!_)[A-Za-z])+$/, 'Only alphabets are allowed for this field ')
      // Only alphabets but also matched underscore by default
      // .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed for this field ')
      .min(min, minMessage)
      .max(max, maxMessage)
  }
  
  export const AlphabetsMinMaxValidationWithoutReq = (name, min, max, minMessage, maxMessage) => {
    return Yup
      .string()
      .matches(/^((?!_)[A-Za-z\s])+$/, 'Only alphabets are allowed for this field ')
      .min(min, minMessage)
      .max(max, maxMessage)
  }
