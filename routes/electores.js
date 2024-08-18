/**
 * Electores
 * ruta: '/api/electores'
 */

const { Router } = require ('express'); 
const { check } = require ('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos');

const { getElectores, actualizarElector, crearElector, borrarElector } = require('../controllers/electores');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get( '/', getElectores );

router.post( '/', 
    [
        validarJWT,
        check('nombreCompleto','El nombre es obligatorio').not().isEmpty(),
        check('run','El run es obligatorio').not().isEmpty(),
        check('dv','El dígito verificador del RUN es obligatorio').not().isEmpty(),
        check('comuna','La comuna es obligatoria').not().isEmpty(),
        check('mesa','El ID de la mesa debe ser válido').isMongoId(),
        validarCampos
    ] , 
    crearElector );

router.put( '/:id' , 
    [
        validarJWT,
        check('nombreCompleto','El nombre es obligatorio').not().isEmpty(),
        check('run','El run es obligatorio').not().isEmpty(),
        check('dv','El dígito verificador del RUN es obligatorio').not().isEmpty(),
        check('comuna','La comuna es obligatoria').not().isEmpty(),
        check('mesa','El ID de la mesa debe ser válido').isMongoId(),
        validarCampos
    ], 
    actualizarElector );

router.delete( '/:id',
    validarJWT, 
    borrarElector );
    
module.exports = router;