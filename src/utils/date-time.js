const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
};

export default (timestamp) => timestamp ? new Intl.DateTimeFormat('en-US', options).format(timestamp) : '';