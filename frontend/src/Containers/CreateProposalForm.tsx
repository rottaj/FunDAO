import React from 'react';
import "./CreateProposalForm.scss";

interface Props {
    isOpen: boolean;
}

export default class CreateProposalForm extends React.Component <Props>{

    state = {
        requestedShares: 1,
        vestedETH: 0.8
    }

    onChangeRequestedShares = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        this.setState({
            requestedShares: parseInt(e.target.value),
            vestedETH: parseInt(e.target.value) * 0.08
        })
    }


    render() {
        console.log(this.props.isOpen)
        return (
            <div className="CreateProposalForm-Main" >
                {this.props.isOpen && 
                <div className="PopUp-Form">
                    <h3>Create New Proposal</h3>
                    <h3> 1 Share(FUN) = 0.08 ETH</h3>
                    <form className="CreateProposal-Form">
                        Requested FUN:
                        <input onChange={(e) => this.onChangeRequestedShares(e)} type="text" defaultValue={`${this.state.requestedShares}`}/>
                        <br></br>
                        <br></br>
                        Vested ETH:
                        <input  type="text" value={`${this.state.vestedETH}`}/>
                        <br></br>
                        <br></br>
                        <button>Submit Proposal</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}