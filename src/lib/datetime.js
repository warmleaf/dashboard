export const getLocalDateTime = (timeString, format) => {
  const dateTime = new Date(timeString);
  const dateTimeArray = dateTime.split(' ');
  const year = dateTimeArray[3];
  const month = dateTimeArray[1];
  const day = dateTimeArray[2];
  const week = dateTimeArray[0];
  const time = dateTimeArray[4];
  const gmt = dateTimeArray[5];

  const timeArray = time.split(':');
  const hours = timeArray[0];
  const minutes = timeArray[1];
  const seconds = timeArray[2];

  if (!format) {
    return `${year}-${month}-${day} ${time}`;
  }

  return dateTime;
};

export const getDatetime = (time, format) => {

};
