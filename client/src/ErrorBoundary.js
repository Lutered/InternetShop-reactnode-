import React, {useEffect} from "react";
import { observer } from "mobx-react-lite";

import {useLocation} from "react-router-dom";
import globalServices from './services/globalServices';

class ErrorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.props.setError({
      code: error.code,
      message: error.message
    });
  }

  render() {
    if (this.state.hasError || this.props.error) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const ErrorBoundary = observer(({children}) => { 
  const errorService = globalServices.getErrorService();
  const location = useLocation(); 

  useEffect(() => {
    errorService.clearErrors();
  }, [location]);

  return (
    <ErrorWrapper 
      error={errorService.hasError} 
      setError={errorService.setError}
    >
      {children}
    </ErrorWrapper>
  );
});

export default ErrorBoundary;