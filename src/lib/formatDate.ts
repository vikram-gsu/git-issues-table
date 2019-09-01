const formatDate = (dateString: string, locale: string="en-US") => {
  const dateObj = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZoneName: "short"
  };
  return Intl.DateTimeFormat("en-US", options).format(dateObj);
};

export default formatDate;