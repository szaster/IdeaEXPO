const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../config/middleware/isAuthenticated");

const db = require("../models");

// Description: Display add page
// Route: GET /ideas/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("ideas/add");
});

// Description: Process add form
// Route: POST /ideas
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    //creates a new idea
    await db.idea.create({
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      userId: req.body.user,
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

// Description:ription Display all ideas FETCH AND RENDER ideas
// Route: GET /ideas
router.get("/", ensureAuth, async (req, res) => {
  try {
    const ideas = await db.idea.findAll({
      where: { status: "public" },
      include: ["user"],
      raw: true,
    });
    console.log("Ideas", ideas);
    const hbIdeas = ideas.map((idea) => {
      return {
        title: idea.title,
        id: idea.id,
        userId: idea.userId,
        name: idea["user.firstName"] + " " + idea["user.lastName"],
        image: idea["user.image"],
      };
    });

    // data is an object conforming to format used by handlebars public page:
    // 1. Constains array called ideas
    // 2. Each element of array has name, id, userId, image, and title.
    const data = { ideas: hbIdeas };

    console.log(data);

    // data for public page
    res.render("ideas/public", data);
  } catch (err) {
    console.error(err);
    console.log("all users firstnames", names);
    res.render("error/500");
  }
});

// Description: Display single idea page
// Route: GET /ideas/id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await db.idea.findOne({
      where: { id: req.params.id },
      include: ["user"],
      raw: true,
    });

    if (!idea) {
      return res.render("error/404");
    }

    res.render("ideas/display", {
      title: idea.title,
      userId: idea.userId,
      name: idea["user.firstName"] + " " + idea["user.lastName"],
      firstName: idea["user.firstName"],
      image: idea["user.image"],
      idea,
    });
  } catch (err) {
    console.error(err);
    res.render("error/404");
  }
});

// // Description: Display edit page
// // Route: GET /ideas/edit/:id

router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const idea = await db.idea.findOne({
      where: { id: req.params.id },
      raw: true,
    });

    if (!idea) {
      return res.render("error/404");
    } else {
      res.render("ideas/edit", {
        idea,
      });
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// // Description: Update idea
// // Route: PUT /ideas/:id

router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let idea = await db.idea.findOne({
      where: { id: req.params.id },
      raw: true,
    });

    if (!idea) {
      return res.render("error/404");
    } else {
      idea = await db.idea.update(
        req.body,
        { where: { id: req.params.id } },
        {
          new: true,
          runValidators: true,
        }
      );

      res.redirect("/dashboard");
    }
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// // Description: Delete idea
// // Route: DELETE /ideas/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await db.idea.destroy({ where: { id: req.params.id } });
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    return res.render("error/500");
  }
});

// Description: User ideas
// Route: GET /ideas/user/:userId

router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const ideas = await db.idea.findAll({
      where: {
        userId: req.params.userId,
        status: "public",
      },
      include: ["user"],
      raw: true,
    });

    const hbIdeas = ideas.map((idea) => {
      return {
        title: idea.title,
        id: idea.id,
        userId: idea.userId,
        name: idea["user.firstName"] + " " + idea["user.lastName"],
        image: idea["user.image"],
      };
    });

    const data = { ideas: hbIdeas };

    res.render("ideas/public", data);
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
