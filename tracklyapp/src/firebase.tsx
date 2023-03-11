import {firebaseConfig} from './key';
import {getAuth} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
