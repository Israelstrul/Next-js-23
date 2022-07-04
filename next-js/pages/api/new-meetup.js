// /api/new-meetup
import { MongoClient } from 'mongodb';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const data = req.body;

        console.log(data);

        const { title, image, address, description} = data;
        //const client = await MongoClient.connect(
          //  'mongodb+srv://israels:ISRtlim1@cluster0.k31qwzc.mongodb.net/meetups?retryWrites=true&w=majority'
            //);
   const client = await MongoClient.connect(
            'mongodb+srv://israels:ISRtlim2@cluster0.e3hnalx.mongodb.net/meetups?retryWrites=true&w=majority'
            ); 
   
        const db = client.db();

        const meetupCollection = db.collection('meetups');

        const result = await meetupCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
};

export default handler;