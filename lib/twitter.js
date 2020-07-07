const API_URL = 'https://api.twitter.com';
const SYNDICATION_URL = 'https://syndication.twitter.com';

export default async function fetchTweetThread(lastTweetIdOfThread, thread) {    
    const tweet = await fetchTweet(lastTweetIdOfThread);
    if (!tweet) return await [];
    
    thread.push(tweet);
    if (!tweet.in_reply_to_status_id_str) {
        return await thread.reverse();
    }

    return await fetchTweetThread(tweet.in_reply_to_status_id_str, thread);
}

async function fetchTweet(tweetId) {
    // If there isn't an API token don't do anything, this is only required for videos.
    if (!process.env.TWITTER_API_TOKEN) return;
  
    const res = await fetch(
      `${API_URL}/1.1/statuses/show/${tweetId}.json?include_entities=true&tweet_mode=extended`,
      {
        headers: {
          authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
        },
      }
    );
  
    console.log('Twitter x-rate-limit-limit:', res.headers.get('x-rate-limit-limit'));
    console.log('Twitter x-rate-limit-remaining:', res.headers.get('x-rate-limit-remaining'));
    console.log('Twitter x-rate-limit-reset:', res.headers.get('x-rate-limit-reset'));

    if (res.ok) return res.json();
    if (res.status === 404) return;
  
    throw new Error(`Fetch to the Twitter API failed with code: ${res.status}`);
}