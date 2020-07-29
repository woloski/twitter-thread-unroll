import fetchTweetThread from '../../../lib/twitter';

export default async function handler(req, res) {
    const {
      query: { lastId },
    } = req  
    
    var username;
    if (req.query.username) 
      username = req.query.username;
    else 
      username = process.env.TWITTER_USERNAME; 
    
    const thread = [];
    try {
      await fetchTweetThread(lastId, thread); 
    } catch (error) {
      res.status(500).send(`Something went wrong ${error}`);
    }
    
    if (thread.length === 0) res.status(404).send(`Tweet not found ${lastId}`);
    
    const note = thread.map(t => `[twitter https://twitter.com/${username}/status/${t.id_str}?conversation=none]`).join('\n');
    res.status(200).send(note);
  }

  
