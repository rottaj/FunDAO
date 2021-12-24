import React from 'react';
import "./Proposal.scss";
interface Props {
    applicant: string;
    vestedShares: number;
    requestedShares: number;
    /*timeLeft: number; */
}

export default class Proposal extends React.Component <Props>{
    render() {
        return (
            <div className="Proposal-Main">
                <h2 className="ProposalHeader-h2">{this.props.applicant}'s Proposal</h2>
                <p>
                    Vested Shares: {this.props.vestedShares}  <br></br>
                    Requested Shares: {this.props.requestedShares}
                </p> 
                <button className="Proposal-VoteYes">Vote Yes</button>
                <button className="Proposal-VoteNo">Vote No</button>
            </div>
        )
    }
}