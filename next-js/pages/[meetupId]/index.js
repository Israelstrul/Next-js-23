import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {

    return (
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
    );
};


export const getStaticPaths = async () => {


    const client = await MongoClient.connect(
        'mongodb+srv://israels:ISRtlim2@cluster0.e3hnalx.mongodb.net/meetups?retryWrites=true&w=majority'
        );

    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

client.close();


    return {
        fallback: false,
        paths:    meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
        
  /*      [
            { params: {
                    meetupId: 'm1',
                },
            },
            { params: {
                    meetupId: 'm2',
                },
            },
        ] */
    };
};


export const getStaticProps = async (context) => {

    const meetupId = context.params.meetupId;

    console.log(meetupId);

    const client = await MongoClient.connect(
        'mongodb+srv://israels:ISRtlim2@cluster0.e3hnalx.mongodb.net/meetups?retryWrites=true&w=majority'
        );

    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const selectedMeetup = await meetupCollection.findOne({
         _id: ObjectId(meetupId),
         });
    
    client.close();


    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            },
            //{ ,
                //image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
                //id: meetupId,
                //title: 'First Meetup',
                //address: 'Some address',
                //description: 'the first description'
             //   },
        },
    };
};

export default MeetupDetails;

/*
image='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg'
            title='First Meetup'
            address='Some address'
            description='the first description'

*/