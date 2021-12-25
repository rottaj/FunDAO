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
        proposals: []
    }

    async fetchProposal () {
        if (window.ethereum) {
            await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            await signer.getAddress();
            console.log(signer);
            const contract = new ethers.Contract(contractAddress, _abi, signer);
            let proposalCount = await contract.getProposals()
            console.log("TESTING", parseInt(proposalCount, 16))
            for (let i=parseInt(proposalCount, 16)-1; i>=0; i--) {
                let getProposalTxn = contract.getProposalByIndex(i).then((res: never) => {
                    console.log("RES", res)
                    this.setState({
                        proposals: [...this.state.proposals, res]
                    })
                })
                console.log(getProposalTxn)
            }
        }
    }

    componentDidMount() {
        this.fetchProposal()
        console.log("STATE", this.state.proposals)
    }

    render() {

        return (
            <div className="ProposalContainer-Main">
                <h3>Proposals</h3>
                {/*<Proposal applicant="helloworld" vestedShares={1235} requestedShares={1455} /> */}
                {/* Edit this.. add dynamic index numbers */}
                {this.state.proposals.map((proposal, index) => {return <div>{console.log("Index", index)}<Proposal proposalIndex={index} 
                                                                                applicant={proposal[0]} 
                                                                                requestedShares={parseInt(proposal[2], 16)} 
                                                                                vestedShares={parseInt(proposal[2], 16) * 0.08} 
                                                                                yesVotes={parseInt(proposal[3], 16)} 
                                                                                noVotes={parseInt(proposal[4], 16)}
                                                                                minTime={parseInt(proposal[6])}
                                                                                maxTime={parseInt(proposal[7])}
                                                                                /></div>})}
            </div>
        )
    }
}