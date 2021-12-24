import { ethers } from 'ethers';
import React from 'react';
import { _abi } from "../interfaces/FunDaoInterface";
import "./CreateProposalForm.scss";

interface Props {
    isOpen: boolean;
}

declare let window: any

const contractAddress = "0x89d2895cE41466A27A8ba3257919c036fC5b0033";

export default class CreateProposalForm extends React.Component <Props>{

    state = {
        requestedShares: 1,
        vestedETH: 0.8
    }

    onChangeRequestedShares = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        this.setState({
            requestedShares: parseInt(e.target.value),
            vestedETH: parseInt(e.target.value) * 0.08
        })
    }

    async onSubmitProposal(e: any) {
        e.preventDefault();
        console.log(e)
        console.log(e.target[0].value);
        console.log(e.target[1].value);
        if (window.ethereum) {
            await window.ethereum.enable();
            var accounts = await window.ethereum.send('eth_requestAccounts');
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = await provider.getSigner();
            await signer.getAddress();
            console.log(accounts);
            console.log(signer);
            let now = new Date();
            let minTime = now.setDate(now.getDate()) + (2 * 7);
            let maxTime = now.setDate(now.getDate()) + (4 * 7);
            console.log(minTime, typeof(minTime))
            const contract = new ethers.Contract(contractAddress, _abi, signer);
            let proposalTxn = contract.submitApplicantProposal(e.target[0].value,
                                                        e.target[1].value,
                                                        minTime,
                                                        maxTime)
            console.log("Submitted Proposal: " , proposalTxn)
        }
    }


    render() {
        console.log(this.props.isOpen)
        return (
            <div className="CreateProposalForm-Main" >
                {this.props.isOpen && 
                <div className="PopUp-Form">
                    <h3>Create New Proposal</h3>
                    <h3> 1 Share(FUN) = 0.08 ETH</h3>
                    <form className="CreateProposal-Form" onSubmit={(e) => this.onSubmitProposal(e)}>
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