import 'materialize-css/dist/css/materialize.min.css';
import  React,{Component} from 'react';
import {connect} from 'react-redux';

class Header extends Component {

    renderContent = () => {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return (<li>
                            <a href="/auth/google">
                                Login with Google
                            </a>
                        </li>);
            default:
                return (<li>
                            <a href="/api/logout">
                                Logout
                            </a>
                        </li>);
        }
    };

    render(){
        return(
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">Survey-App</a>
                    <ul  className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        auth : auth
    };
};

export default connect(mapStateToProps,null)(Header);
