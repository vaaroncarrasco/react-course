// * Auth / Users - Route | host + /api/auth

// node uses same lib it has in memory without importing it twice
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


const {
    crearUsuario,
    loginUsuario,
    revalidarToken
} = require('../controllers/auth');


router.post(
    '/new',
    [ // middlewares
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Pass must be at least 6 character long').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/',
    [ // middlewares
        check('email', 'Email is required').isEmail(),
        check('password', 'Pass must be at least 6 character long').isLength({ min: 6 }),
        validarCampos
    ],
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;