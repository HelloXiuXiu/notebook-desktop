import process from 'socket:process';
import os from 'socket:os';

import Tonic from '@socketsupply/tonic';
import bundle from '@socketsupply/components';

bundle(Tonic) // attach everything

if (process.env.DEBUG) {
  console.log('started in debug mode')
}

