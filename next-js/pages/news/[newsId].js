import { useRouter } from 'next/router';

const DetailPage = () => {

    const router =useRouter();

   console.log(router.query.newsId);

    return <h1>The Something</h1>;
};

export default DetailPage;