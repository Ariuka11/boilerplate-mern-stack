const express = require('express');
const router = express.Router();
const {Favourite} = require("../models/Favourite")
const { auth } = require("../middleware/auth");

//=================================
//             Favourite
//=================================

router.get("/favId", auth, (req, res) => {
    Favourite.find(req.params.movieId)
});



module.exports = router;
