import {SLUG_IDENTIFIER} from '../constants/strings';

export const nameInitials = (name) => {
  let init = '';
  name = name.toLowerCase();
  if (
    !(
      name.startsWith('the ') ||
      name.startsWith('a ') ||
      name.startsWith('an ')
    )
  )
    init = name.charAt(0);
  let temp = name;
  while (init.length < 2 && temp.indexOf(' ') > -1) {
    init += temp.charAt(temp.indexOf(' ') + 1);
    temp = temp.substr(temp.indexOf(' ') + 1);
  }
  return init.toUpperCase();
};

export const isOpen = ({opens_at, closes_at}) => {
  let dt = new Date();
  let currParts = [dt.getHours(), dt.getMinutes()];
  let startParts = opens_at.split(':');
  let endParts = closes_at.split(':');
  let currTime = Number(currParts[0]) * 60 + Number(currParts[1]);
  let startTime = Number(startParts[0]) * 60 + Number(startParts[1]);
  let endTime = Number(endParts[0]) * 60 + Number(endParts[1]);
  return currTime < endTime && currTime > startTime;
};

export const parseQRCode = (data) => {
  let link = `${data.data}`;
  if (link.startsWith('upi://pay')) {
    let start = link.indexOf(SLUG_IDENTIFIER);
    if (start === -1) return null;
    start += SLUG_IDENTIFIER.length;
    let end = link.indexOf('&', start);
    if (end === -1) end = link.length;
    let slug = link.substring(start, end);
    console.log(slug);
    return slug;
  }
};
