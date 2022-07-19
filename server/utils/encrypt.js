import { createHmac } from 'crypto';

export default (password) => {
  const hash = createHmac('sha512', 'iogru');
  hash.update(password);
  return hash.digest('hex');
};
