function debounce(func, delay) {
    let timeoutId;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}


function convertDate(dateString) {
    const date = new Date(dateString);

    // Define options for date formatting
    const dateOptions = { month: 'short', day: '2-digit', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

    // Create a formatted date and time string
    const formattedDate = dateString;
    const formattedTime = dateString;

    // Combine the formatted date and time
    return `${formattedDate}`;
}