import reviewService from "../Services/reviewService.js";



const addReview = async (req, res) => {
    const { score, gameId } = req.body;
  
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    const userId = req.user.id;
    const audioUrl = `http://localhost:3000/${req.file.path.replace(/\\/g, '/')}`; 
  
    try {
      await reviewService.addReview(userId, gameId, score, audioUrl);
      res.status(201).json({ message: 'Review added successfully!' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Failed to add review' });
    }
  };

  const editReview = async (req, res) => {
    const { score, gameId } = req.body;
  
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    const userId = req.user.id;
    const audioUrl = `http://localhost:3000/${req.file.path.replace(/\\/g, "/")}`; 
  
    try {
      const response = await reviewService.updateReview(userId, gameId, score, audioUrl);
      res.json(response);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to update review" });
    }
  };

  const getGameReviews = async (req, res) => {
    const { id: gameId } = req.params;
  
    try {
      const reviews = await reviewService.getGameReviews(gameId);
      res.json(reviews);

      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch game reviews" });
    }
  };

  const getLatestReviews = async (req, res) => {
    try {
      const reviews = await reviewService.getLatestReviews();
      res.json(reviews);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch latest reviews" });
    }
  };

  const getAllGameReviews = async (req, res) => {
    const { id: gameId } = req.params;
  
    try {
      const reviews = await reviewService.getAllGameReviews(gameId);
      res.json(reviews);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch game reviews" });
    }
  };
  
  const getMyReviews = async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    const { id: userId } = req.user;
  
    try {
      const reviews = await reviewService.getMyReviews(userId);
      res.json(reviews);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch user reviews" });
    }
  };
  
  
  
  export { addReview,editReview,getGameReviews,getLatestReviews,getAllGameReviews,getMyReviews };
