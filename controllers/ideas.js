const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../config/middleware/isAuthenticated");

const db = require("../models");

// @desc Display add page
// @route GET /ideas/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("ideas/add");
});

// @desc Process add form
// @route POST /ideas
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    //creates a new idea
    await db.idea.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @description Display all ideas FETCH AND RENDER ideas
// @route GET /ideas
router.get("/", ensureAuth,  (req, res) => {
  try {
    const ideas =  db.idea
      // .find({ status: "public" })
      .findAll({});
    // .populate("user")
    // .sort({ createdAt: "desc" })
    // .lean();

    res.render("ideas/index", {
      ideas,
    });
  } catch (error) {
    console.error(err);
    res.render("error/500");
  }
});

// // @desc Display single story page
// // @route GET /ideas/id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await db.idea.findById(req.params.id).populate("user").lean();

    if (!idea) {
      return res.render("error/404");
    }

    res.render("ideas/display", {
      idea,
    });
  } catch (error) {
    console.error(err);
    res.render("error/404");
  }
});

// // @desc Display edit page
// // @route GET /ideas/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const idea = await db.idea
      .findOne({
        where: {
          id: req.params.id,
        },
      })
      .lean();

    if (!idea) {
      return res.render("error/404");
    }

    if (idea.user != req.user.id) {
      res.redirect("/ideas");
    } else {
      res.render("ideas/edit", {
        idea,
      });
    }
  } catch (error) {
    console.error(err);
    return res.render("error/500");
  }
});

// // @desc Update story
// // @route PUT /ideas/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await db.idea.findById(req.params.id).lean();

    if (!idea) {
      return res.render("error/404");
    }

    if (idea.user != req.user.id) {
      res.redirect("/ideas");
    } else {
      story = await db.idea.findOneAndUpdate(
        { where: { id: req.params.id } },
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error(err);
    return res.render("error/500");
  }
});

// // @desc Delete story
// // @route DELETE /ideas/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await db.idea.remove({ where: { id: req.params.id } });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc User ideas
// @route GET /ideas/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const ideas = await db.idea
      .find({
        user: req.params.userId,
        status: "public",
      })
      .populate("user")
      .lean();

    res.render("ideas/index", {
      ideas,
    });
  } catch (error) {
    console.error(err);
    res.render("error/404");
  }
});

module.exports = router;
