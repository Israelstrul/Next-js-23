//import {useState, useEffect} from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'first address',
        description: 'descriptioon of meetup'
    },
    {
        id: 'm2',
        title: 'Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'The secondt address',
        description: 'descriptioon of a big meetup'
    },
];

const HomePage = (props) => {

//    const [loadedMertups, setLoadedMeetups] = useState([]);

//    useEffect( () => {
//        setLoadedMeetups(DUMMY_MEETUPS);
//    }, []);

    return (
            <MeetupList meetups={props.meetups}/>
           );
};

/*
export const getServerSideProps = async (context) => {

    const req = context.req;
    const res = context.res;

    return {
        props: {
            meetups: DUMMY_MEETUPS
        }
    };
};
*/


export  const getStaticProps = async () => {

    
    const client = await MongoClient.connect(
        'mongodb+srv://israels:ISRtlim2@cluster0.e3hnalx.mongodb.net/meetups?retryWrites=true&w=majority'
        );

    const db = client.db();

    const meetupCollection = db.collection('meetups');

    const meetups = await meetupCollection.find().toArray();

    client.close();


    return {
        props: {
         meetups: 
             meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                description: meetup.description,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    };
};

export default HomePage;