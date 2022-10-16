import RSS from 'rss';
import { MACHINES } from '../const/machines'
import { webURL } from '../const/webURL'

export async function getServerSideProps({ res }) {
  const feed = new RSS({
    title: 'Leonaro Torrico | Loepardis',
    site_url: `https://${webURL}`,
    feed_url: `https://${webURL}/feed.xml`
  });
  MACHINES.map(([n, post]) => {
    feed.item({
      title: post.title,
      url: `https://${webURL}/box/${post.name}`,
      date: post.posted,
      description: post.description
    });
  });
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {}
  };
}

export default function RSSFeed() {
  return null;
}