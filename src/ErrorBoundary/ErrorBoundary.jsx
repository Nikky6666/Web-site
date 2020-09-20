import React from 'react'
import oopsPhoto from '../assets/images/oopsPhoto.jpg'
import s from './ErrorBoundary.module.css'

class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
    };
    static getDerivedStateFromError() {
        return {hasError: true};
    }
    // componentDidCatch(error, errorInfo) {
    //     debugger;
    //     this.setState({hasError: true})
    // }
    render() {
        if (this.state.hasError) {
         return <div className={s.container}><img src={oopsPhoto} alt=""/><h1>Sorry, some error</h1></div>
        }
        return this.props.children;
    }
}

export default ErrorBoundary;