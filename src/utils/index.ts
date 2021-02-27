export const to2Digits = (num: number) => {
  return num > 9 ? num : `0${num}`;
};

export const time2String = (seconds: number) => {
  let mins = 0;
  if (seconds >= 60) {
    mins = Math.floor(seconds / 60);
    seconds -= mins * 60;
  }

  return `${mins}:${to2Digits(seconds)}`;
};
