const range = (start, end, maxVal) => {
  if (end > maxVal || end < 0 || start < 0 || end < start)
    return [[], [0, 0, 0, 0, 0]];
  let nums = [];
  let badnums = [];
  let otherStars = maxVal - end;
  for (let i = start; i < end; i++) nums.push(i);
  for (let i = 0; i < otherStars; i++) badnums.push(i);
  return [nums, badnums];
};

export default range;
