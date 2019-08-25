import * as React from "react";

interface IProps {
    tasks: any[],
    selectNewTask: any,
    serachByPriorityNumber: any,
  
}

export default class TaskList extends React.Component<IProps> {
    
    constructor(props: any ) {
        
        super(props)   
        this.searchByPriority = this.searchByPriority.bind(this)

    }
    

	public render() {
       
		return (
            <div>
			<div className="container meme-list-wrapper">
                <div className="row meme-list-heading">
                    <div className="input-group">
                        <input type="text" id="search-tag-textbox" className="form-control" placeholder="Search Tasks By Priority" />
                        <div className="input-group-append">
                            <div className="btn btn-outline-secondary search-button" onClick = {this.searchByPriority}>Search</div>
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
            const meme = tasksList[i]
            //add if statement here
            if(meme.id <5){
                children.push(<div className="isa_success">
              
                <td key={"id" + i}>{"Id: " +meme.id}</td>
                <td key={"Task" + i}>{"Task: " +meme.task_Name}</td>
                <td key={"Priority" + i}>{" Priority "+ meme.task_Priority}</td>
                <td key={"Description" + i}>{"Description: "+ meme.task_Description}</td>
                <td key={"Course Number" + i}>{"Course Number: "+ meme.task_CourseNumber}</td>
                <td key={"Task Deadline" + i}>{"Task Deadline: "+ meme.task_Deadline}</td>
                </div>)
               
            }else if((meme.id >= 5) && (meme.id < 10)){
                children.push(<div className="isa_warning">
                 <td key={"id" + i}>{"Id: " +meme.id}</td>
                <td key={"Task" + i}>{"Task: " +meme.task_Name}</td>
                <td key={"Priority" + i}>{" Priority "+ meme.task_Priority}</td>
                <td key={"Description" + i}>{"Description: "+ meme.task_Description}</td>
                <td key={"Course Number" + i}>{"Course Number: "+ meme.task_CourseNumber}</td>
                <td key={"Task Deadline" + i}>{"Task Deadline: "+ meme.task_Deadline}</td></div>)
            }else{
                children.push(<div className="isa_error">
               <td key={"id" + i}>{"Id: " +meme.id}</td>
                <td key={"Task" + i}>{"Task: " +meme.task_Name}</td>
                <td key={"Priority" + i}>{" Priority "+ meme.task_Priority}</td>
                <td key={"Description" + i}>{"Description: "+ meme.task_Description}</td>
                <td key={"Course Number" + i}>{"Course Number: "+ meme.task_CourseNumber}</td>
                <td key={"Task Deadline" + i}>{"Task Deadline: "+ meme.task_Deadline}</td></div>)
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

    // Search meme by tag
    private searchByPriority() {
        const textBox = document.getElementById("search-tag-textbox") as HTMLInputElement
        if (textBox === null) {
            return;
        }
        const ID = textBox.value 
        this.props.serachByPriorityNumber(ID)  
    }

    private onOpenTaskModal = () => {
		this.setState({ open: true });
	  };

      	// Modal close

}