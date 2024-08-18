const fs = require('fs');

const Usuario = require('../models/usuario');
const Mesa = require('../models/mesa');
const Elector = require('../models/elector');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ){
        // borrar la imagen anterior 
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {

    let pathViejo = '';

    switch ( tipo ) {
        case 'electores':
            const elector = await Elector.findById(id);
            if ( !elector ){
                console.log('No existe elector con ese ID');
                return false;
            }

            pathViejo = `./uploads/electores/${ elector.img }`;
            borrarImagen( pathViejo );

            elector.img = nombreArchivo;
            await elector.save();
            return true;

        break;

        case 'mesas':
            const mesa = await Mesa.findById(id);
            if ( !mesa ){
                console.log('No existe una mesa con ese ID');
                return false;
            }

            pathViejo = `./uploads/mesas/${ mesa.img }`;
            borrarImagen( pathViejo );
            
            mesa.img = nombreArchivo;
            await mesa.save();
            return true;
            
        break;
    
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if ( !usuario ){
                console.log('No existe un usuario con ese ID');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );
            
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            
        break;
        
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}