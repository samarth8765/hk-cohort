const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { SignUpSchema, CourseSchema } = require('../validator/schema');
const { Admin, Course } = require('../db/index');
const bcryptjs = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: "uploads" });

// Admin Routes
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const validator = SignUpSchema.safeParse({ username, password });
    if (!validator.success) {
        return res.status(400).json(validator.error.flatten());
    }

    const userExists = await Admin.findOne({ username: username }).exec();
    if (userExists) {
        return res.status(200).json({
            message: `User already exists`
        });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const user = new Admin({
        username: username,
        password: hashPassword,
    })

    await user.save();
    return res.status(201).send("User created Successfully");
});

router.post('/courses', adminMiddleware, upload.single("file"), async (req, res) => {
    const { title, description, price } = req.body;
    const validator = CourseSchema.safeParse({ title, description, price });
    if (!validator) {
        return res.status(400).json(validator.error.flatten());
    }

    const url = req.protocol + "://" + req.get("host");
    const course = new Course({
        title: title,
        description: description,
        price: price,
        imagelink: url + "/uploads/" + req.file.filename,
    });

    await course.save();

    return res.status(201).json({
        message: "Course created successfully",
        courseId: course.id,
    });

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        const courses = await Course.find({}, {
            title: 1,
            description: 1,
            price: 1,
            imagelink: 1,
            _id: 1,
        });
        res.status(200).json(courses);
    }
    catch (err) {
        res.status(500).send("Internal Server Error")
    }
});

module.exports = router;