import React from 'react';
import EnterApp from "../Components/EnterApp";

export default class WelcomePage extends React.Component {
    render() {
        return(
            <div className="App">
                <div className="FunDao-Header-Rainbow">
                            <ul className="c-rainbow">
                            <li className="c-rainbow__layer c-rainbow__layer--white">FUN DAO!</li>
                            <li className="c-rainbow__layer c-rainbow__layer--orange">FUN DAO!</li>
                            <li className="c-rainbow__layer c-rainbow__layer--red">FUN DAO!</li>
                            <li className="c-rainbow__layer c-rainbow__layer--violet">FUN DAO!</li>
                            <li className="c-rainbow__layer c-rainbow__layer--blue">FUN DAO!</li>
                            <li className="c-rainbow__layer c-rainbow__layer--green">FUN DAO!</li>
                            <li className="c-rainbow__layer c-rainbow__layer--yellow">FUN DAO!</li>
                        </ul>
                </div>
                <EnterApp/>
          </div>
        );
    }
}