

export const bind = ( data, property, elementId ) => {
    const elem = $$(elementId);

    Object.defineProperty( data, property, {
        set ( value ) {
            this[`_${property}`] = value;
            elem.textContent = value;
        },
        get() {
            return this[`_${property}`];
        }
    });
};

export const bindData = ( inputId, data, property ) => {
    const inputElem = $$(inputId);

    inputElem.addEventListener('input', (event) => {
        data[property] = event.target.value;
    });
}