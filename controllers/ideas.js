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
router.get("/", ensureAuth, async (req, res) => {
	try {
		const ideas = await db.idea.findAll({
			where: { status: "public" },
			include: ["user"],
			raw: true,
		});

		res.render("ideas/index", {
			ideas,
		});
	} catch (err) {
		console.error(err);
		res.render("error/500");
	}
});

// @desc Display single idea page
// @route GET /ideas/id
router.get("/:id", ensureAuth, async (req, res) => {
	try {
		let idea = await db.idea.findByPk(req.params.id, {
			include: ["user"],
			raw: true,
		});

		if (!idea) {
			return res.render("error/404");
		}

		res.render("ideas/display", {
			idea,
		});
	} catch (err) {
		console.error(err);
		res.render("error/404");
	}
});

// // @desc Display edit page
// // @route GET /ideas/edit/:id

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

// // @desc Update idea
// // @route PUT /ideas/:id

router.put("/:id", ensureAuth, async (req, res) => {
	try {
		let idea = await db.idea.findOne({
			where: { id: req.params.id },
			raw: true,
		});

		if (!idea) {
			return res.render("error/404");
		}

		// if (idea.user != req.user.id) {
		//   res.redirect("/ideas");
		// }
		else {
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

// // @desc Delete idea
// // @route DELETE /ideas/:id
router.delete("/:id", ensureAuth, async (req, res) => {
	try {
		await db.idea.destroy({ where: { id: req.params.id } });
		res.redirect("/dashboard");
	} catch (err) {
		console.error(err);
		return res.render("error/500");
	}
});

// @desc User ideas
// @route GET /ideas/user/:userId

router.get("/user/:userId", ensureAuth, async (req, res) => {
	try {
		const ideas = await db.idea.findAll({
			where: {
				user: req.params.userId,
				status: "public",
			},
			include: ["user"],
			raw: true,
		});

		res.render("ideas/index", {
			ideas,
		});
	} catch (error) {
		console.error(err);
		res.render("error/500");
	}
});

module.exports = router;
