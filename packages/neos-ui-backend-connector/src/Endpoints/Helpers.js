const concatenatePrependAndKey = (prepend, key) => {
    if (prepend) {
        return prepend + '[' + key + ']';
    }
    return key;
};

const urlWithParamsInner = (searchParams, prepend, params = {}) => {
    Object.keys(params).forEach(key => {
        const value = params[key];
        if (Array.isArray(value)) {
            value.forEach(v =>
                searchParams.append(concatenatePrependAndKey(prepend, key) + '[]', v)
            );
        } else if (typeof value === 'object') {
            urlWithParamsInner(searchParams, concatenatePrependAndKey(prepend, key), value);
        } else {
            searchParams.append(key, value);
        }
    });
};

export const searchParams = (params = {}) => {
    const searchParams = new URLSearchParams();
    urlWithParamsInner(searchParams, '', params);
    return searchParams;
};

/**
 * Serializes an object to PHP-compatible URL serialization, with support for nested objects and arrays.
 *
 * @param urlString
 * @param params
 * @return strinf
 */
export const urlWithParams = (urlString, params = {}) => {
    console.log(urlString.indexOf(window.location.origin) === 0 ?
        window.location.origin + urlString :
        urlString);
    const url = new URL(
        urlString.indexOf(window.location.origin) === 0 ?
            urlString :
            window.location.origin
    );

    url.search = searchParams(params).toString();

    return url.toString();
};
