import React from 'react';
import Proposal from "../Components/Proposal";
import { ethers } from 'ethers';
import { contractAddress, _abi } from "../interfaces/FunDaoInterface";
import "./ProposalContainer.scss";

declare let window: any;

type ProposalType = {
    applicant: string;
    maxTime: number;
    minTime: number;
    yesVotes: number;
    noVotes: number;
}
export default class ProposalContainer extends React.Component {
    state = {
        propososals: []
    }

    async fetchProposal () {
        if (window.ethereum) {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            await signer.getAddress();
            console.log(signer);
            const contract = new ethers.Contract(contractAddress, _abi, signer);

            let getProposalTxn = contract.getCurrentProposal(0).then((res: never) => {
                console.log("RES", res)
                this.setState({
                    proposals: this.state.propososals.push(res)
                })
            })
            console.log(getProposalTxn)
        }
    }

    componentDidMount() {
        this.fetchProposal()
        console.log("STATE", this.state.propososals[0])
    }

    render() {

        return (
            <div className="ProposalContainer-Main">
                <h3>Proposals</h3>
                {/*<Proposal applicant="helloworld" vestedShares={1235} requestedShares={1455} /> */}
                {/* Edit this.. add dynamic index numbers */}
                {this.state.propososals.map((proposal) => {return <div><Proposal proposalIndex={0}applicant={proposal[0]} requestedShares={parseInt(proposal[2], 16)} vestedShares={parseInt(proposal[2], 16) * 0.08} yesVotes={parseInt(proposal[3], 16)} noVotes={parseInt(proposal[4], 16)}/> </div>})}
            </div>
        )
    }
}