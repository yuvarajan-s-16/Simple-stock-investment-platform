export function convertToUnixTimestamp(data) {
    const convertedData = [];
    for (const [key, value] of Object.entries(data)) {
        const timestamp = new Date(key).getTime();
        convertedData.push([timestamp, parseFloat(value['1. open'])]);
    }
    return convertedData;
}



