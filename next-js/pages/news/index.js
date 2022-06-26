import Link  from 'next/link';

const NewsPage = () => {

    return (
        <>
        <h1>The News Page</h1>
        <ul>
            <li>
                <Link href='/news/first'>
                    This is first
                </Link>
            </li>
            <li>
                <Link href='/news/second'>
                    Second
                </Link>
            </li>
        </ul>
        </>);
};

export default NewsPage;