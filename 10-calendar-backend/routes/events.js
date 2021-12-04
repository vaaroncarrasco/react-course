// Event Routes /api/events

const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} = require('../controllers/events');

const router = Router();

// * run middleware before all routes
router.use(validarJWT);

// * all req header must have JWT and be validated
// get events
router.get('/', getEventos)

// create event
router.post(
    '/',
    [
        check('title','title is required').not().isEmpty(),
        check('start','start date is required').custom( isDate ),
        check('end','end date is required').custom( isDate ),
        validarCampos
    ],
    crearEvento,

)

// update event
router.put('/:id', actualizarEvento)

// delete event
router.delete('/:id', eliminarEvento)

module.exports = router;