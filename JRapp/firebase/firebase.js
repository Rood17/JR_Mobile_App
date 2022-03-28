import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore/lite';
import 'firebase/firestore';

import firebaseConfig from './config';

class Firebase {


    constructor() {


        const app = initializeApp(firebaseConfig);

        this.db = getFirestore(app);


    }


}

const firebase = new Firebase();
export default firebase;