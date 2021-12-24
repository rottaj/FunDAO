import React from 'react';
import { ethers } from "ethers";
import { contractAddress, _abi } from "../interfaces/FunDaoInterface";
import "./Proposal.scss";
interface Props {
    proposalIndex: number;
    applicant: string;
    vestedShares: number;
    requestedShares: number;
    yesVotes: number;
    noVotes: number;
    /*timeLeft: number; */
}

declare let window: any;
export default class Proposal extends React.Component <Props>{
    async onClickYes() {
        if (window.ethereum) {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            await signer.getAddress();
            const contract = new ethers.Contract(contractAddress, _abi, signer)
            let proposalVoteTxn = await contract.submitVote(this.props.proposalIndex, 1);
        }
    }

    async onClickNo() {
        if (window.ethereum) {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            await signer.getAddress();
            const contract = new ethers.Contract(contractAddress, _abi, signer)
            let proposalVoteTxn = await contract.submitVote(this.props.proposalIndex, 2);
        }
    }

    render() {
        return (
            <div className="Proposal-Main">
                <h2 className="ProposalHeader-h2">{this.props.applicant}'s Proposal</h2>
                <p>
                    Vested Shares: {this.props.vestedShares}  <br></br>
                    Requested Shares: {this.props.requestedShares}
                </p> 
                Yes Votes: {this.props.yesVotes} 
                &emsp;
                No Votes: {this.props.noVotes}
                <br></br>
                <br></br>
                <button className="Proposal-VoteYes" onClick={() => this.onClickYes()}>Vote Yes</button>
                <button className="Proposal-VoteNo" onClick={() => this.onClickNo()}>Vote No</button>
            </div>
        )
    }
}