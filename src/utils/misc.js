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
