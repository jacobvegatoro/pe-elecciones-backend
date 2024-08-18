/**
 * Mesas
 * ruta: '/api/mesas'
 */

const { Router } = require ('express'); 
const { check } = require ('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos');

const { getMesas, actualizarMesa, crearMesa, borrarMesa } = require('../controllers/mesas');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', getMesas );

router.post( '/', 
    [
        validarJWT,
        check('nombre','El nombre de la mesa es obligatorio').not().isEmpty(),
        check('circunscripcion','La circunscripción es obligatoria').not().isEmpty(),
        check('comuna','El nombre de la comuna es obligatorio').not().isEmpty(),
        validarCampos
    ] , 
    crearMesa );

router.put( '/:id' , 
    [
        validarJWT,
        check('nombre','El nombre de la mesa es obligatorio').not().isEmpty(),
        check('circunscripcion','La circunscripción es obligatoria').not().isEmpty(),
        check('comuna','El nombre de la comuna es obligatorio').not().isEmpty(),
        validarCampos
    ], 
    actualizarMesa );

router.delete( '/:id', 
    validarJWT,
    borrarMesa );
    
module.exports = router;