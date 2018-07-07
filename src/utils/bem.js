import entries from 'lodash.topairs';

// Creates an array of truthy elements
const joinTruthy = (glue, ...args) => args.filter(arg => arg).join(glue);

// Simple bem function
const bem = (blockName, elementName, options = {}) => {
    const mainStyle = joinTruthy('__', blockName, elementName);
    const styles = [
        mainStyle,
        ...entries(options)
            .reduce(
                (classes, [key, enabled]) => enabled
                    ? [
                        ...classes,
                        [mainStyle, key].join('--')
                    ]
                    : classes, []
            )
    ].join(' ');
    return ({
        addClasses: (...args) => [styles, ...args].join(' '),
        toString: () => styles
    });
};

export default bem;