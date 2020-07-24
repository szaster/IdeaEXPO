const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../config/middleware/isAuthenticated");

const Idea = require("../models");

// @desc Show add page
// @route GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("ideas/add");
});

// @desc Process add form
// @route POST /stories
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc Show all stories FETCH AND RENDER stories
// @route GET /stories
router.get("/", ensureAuth, async (req, res) => {
  try {
    const ideas = await Idea.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("ideas/index", {
      ideas,
    });
  } catch (error) {
    console.error(err);
    res.render("error/500");
  }
});

// @desc Show single story page
// @route GET /stories/id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await Idea.findById(req.params.id).populate("user").lean();

    if (!idea) {
      return res.render("error/404");
    }

    res.render("ideas/show", {
      idea,
    });
  } catch (error) {
    console.error(err);
    res.render("error/404");
  }
});

// @desc Show edit page
// @route GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const idea = await Idea.findOne({
      where: {
        _id: req.params.id,
      },
    }).lean();

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

// @desc Update story
// @route PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await Idea.findById(req.params.id).lean();

    if (!idea) {
      return res.render("error/404");
    }

    if (idea.user != req.user.id) {
      res.redirect("/ideas");
    } else {
      story = await Idea.findOneAndUpdate(
        { where: { _id: req.params.id } },
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

// @desc Delete story
// @route DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Idea.remove({ where: { _id: req.params.id } });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(err);
    return res.render("error/500");
  }
});

// @desc User stories
// @route GET /stories/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const ideas = await Idea.find({
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
