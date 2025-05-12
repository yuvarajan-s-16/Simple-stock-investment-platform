

export const readableTimestamp=(timestamp)=>{
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      // omitting second option
      hour12: false,
    };
    
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
}


