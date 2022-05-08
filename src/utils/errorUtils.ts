interface ServerError {
    context: { label: string };
    message: string;
}

export const getErrorsForFormik = (errors: Array<ServerError>) => {
    const result: { [k: string]: any } = {};
    if (errors === undefined || errors.length === 0) return result;

    errors.forEach((error) => {
        let fieldName = error.context.label
        fieldName = fieldName.charAt(0).toLowerCase() + fieldName.slice(1);
        result[fieldName] = error.message;
    });
    return result;
}