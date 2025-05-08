import ModalStore from '../../stores/ModalStore';

export default class ModalService{
    _activeModal = null;
    _modalMap = new Map([
        ['basket', new ModalStore()],
        ['login', new ModalStore()],
        ['register', new ModalStore()],
    ]);  

    show(value){
        const modal = this._modalMap.get(value);

        if(!modal) return;

        if(this._activeModal) this._activeModal.hide();

        this._activeModal = modal;
        modal.show();
    }

    hide(value){
        if(!value){
            this._activeModal?.hide();

            this._activeModal = null;
        }
        else{
            const modal = this._modalMap.get(value);

            if(!modal) return;

            modal.hide();

            if(modal === this._activeModal) 
                this._activeModal = null;
        }
    }

    isModalShowed(value){
        const modal = this._modalMap.get(value);

        return modal.isModalShowed();
    }

    getActiveModal(){ return this._activeModal; }
}