import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cotizacion/cotizacion';
import Cotizacion from './Cotizacion';


const ms2p = (state) => {
    return {
        ...state.cotizacion,
    };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(Cotizacion);