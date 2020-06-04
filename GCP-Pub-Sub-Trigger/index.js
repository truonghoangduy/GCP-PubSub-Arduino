const { PubSub } = require('@google-cloud/pubsub');

const { Firestore } = require('@google-cloud/firestore')

const pubsub = new PubSub()
const firestore = new Firestore()

exports.subscribe = (pubsubMessage) => {
    // Print out the data from Pub/Sub, to prove that it worked
    // firebase.database.ref("duy-beo-test").
    let message = Buffer.from(pubsubMessage.data, 'base64').toString()

    firestore.collection("duy-beo-test").doc().set({
        "message"
            : message
    })
    // console.log(Buffer.from(pubsubMessage.data, 'base64').toString());

};
