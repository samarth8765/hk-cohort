const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require('../db/index');
const bcryptjs = require("bcryptjs");
const { SignUpSchema, PurchasedCourseSchema } = require('../validator/schema');

// User Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const validator = SignUpSchema.safeParse({ username, password });
    if (!validator.success) {
        return res.status(400).json(validator.error.flatten());
    }

    const userExists = await User.findOne({ username: username }).exec();
    if (userExists) {
        return res.status(400).json({
            message: `User already exists`
        });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const user = new User({
        username: username,
        password: hashPassword,
    });

    await user.save();
    return res.status(201).send("User created Successfully");
});

router.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find({}, {
            title: 1,
            description: 1,
            price: 1,
            imagelink: 1,
            _id: 1,
        });

        return res.status(200).json(courses);
    }
    catch (err) {
        res.send(500).json({
            message: "Internal server error",
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const { courseId } = req.params;
    const user = await User.findOne({
        username: req.headers.username
    }).exec();

    const purchasedCourses = user.purchasedCourses;

    if (PurchasedCourseSchema.safeParse(purchasedCourses).success && purchasedCourses.includes(courseId)) {
        return res.status(200).json({
            message: `You already purchased the course`
        });
    }
    else {
        purchasedCourses.push(courseId);
        user.updateOne(
            {},
            {
                $set: {
                    purchasedCourses: purchasedCourses,
                },
            }
        );
        user.save();

        return res.json({
            message: `Course purchased successfully`
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ username: req.headers.username }).exec();
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const courses = await Course.find({ _id: { $in: user.purchasedCourses } }).exec();
        if (courses.length === 0) {
            return res.status(200).json({ message: "You haven't purchased any courses" });
        }

        return res.status(200).json(courses);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;
