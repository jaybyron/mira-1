import React, {Component} from "react";
import ReactJson from 'react-json-view'
import SecGroupEdit from './Security_Group_Edit'
import Modal from 'react-modal';
import Collapsible from 'react-collapsible';
// import {Switch, BrowserRouter as Router, Route, NavLink, withRouter } from 'react-router-dom';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Side_Panel extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.analyzeSecurityGroups = this.analyzeSecurityGroups.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  analyzeSecurityGroups(securityGroup){
    let ids = [];
    let names =[];

    // for(let i=0; i<securityGroup.length; i++) {
    //   names.push(securityGroup[i].GroupName)
    //   ids.push(securityGroup[i].GroupId);
    // }

    return {'names':names, 'ids':ids};

  }


  render() {

    const reactJsonconfig = {
      indentWidth:1,
      name:this.props.activeNode.InstanceId,
      theme: 'bright',
      iconStyle:"square",
      displayObjectSize:false,
      displayDataTypes:false,
    }


    let NodeDetails;
    let sgmodal;

    if(Object.keys(this.props.activeNode).length > 0) {
      const reactJsonconfig = {
        indentWidth:1,
        name:this.props.activeNode.InstanceId,
        theme: 'bright:inverted',
        iconStyle:"square",
        displayObjectSize:false,
        displayDataTypes:false,
      }
      let securityGroupNames;
      if(this.props.activeNode.MySecurityGroups){
         securityGroupNames = this.analyzeSecurityGroups(this.props.activeNode.MySecurityGroups); 
      }
      let nodeData = {'Node Details': this.props.activeNode, 'Security Group Details': this.props.activeNode.MySecurityGroups};
      console.log('fdsjfdhsjk',securityGroupNames); 
      sgmodal = (
        <button id="modal-pop-up" onClick={this.openModal}>Edit Security Groups</button>
      )


      console.log(this.props.activeNode);
      NodeDetails = ( <div id ="details-wrapper">
        <Collapsible trigger="Node Summary" open="true">
          {sgmodal}
          <p><span className="sidebar-title">Instance Type: </span><span>{this.props.activeNode.InstanceId ? 'EC2': 'RDS'}</span></p>
          <p><span className="sidebar-title">Instance ID: </span><span>{this.props.activeNode.InstanceId ? this.props.activeNode.InstanceId: this.props.activeNode.DBInstanceIdentifier}</span></p>
          <p><span className="sidebar-title">Instance Status: </span><span>{this.props.activeNode.InstanceId ? (this.props.activeNode.State.Name) : this.props.activeNode.DBInstanceStatus}</span></p>
          <p><span className="sidebar-title">Security Groups: </span><span>{securityGroupNames.names.join(", ")}{securityGroupNames.ids.join(", ")}</span></p>
          <p><span className="sidebar-title">Inbounds: </span><span>{securityGroupNames.ids.join(", ")}</span></p>
          <p><span className="sidebar-title">Outbounds: </span><span>{securityGroupNames.ids.join(", ")}</span></p>        
        </Collapsible>
        <Collapsible trigger="Node Details" open="true">
          <div id="main-info" className="node-info"><ReactJson src={nodeData} name={"Active Node"} theme={reactJsonconfig.theme} indentWidth={reactJsonconfig.indentWidth} iconStyle={reactJsonconfig.iconStyle} displayObjectSize={reactJsonconfig.displayObjectSize} displayDataTypes={reactJsonconfig.displayDataTypes}></ReactJson></div>
        </Collapsible>

      </div>);

      }
    

    return(
      <div id="sidePanel">
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
        
          <SecGroupEdit sgData={this.props.activeNode.MySecurityGroups} onRequestClose={this.closeModal} />
          <button onClick={this.closeModal}>close</button>
        </Modal>
      {NodeDetails}
    </div>
      
    )
  }
}

export default Side_Panel;