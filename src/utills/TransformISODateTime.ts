export const transformDateTimeISO = (isoDate: string) => {
  const dateObj = new Date(isoDate);
  // Extract the date in YYYY-MM-DD format
  const date = dateObj.toISOString().split("T")[0];

  // Extract the time in HH:mm:ss format
  const time = dateObj.toISOString().split("T")[1].split(".")[0];

  return { date, time };
};
