import React, { Component } from "react";
import { connect } from "react-redux";
import { selectProcess } from "../actions/index";
import { bindActionCreators } from "redux";

let totalHours;
let earliestHour;


class ProcessesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showChildren: {}
    }
  }

//   toggle(parentId) {
//     this.setState({
//       showChildren: !this.state.showChildren
//     });
//  }

  toggle(parentKey) {
    this.setState({
      showChildren: {
             ...this.state.showChildren,
             [parentKey]: !this.state.showChildren[parentKey]
         }
     });
 }

  renderHoursBar(hour) {
    return (
      <span key={hour} style={{ border: '1px solid', width: (100 / totalHours) + '%', float: 'left', textAlign:'CENTER'}}>{earliestHour + hour}</span>
    );
  }

  renderProcess(processData, parentId) {
    const name = processData.name;
    const id = processData.id;;
    const processDuration = (processData.end_hour - processData.start_hour);
    const widthByRuntime = (100 / totalHours) * processDuration;
    const leftOffset = (processData.start_hour - earliestHour) * (100 / totalHours);
    
    const childProcesses = processData.childProcesses == undefined ? [] : processData.childProcesses;
    const showChildrenToggle = (parentId != undefined && this.state.showChildren["process-" + parentId] == true);
    const showChildrenClass = showChildrenToggle ? "toggleContent-open" : "toggleContent-closed";
    const hasChildrenClass = this.state.showChildren["process-" + id] ? "showing-children" : "";
    const profileIdText = processData.hasOwnProperty('profile_id') ? ["prof: " + processData.profile_id] : "";

    return (
      <div className={"process-container " + hasChildrenClass} key={'process-container-' + id}>
        <div 
          key={'unique-' + id}
          style={{width: widthByRuntime + '%', marginLeft: leftOffset + '%'}}
          className={["process", showChildrenClass].join(" ")}  
          onClick={() => childProcesses.length > 0 ? this.toggle("process-" + id) : null }>
        {name}
          <p className="process-ids">id={id} {profileIdText}</p>
        </div>
        <div className="children">
          {childProcesses.map(child => this.renderProcess(child, id))}
        </div>
      </div>
    );
  }

  render() {
    this.renderProcess = this.renderProcess.bind(this);

    if (this.props.processes.length > 0) {
      const processes = this.props.processes[0];
      totalHours = processes.latest_hour - processes.earliest_hour;
      earliestHour = processes.earliest_hour;
    }

    return (
      <div>
        <div id='hours-title' style={{textAlign:'CENTER', border: '1px solid'}}>HOURS</div>
        <div id='hours' style={{marginBottom: 20, height:30}}>
          {[...Array(totalHours).keys()].map(this.renderHoursBar)}      
        </div>
        <div className="processlist">
          {this.props.processes.map(x => x.processesList.map(p => this.renderProcess(p, null)))}
        </div>
      </div>
    );
  }

}

function mapStateToProps({processes}) {
  return { processes };
}

export default connect(mapStateToProps)(ProcessesList);
