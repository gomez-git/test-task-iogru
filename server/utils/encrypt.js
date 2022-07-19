import { createHmac } from 'crypto';

export default (password) => {
  const hash = createHmac('sha256', process.env.PASSWORD_SECRET);
  hash.update(password);
  return hash.digest('hex');
};
