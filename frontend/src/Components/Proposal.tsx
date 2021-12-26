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
    passed: boolean
    minTime: number;
    maxTime: number;
    /*timeLeft: number; */
}

declare let window: any;
export default class Proposal extends React.Component <Props>{

    state = {
        days: 0,
        hours: 0, 
        minutes: 0,
        seconds: 0
    }

    async onClickYes() {
        if (window.ethereum) {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            await signer.getAddress();
            const contract = new ethers.Contract(contractAddress, _abi, signer)
            console.log("PROPS.INDEX", this.props.proposalIndex)
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

    handleTime = () => {
        let timestamp = this.props.minTime
        let endDate:number = timestamp * 1000
        let today:number = new Date().getTime()
        const days = (endDate - today) / (1000 * 60 * 60 * 24);
        const hours = (endDate - today) / (1000 * 60 * 60) % 24;
        const minutes = (Math.abs(endDate - today) / (1000 * 60) % 60);
        const seconds = (Math.abs(endDate - today) / (1000) % 60); 
        this.setState({
            days: Math.round(days),
            hours: Math.round(hours),
            minutes: Math.round(minutes), 
            seconds: Math.round(seconds)
        })
    }

    componentDidMount() {
        setInterval(this.handleTime, 1000)
    }

    render() {
        return (
            <div className="Proposal-Main">
                <h2 className="ProposalHeader-h2">{this.props.applicant}'s Proposal</h2>
                {this.props.passed ? <h3>Passed</h3> : <h3>Not passed</h3>}
                <p>
                    Vested Shares: {this.props.vestedShares}  <br></br>
                    Requested Shares: {this.props.requestedShares}
                </p>
                Time left:  
                {this.state.days} Days {this.state.hours} Hours {this.state.minutes} Minutes {this.state.seconds} Seconds
                <br></br>
                <br></br>
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