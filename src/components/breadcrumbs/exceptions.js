/**
 * this file export the exceptions for the urls parts replacement.
 * index: index of the part that should be replaced
 * match: react-router match object
 * getUpdatedText: this function is required for making the text from BreadcrumbText props
 *
 * These exceptions should be used for replacing url parts according to replacement rules
 */

export default [{
    index: 2,
    match: {
        path: '/pasta/:id',
        exact: true
    },
    getUpdatedText: ({pastaName}) => pastaName || 'Loading...'
}];
