const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../config/middleware/isAuthenticated");

const db = require("../models");
const { assert } = require("chai");

// @desc Show add page
// @route GET /stories/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("ideas/add");
});

// @desc Process add form

// @route POST /ideas
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
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

// @description Show all ideas
// @route GET /ideas/////current path///
// router.get("/", ensureAuth, async (req, res) => {
//   try {
//     const ideas = await db.idea
//       .findAll({ status: "public" })
//       .sort({ createdAt: "desc" });

//     res.render("ideas/index", {
//       ideas,
//     });
//   } catch (error) {
//     console.error(err);
//     res.render("error/500");
//   }
// });

// // @desc Delete story
// // @route DELETE /stories/:id
// router.delete("/:id", ensureAuth, async (req, res) => {
//   try {
//     await db.idea.destroy({ where: { id: req.params.id } });
//     res.redirect("/dashboard");
//   } catch (error) {
//     console.error(err);
//     return res.render("error/500");
//   }
// });

// // @desc Show single story page
// // @route GET /stories/id
// router.get("/:id", ensureAuth, async (req, res) => {
//   try {
//     let idea = await db.idea.findByPk(req.params.id).populate("user");

//     if (!idea) {
//       return res.render("error/404");
//     }

//     res.render("ideas/display", {
//       idea,
//     });
//   } catch (error) {
//     console.error(err);
//     res.render("error/404");
//   }
// });

// // @desc Show edit page
// // @route GET /stories/edit/:id
// router.get("/edit/:id", ensureAuth, async (req, res) => {
//   try {
//     const idea = await db.idea
//       .findOne({
//         where: {
//           id: req.params.id,
//         },
//       })
//       .lean();

//     if (!idea) {
//       return res.render("error/404");
//     }

//     if (idea.user != req.user.id) {
//       res.redirect("/ideas");
//     } else {
//       res.render("ideas/edit", {
//         idea,
//       });
//     }
//   } catch (error) {
//     console.error(err);
//     return res.render("error/500");
//   }
// });

// // @desc Update story
// // @route PUT /stories/:id
// router.put("/:id", ensureAuth, async (req, res) => {
//   try {
//     let idea = await db.idea.findByPk(req.params.id);

//     if (!idea) {
//       return res.render("error/404");
//     }

//     if (idea.user != req.user.id) {
//       res.redirect("/ideas");
//     } else {
//       story = await db.idea.findOne(
//         { where: { id: req.params.id } },
//         req.body,
//         {
//           new: true,
//           runValidators: true,
//         }
//       );

//       res.redirect("/dashboard");
//     }
//   } catch (error) {
//     console.error(err);
//     return res.render("error/500");
//   }
// });

// @desc User stories
// @route GET /stories/user/:userId
// router.get("/user/:userId", ensureAuth, async (req, res) => {
//   try {
//     const ideas = await db.idea.findAll({
//       user: req.params.userId,
//       status: "public",
//     });
//     // .populate("user");
//     // .lean();

//     res.render("ideas/index", {
//       ideas,
//     });
//   } catch (error) {
//     console.error(err);
//     res.render("error/404");
//   }
// });

module.exports = router;
