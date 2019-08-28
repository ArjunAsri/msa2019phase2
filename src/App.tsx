import * as React from 'react';
import Modal from 'react-responsive-modal';
import './App.css';
import TaskList from './components/TaskList';
import Applogo from './image1385.png';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import * as Webcam from "react-webcam";
//import moment from 'react-moment';

interface IState {
	startDate: any,
	currentTask: any,
	Tasks: any[],
	open: boolean,
	uploadFileList: any,
	authenticated: boolean,
	refCamera: any,
	predictionResult: any

}

class App extends React.Component<{}, IState> {
	constructor(props: any) {
        super(props)
        this.state = {
			startDate: new Date(),
			currentTask: {"Id":0, "taskName":"task1 ","Priority":"","Course Number":"","Task Description":"","Enter Due Date":"0"},
			Tasks: [],
			open: false,
			uploadFileList: null,
			authenticated: false,
			refCamera: React.createRef(),
			predictionResult: null
		}     
		this.authenticate = this.authenticate.bind(this)

		this.fetchTask("")
		this.selectNewTask = this.selectNewTask.bind(this)
		this.fetchTask = this.fetchTask.bind(this)
		this.createTask = this.createTask.bind(this)
		this.handleChange = this.handleChange.bind(this);
	}

	public render() {
		const { open } = this.state;
		const { authenticated } = this.state
		//const selectedTask = this.state.currentTask
		return (
			<div>
				<div>
                {(!authenticated) ?
                    <div className = "webcam-container">
                        <Webcam
                            audio={false}
                            screenshotFormat="image/jpeg"
                            ref={this.state.refCamera}
                        />
                        <div className="row nav-row">
                            <div className="btn btn-primary bottom-button" onClick={this.authenticate}>Login</div>
                        </div>
                    </div>
					: ""}
					{(authenticated) ?
					 <div>
							<div className="header-wrapper">
								<div className="container header">
									<img src={Applogo} height='40'/> Optimize Schedule
									
								</div>
									<div className="btn-group">
									<div className="btn btn-primary btn-action btn-add" onClick={this.onOpenTaskModal }>New Task</div>
									<div className="btn btn-primary btn-action btn-add" onClick={this.updateTask }>Update Task</div>
									</div>
							</div>
							<div className="container">
								<div className="row">
									</div>
									<div className="container">
										<TaskList tasks={this.state.Tasks} selectNewTask={this.selectNewTask} serachByPriorityNumber={this.fetchTask} deleteId={this.deleteTask}/>

								</div>
							</div>
							</div>
							: ""}
							</div>
			<Modal open={open} onClose={this.onCloseModal}>
				<form>
					<div className="form-group">
						<label>Task Name</label>
						<input type="text" className="form-control" id="id-task-input" placeholder="Enter task name" />
						<small className="form-text text-muted">You can change the item name later</small>
					</div>
					<div className="form-group">
						<label>Priority</label>
						<input type="number" className="form-control" id="id-task-priority" placeholder="Higher number indicates high priority task" />
						
					</div>
					<div className="form-group">
					<label>Course Number</label>
						<textarea name="Text1" className="form-control" id="id-task-CourseNumber" placeholder="Course Number: ENGGEN403 ?"></textarea>
						<small className="form-text text-muted">Eg. ENGGEN403, used for searching tasks</small>
					</div>
					<div className="form-group">
					<label>Task Description</label>
						<textarea name="Text1" className="form-control" id="id-task-Description" placeholder="Enter task description"></textarea>
					</div>
					<div className="form-group">
					<label>Enter Due Date</label>
						<DatePicker id="id-task-deadline" selected={this.state.startDate} onChange={this.handleChange} showTimeSelect dateFormat="Pp"/>	
						</div>
					
					<button type="button" className="btn" onClick={this.createTask}>Create Task</button>
				</form>
			</Modal>
                    
		</div>

		);
	}

	// Task Modal Open
	private onOpenTaskModal = () => {
		this.setState({ open: true });
	  };
	// Modal close
	private onCloseModal = () => {
		this.setState({ open: false });
	};
	
	// select task
	private selectNewTask(Task: any) {
		this.setState({
			currentTask: Task.id
		})
	}

	// GET Task
	private fetchTask(id: any) {
		let url = "https://2019msaphase2devops.azurewebsites.net/api/Tasks"
		if (id !== "") {
			//url += "/id?=" + id
			url += "/"+ id
		}
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
			let currentTask = json[0]
			//console.log(json[0])
			//console.log(json)
			if (currentTask === undefined) {
				if(json === undefined){
					currentTask = {"id":""}
					console.log(json)
				}else{
					currentTask = json
					console.log(json)
				}
				
			}
			this.setState({
				currentTask,
				Tasks: json
			})
        });
	}

	private handleChange(date:any) {
		this.setState({
		  startDate: date
		});
	  }


	// POST Task
	private createTask() {
		this.setState({ open: false });
		const taskName = document.getElementById("id-task-input") as HTMLInputElement
		const Priority = document.getElementById("id-task-priority") as HTMLInputElement
		const taskCourseNumber = document.getElementById("id-task-CourseNumber") as HTMLInputElement
		const taskDescription = document.getElementById("id-task-Description") as HTMLInputElement
		const taskDeadline = document.getElementById("id-task-deadline") as HTMLInputElement

		if (taskName === null || Priority === null || taskCourseNumber === null|| taskDescription === null) {
			return;
		}

		console.log(taskDeadline)
		console.log(taskDeadline.value)

		let temp = taskDeadline.value
		//temp = moment(temp).format("YYYY-MM-DD hh:mm:ss")
		
		

		fetch('https://2019msaphase2devops.azurewebsites.net/api/Tasks', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				// TaskName: taskName.value,
				// TaskPriority: Priority.value,
				// CourseNumber: taskDescription.value,
				// TaskDescription: taskCourseNumber.value,
				// DateAndTime: taskDeadline
					TaskName: taskName.value,
					TaskPriority: Priority.value,
					CourseNumber: taskDescription.value,
					TaskDescription: taskCourseNumber.value,
					DateAndTime: temp
					//DateAndTime: '2015-11-05 14:29:36'
			})
			})
			return;
		}



	 // DELETE meme
	 private deleteTask(id: any) {
        const url = "https://2019msaphase2devops.azurewebsites.net/api/Tasks/" + id

		fetch(url, {
			method: 'DELETE'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error Response
				alert(response.statusText)
			}
			else {
              location.reload()
			}
		  })
	}
	
	private getFaceRecognitionResult(image: string) {
        const url = "https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/3182a140-52c0-466c-8e82-c08be021e7df/classify/iterations/Iteration1/image"
        if (image === null) {
            return;
        }
        const base64 = require('base64-js');
        const base64content = image.split(";")[1].split(",")[1]
        const byteArray = base64.toByteArray(base64content);
        fetch(url, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Prediction-Key': '2c6f27b1df794d1e9b0c2243e541b0d8', 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        })
            .then((response: any) => {
                if (!response.ok) {
                    // Error State
                    alert(response.statusText)
                } else {
                    response.json().then((json: any) => {
                        console.log(json.predictions[0])

                        this.setState({ predictionResult: json.predictions[0] })
                        if (this.state.predictionResult.probability > 0.7) {
                            this.setState({ authenticated: true })
                        } else {
                            this.setState({ authenticated: false })
                            console.log(json.predictions[0].tagName)
                        }
                    })
                }
            })
	}
	
	private authenticate() {
        const screenshot = this.state.refCamera.current.getScreenshot();
        this.getFaceRecognitionResult(screenshot);
    }

    // PUT meme
    private updateTask(){
		const taskName = document.getElementById("id-task-input") as HTMLInputElement
		const Priority = document.getElementById("id-task-priority") as HTMLInputElement
		const taskCourseNumber = document.getElementById("id-task-CourseNumber") as HTMLInputElement
		const taskDescription = document.getElementById("id-task-Description") as HTMLInputElement

		if (taskName === null || Priority === null || taskCourseNumber === null|| taskDescription === null) {
			return;
		}

        
		fetch('https://2019msaphase2devops.azurewebsites.net/api/Tasks', {
			body: JSON.stringify({
				task_id:this.state.currentTask.id,
                task_Name: taskName.value,
				task_Priority: Priority.value,
				task_Description: taskDescription.value,
				task_CourseNumber: taskCourseNumber.value,
				task_Deadline: "2018-11-23T05:53:02.889Z",
            }),
			headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
			method: 'PUT'
		})
        .then((response : any) => {
			if (!response.ok) {
				// Error State
				alert(response.statusText)
			} else {
				location.reload()
			}
		  })
    }
}

export default App;
