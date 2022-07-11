const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(userData => res.json(userData))
    .catch(err => { 
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: [
                    'id',
                    'title',
                    'content',
                    'created_at'
                ]
            },
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_text',
                    'created_at'
                ],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    }).then(userData => {
        if (!userData) {
            res.status(404).json({ message: 'No user found with this ID' });
            return;
        }
        res.json(userData);
    }).catch(err => {
        res.status(500).json(err);
    })
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }).then(userData => {
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            res.json(userData);
        });
    })
});

router.post('/login', (req, res) => {
    User.findOne({
        where:{ email: req.body.email}
    }).then(userData => {
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email!'});
            return;
        }
        const validatePassword = userData.checkPassword(req.body.password);
        if (!validatePassword){
            res.status(400).json({ message: 'Incorrect Password'});
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!'});
        });
    }).catch(err => {
        res.status(500).json(err);
    });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;