const handlePromise = (promises) => {
    return promises
        .then((data) => [null, data])
        .catch((error) => [error, undefined]);
};

mudule.exports = handlePromise;