import fetchTweetThread from '../../../lib/twitter';

export default async function handler(req, res) {
    const {
      query: { lastId },
    } = req  
    
    const thread = [];
    await fetchTweetThread(lastId, thread);
    
    res.status(200).json(thread);
  }

  