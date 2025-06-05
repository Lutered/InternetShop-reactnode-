import ErrorStore from "../../stores/ErrorStore";

export default class ErrorService{
    _errorStore = null;
    
    constructor(){
        this._errorStore = new ErrorStore();
    }

    get hasError(){
        return this._errorStore.hasError;
    }

    setError(e){
        this._errorStore.setError(e);
    }

    clearErrors(){
        this._errorStore.clearErrors();
    }

    async handleRequest(requestPromise){
        const response = await requestPromise;
    
        if(response.errorCode !== null){
            this.setError({
                code: response.errorCode,
                message: response.errorMessage
            });
            return null;
        }
    
        return response.data;
    };
}