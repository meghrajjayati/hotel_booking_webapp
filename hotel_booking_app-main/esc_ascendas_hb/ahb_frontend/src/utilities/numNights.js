// gets two Date objects and calculates the difference between these dates

const numNights = (startDate, endDate) => {
  if (new Date(endDate).getTime() - new Date(startDate).getTime() <= 0) {
    return null;
  }
  return (
    Math.ceil(new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (1000 * 3600 * 24)
  );
};

export default numNights;
