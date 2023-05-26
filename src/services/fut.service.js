import firebase from "../firebase";

const db = firebase.collection("/messi");

class FutDataService {
    getAll() {
    return db;
}

    create(futbol) {
    return db.add(futbol);
    }

    update(id, value) {
    return db.doc(id).update(value);
    }

    delete(id) {
    return db.doc(id).delete();
    }
}

const futDataService = new FutDataService();
export default futDataService;
