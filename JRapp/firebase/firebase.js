import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore/lite';
import 'firebase/firestore';

import firebaseConfig from './config';

class Firebase {


    constructor() {


        const app = initializeApp(firebaseConfig);

        this.db = getFirestore(app);
        console.log("db length!!! : " + this.db.length)

        console.log("Firebase Init")



    }


}

const firebase = new Firebase();
export default firebase;