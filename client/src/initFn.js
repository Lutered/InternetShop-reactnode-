import Cookies from 'js-cookie';
import globalServices from './services/globalServices';

function InitFn() {
    //delete cookies in dev mode
    if (process.env.REACT_APP_RUNTIME_MODE === 'DEBUG') {
        Object.keys(Cookies.get()).forEach(function(cookieName) {
          Cookies.remove(cookieName, { path: '' });
        });
    }

    const basketService = globalServices.getBasketServices();
    basketService.updateBasketItemsCount();
}

export default InitFn;