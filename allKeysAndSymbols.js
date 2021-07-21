function allKeysAndSymbols (object) {
    let result = [];

    result = result.concat(Object.getOwnPropertyNames(object));
    result = result.concat(Object.getOwnPropertySymbols(object));
    
    if (Object.getPrototypeOf(object)) {
        result = result.concat(
            allKeysAndSymbols(Object.getPrototypeOf(object))
        );
    }

    return result;
}

console.log("allKeysAndSymbols({test: test})", allKeysAndSymbols({test: "test"})) // ["constructor", "__defineGetter__", "__defineSetter__", "hasOwnProperty", ... ]
