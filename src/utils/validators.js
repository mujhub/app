export const validatePhone = (phone) => {
  var regex = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
  return regex.test(phone);
};

export const validateOTP = (otp) => {
  var regex = /^[0-9]{6}$/;
  return regex.test(otp);
};
