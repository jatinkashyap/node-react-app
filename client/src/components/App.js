import React,{Component} from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;


class App extends Component {
    componentDidMount(){
        console.log("componentDidMount App called")
        this.props.onCallCurrentUser();
    }

    render(){
        return (
            <div className="container">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route path="/" exact component={Landing}/>
                        <Route path="/surveys" exact component={Dashboard}/>
                        <Route path="/surveys/new" exact component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCallCurrentUser : () => dispatch(actions.fetchUser())
    };
};

export default connect(null,mapDispatchToProps)(App);