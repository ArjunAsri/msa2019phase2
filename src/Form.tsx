import * as React from 'react';


interface IProps{
    text: string;
    age: number;
}

interface IState{
    email: string;
    name: string;
}



export default class Form extends React.Component<IProps, IState>{
     handleChange = (e: React.FormEvent<HTMLInputElement>)=>{
        const { value} : any = e.target;
        this.setState({
           "name": value
        });
    };
   
    stat: IState= {
        email: "",
        name:"",
    }
    public render(){
        const {text} = this.props;
        return(
          <div>
              <div>{text}</div>
              <div>{name}</div>
              <input name="name" value={name} onChange={this.handleChange} />
            </div>
        );
        
    
    }
}