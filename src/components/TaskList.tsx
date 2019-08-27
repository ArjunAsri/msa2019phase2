import * as React from "react";

interface IProps {
    tasks: any[],
    selectNewTask: any,
    serachByPriorityNumber: any,
    deleteId: any,
}

export default class TaskList extends React.Component<IProps> {
    
  
    constructor(props: any ) {

        super(props)
        this.fetchRowDeatils = this.fetchRowDeatils.bind(this)
        this.searchByPriority = this.searchByPriority.bind(this)
        
        this.state = {
            deleteId:'',}
        this.deleteTaskById = this.deleteTaskById.bind(this)
       // this.handleClick = this.handleClick.bind(this);
    }
    
    // handleClick(event:any) {
	// 	const id = event.target.id;
	// 	console.log(id);
    //   }

    //   <button onClick={this.handleDelete}>Delete</button>
	public render() {
       
		return (
            <div>
			<div className="container meme-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search Tasks By Priority" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByPriority}>Search</div>
                        	<div className="btn btn-primary btn-action btn-add" onClick={this.deleteTaskById}>Delete Task</div>

                        </div>
                    </div>  
                </div>

                
                <div className="row meme-list-table">
                    <table className="table table-striped">
                        <tbody>
                            {this.createTable()}
                        </tbody>
                    </table>
                </div>
            </div>
         
            </div>
		);
    }

    // Construct table using meme list
	private createTable() {
        const table:any[] = []
        const tasksList = this.props.tasks
        if (tasksList == null) {
            return table
        }

        for (let i = 0; i < tasksList.length; i++) {
            const children = []
            const task = tasksList[i]

            //console.log(task)
            //console.log(task.id)
            //add if statement here
             //onClick={this.fetchRowDeatils}
            if(task.taskId <5){
                children.push(<div className="isa_success">
                <tr key={task.taskId}  onClick={() => this.fetchRowDeatils(task.taskId)}>
                <td key={"id" + i}>{"Id: " +task.taskId}</td>
                <td key={"Task" + i}>{"Task: " +task.taskName}</td>
                <td key={"Priority" + i}>{" Priority "+ task.taskPriority}</td>
                <td key={"Description" + i}>{"Description: "+ task.taskDescription}</td>
                <td key={"Course Number" + i}>{"Course Number: "+ task.courseNumber}</td>
                <td key={"Task Deadline" + i}>{"Task Deadline: "+ task.dateAndTime}</td></tr>
                </div>)
               
            }else if((task.taskId >= 5) && (task.taskId < 10)){
                children.push(<div className="isa_warning">
                <tr key={task.taskId} onClick={() => this.fetchRowDeatils(task.taskId)}>
                <td key={"id" + i}>{"Id: " +task.taskId}</td>
                <td key={"Task" + i}>{"Task: " +task.taskName}</td>
                <td key={"Priority" + i}>{" Priority "+ task.taskPriority}</td>
                <td key={"Description" + i}>{"Description: "+ task.taskDescription}</td>
                <td key={"Course Number" + i}>{"Course Number: "+ task.courseNumber}</td>
                <td key={"Task Deadline" + i}>{"Task Deadline: "+ task.dateAndTime}</td></tr></div>)
            }else{
                children.push(<div className="isa_error">
                <tr key={task.taskId} onClick={() => this.fetchRowDeatils(task.taskId)} >
                <td key={"id" + i}>{"Id: " +task.taskId}</td>
                <td key={"Task" + i}>{"Task: " +task.taskName}</td>
                <td key={"Priority" + i}>{" Priority "+ task.taskPriority}</td>
                <td key={"Description" + i}>{"Description: "+ task.taskDescription}</td>
                <td key={"Course Number" + i}>{"Course Number: "+ task.courseNumber}</td>
                <td key={"Task Deadline" + i}>{"Task Deadline: "+ task.dateAndTime}</td></tr></div>)
            }
            
            table.push(<tr key={i+""} id={i+""} onClick= {this.onOpenTaskModal.bind(this, i)}>{children}</tr>)
        }
        return table
    }
    
    // Meme selection handler to display selected meme in details component
    // private selectRow(index: any) {
    //     const selectedMeme = this.props.memes[index]
    //     if (selectedMeme != null) {
    //         this.props.selectNewMeme(selectedMeme)
    //     }
    // }

    // "taskId": 5,
    // "taskName": "TEST1",
    // "taskPriority": 1,
    // "courseNumber": "CourseNumber",
    // "taskDescription": "this is the course description",
    // "dateAndTime": "2015-11-05T14:29:36"

    // Search meme by tag
    private searchByPriority() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const ID = textBox.value 
        this.props.serachByPriorityNumber(ID)  
    }


    fetchRowDeatils = (idValue:any) => {
        //let row = e.target.getAttribute('key');
        let temp = parseInt(idValue,10)
        this.setState({deleteId: temp});
        console.log('mouse click detected'+temp);
        //this.props.deleteId(temp);
    }

     deleteTaskById(){
       let temp = this.state
       console.log(temp)
       console.log(temp["deleteId"])
        this.props.deleteId(temp["deleteId"]);
    }
    
    private onOpenTaskModal = () => {
		this.setState({ open: true });
	  };


      
      	// Modal close

}