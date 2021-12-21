import React from 'react';
import Proposal from "../Components/Proposal";
import "./ProposalContainer.scss";

export default class ProposalContainer extends React.Component {
    render() {
        return (
            <div className="ProposalContainer-Main">
                <h3>Proposals</h3>
                <Proposal applicant="helloworld" vestedShares={1235} requestedShares={1455} />
            </div>
        )
    }
}