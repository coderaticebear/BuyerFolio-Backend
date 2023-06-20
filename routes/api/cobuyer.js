const express = require("express");
const passport = require("passport");
const router = express();
const { body, validationResult } = require("express-validator");
router.use(express.json());
router.use(express.urlencoded());

router.post(
  "addCobuyer",
  passport.authenticate("jwt", { session: false }),
  [
    body()
  ]
  async (req, res) => {}
);

module.exports = router;
