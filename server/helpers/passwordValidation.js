export default (password) => {
  if (password.length < 8) {
    throw new Error('Password lentgh must be more than 8 symbols');
  }
  if (!/^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{7,}$/.test(password)) {
    throw new Error('Password can include only AZ, az, 09, .-');
  }

  return true;
};
