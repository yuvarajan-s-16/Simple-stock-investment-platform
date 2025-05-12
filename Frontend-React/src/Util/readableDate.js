export function readableDate(dateString) {
    // Parse the input string to create a Date object
    const date = new Date(dateString);

    // Format the date components
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    // Construct the formatted date string
    const formattedDate = `${year}/${month}/${day} `;
    const formattedTime = `${hours}:${minutes}:${seconds}`

    return {date:formattedDate,time:formattedTime};
}