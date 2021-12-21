import React from 'react';
import "./CreateProposalForm.scss";

interface Props {
    isOpen: boolean;
}

export default class CreateProposalForm extends React.Component <Props>{

    render() {
        console.log(this.props.isOpen)
        return (
            <div className="CreateProposalForm-Main">
            </div>
        )
    }
}