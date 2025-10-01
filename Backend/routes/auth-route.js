const express = require('express');
const router = express.Router();
const { signupUser, loginUser, logOutUser, onboard } = require('../controllers/auth-controller');
const {protectRoute} = require("../middleware/auth-middleware");


router.post('/signup', signupUser, (req, res)=>{
    console.log("Step 2");
  res.json({ message: "OK" });
});
router.post('/login', loginUser);
router.post('/logout', logOutUser);

router.post('/onboarding',protectRoute, onboard);
router.get('/me',protectRoute, (req, res)=>{
  return res.status(200).json({success:true, user:req.user})
});

module.exports = router;