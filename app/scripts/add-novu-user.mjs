// ../node_modules/.bin/env-cmd -f .env node ./scripts/add-novu-user.mjs

import { Novu } from '@novu/node';

const novu = new Novu(process.env.NOVU_API_KEY);

const user = {
  id: 'muly-oved',
  firstName: 'Muly',
  lastName: 'Oved',
  phone: '+972-52-5503595',
  email: 'mulyoved@gmail.com',
};

const answer = await novu.subscribers.identify(user.id, {
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phone: user.phone,
  avatar: user.profile_avatar,
});

console.log(`muly: ${answer.status} ${answer.statusText}`);
