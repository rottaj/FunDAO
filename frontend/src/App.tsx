import React from 'react';
import EnterApp from "./Components/EnterApp"
import CreateProposalForm from './Containers/CreateProposalForm';
import ProposalContainer from "./Containers/ProposalContainer";
import './App.scss';


export default class App extends React.Component {

  state = {
    ProposalFormOpen: false
  }

  handleProposalForm = () => {
    this.setState({
      ProposalFormOpen: !this.state.ProposalFormOpen
    })
  }

  render() {
    return (
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
      <div>
        <h2 className="FunDao-Header-h2">A fun DAO for frens</h2>
      </div>
      <EnterApp/>
      <div className="CreateProposal-Main">
          <button onClick={this.handleProposalForm}>Create Proposal</button>
      </div>
      <CreateProposalForm isOpen={this.state.ProposalFormOpen}/>
      <ProposalContainer/>
      </div>
    );
  }
}


