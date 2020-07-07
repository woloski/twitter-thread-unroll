import fetchTweetThread from '../../../lib/twitter';

export default async function handler(req, res) {
  const {
      query: { lastId },
    } = req  
    
    const username = process.env.TWITTER_USERNAME;
    const thread = [];
    try {
      await fetchTweetThread(lastId, thread); 
    } catch (error) {
      res.status(500).send(`Something went wrong ${error}`);
    }
    
    if (thread.length === 0) res.status(404).send(`Tweet not found ${lastId}`);
    
    const note = thread.map(t => `${t.full_text}`).join('\n---\n');
    console.log(note);
    res.status(200).send(note);
  }

  