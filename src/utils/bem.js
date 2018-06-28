import entries from 'lodash.topairs';

// Creates an array of truthy elements
const joinTruthy = (glue, ...args) => args.filter(arg => arg).join(glue);

// Simple bem function
export default (blockName, elementName, options = {}) => [
    joinTruthy('__', blockName, elementName),
    ...entries(options)
        .reduce(
            (classes, [key, enabled]) => enabled
                ? [
                    ...classes,
                    [joinTruthy('__', blockName, elementName), key].join('--')
                ]
                : classes, []
        )
].join(' ');