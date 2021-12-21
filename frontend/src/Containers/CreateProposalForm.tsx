import React from 'react';
import "./CreateProposalForm.scss";

interface Props {
    isOpen: boolean;
}

export default class CreateProposalForm extends React.Component <Props>{

    render() {
        console.log(this.props.isOpen)
        return (
            <div className="CreateProposalForm-Main" >
                {this.props.isOpen && 
                <div className="PopUp-Form">
                    <h3>Create New Proposal</h3>
                    <form className="CreateProposal-Form">
                        Requested Shares:
                        <input type="text"/>
                        <br></br>
                        <br></br>
                        Vested Shares:
                        <input type="text"/>
                    </form>
                </div>
                }
            </div>
        )
    }
}