import { initializeApp, getApps  } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebase/firestore';

import firebaseConfig from './config';

class Firebase {

    
    constructor() {


        const app = initializeApp(firebaseConfig);

        console.log("app  : " + app )
        this.db = getFirestore(app);
        console.log("db  : " + this.db )


    }
}

const firebase = new Firebase();
export default firebase;