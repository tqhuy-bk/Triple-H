import methods from 'validator';

class Validator {
    constructor(rules) {
        this.rules = rules;
        this.initiate();
    }

    initiate() {
        this.isValid = true;
        this.errors = {};
    }

    validate(state) {
        this.initiate();
        this.rules.forEach((rule) => {
            if (this.errors[rule.field]) return;

            const fieldValue = state[rule.field] || '';
            const args = rule.args || [];
            const validationMethod = typeof rule.method === 'string'
                ? methods[rule.method]
                : rule.method;

            if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
                this.errors[rule.field] = rule.message;
                this.isValid = false;
            }
        });
        return this.errors;
    }
}

const isEmpty = (text, state) => {
    return text.trim() === "";
}

const nonSpace = (text, state) => {
    return !text.trim().includes(" ");
}

const username = (text, state) => {
    const regex = /^[a-zA-Z0-9_^&()@$-]{3,25}$/
    return regex.test(text);
}

const nameid = (text, state) => {
    const regex = /^[a-zA-Z0-9_^&()@$-]{6,60}$/
    return regex.test(text);
}

const validatePassword = (password, state) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/
    return regex.test(password);
}

const validatePhoneNumber = (phone, state) => {
    if (phone === "") return true;
    const regex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    return regex.test(phone);
}

const isFloat = (value) => {
    // var x = parseFloat(text);
    // return !isNaN(x);
    return !isNaN(value) && value.toString().indexOf('.') !== -1
}

export default Validator;

export { validatePassword, validatePhoneNumber, isEmpty, nonSpace, username, isFloat, nameid };