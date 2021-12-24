import React from 'react';
import Proposal from "../Components/Proposal";
import { ethers } from 'ethers';
import { _abi } from "../interfaces/FunDaoInterface";
import "./ProposalContainer.scss";

declare let window: any;
const contractAddress = "0x89d2895cE41466A27A8ba3257919c036fC5b0033";


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
            let getProposalTxn = contract.getCurrentProposal().then((res: never) => {
                console.log(res);
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
                {this.state.propososals.map((proposal) => {return <div><Proposal proposalIndex={0}applicant={proposal[0]} requestedShares={1} vestedShares={1}/> </div>})}
            </div>
        )
    }
}