import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
 faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons';


import './App.css';




function App() {
  //  tasks (ToDo List) state
  const [toDo, setToDo] = useState([ ]);

  // Temp State
  const [ newTask, setNewTask ] = useState('');
  const [ updateData, setUpdateData] = useState('');

  // Add Task
  const addTask = (e) => {

    e.preventDefault();
    if(newTask !== ''){
      const val = 0;
      val = Math.random(1, 100000);
      const newTaskData = {
        id: val + 1,
        title: newTask,
        status: false
      }
      setToDo([...toDo, newTaskData]);
      setNewTask('');
    }

  }

  // Delete Task
  const deleteTask = (id) => {
    const remainingTasks = toDo.filter((task) => task.id !== id);
    setToDo(remainingTasks);

  }

  // Mark task as done or completed
  const markTaskAsDone = (id) => {
    const updatedTasks = toDo.map((task) => {
      if(task.id === id){
        task.status = !task.status;
      }
      return task;
    });
    setToDo(updatedTasks);
       

  }

  // cancel update
  const cancelUpdate = () => {
    setUpdateData('');

  } 

  // change task for update
  const changeTask= (e)=>{
    let newEntry={
      id: updateData.id,
      title: e.target.value,
      status: updateData.status? true :false 
    }
    setUpdateData(newEntry); 
  }

  // update task
  const updateTask = () => {
    if(updateData.id){
     let filteredTasks = toDo.filter((task) => task.id !== updateData.id);
      setToDo([...filteredTasks, updateData]);
      setUpdateData(''); 
    }
  }






  return (
    <div className="container App">
     <br /> <br />
     <h2>To Do List App</h2>
     <br /><br />


    {updateData && updateData ?(
          <div>
          {/* Update task */}
            <div className="row">
              <div className="col">
                <input
                value ={updateData && updateData.title}
                onChange={ (e)=> changeTask}
                className="form-control form-contol-lg" />
              </div>
                <div className="col-auto">
                  <button 
                  onClick={updateTask}
                  className="btn btn-lg btn-success mr-20">
                    Update
                  </button>
                  <button
                    onClick={cancelUpdate}
                  className='btn btn-lg btn-warning'>
                    Cancel
                  </button>
                </div>
            </div>
            <br />

         </div>

    ): (
      <div>
       {/* Add task */}
       <div className="row">
        <div className="col">
          <input 
          value= {newTask}
          onChange={(e)=>setNewTask(e.target.value)}
          className="form-control form-contol-lg" />
        </div>
          <div className="col-auto">
            <button
            onClick={addTask}
            className="btn btn-lg btn-success">
              Add Task
            </button>
          </div>
      </div>
      <br />      
      </div>
    )}


     {/* Display ToDos */}

     {/* Display a message when there is no task */}
     {toDo && toDo.length ? '' : 'No Tasks...'} 

     {toDo && toDo
     .sort((a, b) => a.id>b.id ? 1 : -1)
     .map((task, index) => {
      return(
        <React.Fragment key= {task.id}>
            <div className="col taskBg">

              <div className= {task.status ? 'done' : ''}>




              <span className="taskNumber">{index+1}</span>
              <span className="taskText">{task.title}</span>

              </div>

            <div className="iconsWrap">
                <span title='completed / Not Completed'>
                  <FontAwesomeIcon icon={faCircleCheck} className="icon" onClick={()=> markTaskAsDone(task.id)} />
                </span>
                {task.status ? '' :(
                <span title='Edit'>
                  <FontAwesomeIcon icon={faPen} className="icon" onClick={()=> setUpdateData({
                    id: task.id,
                    title: task.title,
                    status: task.status ? true : false
                  } )} />
                </span>
                )}
                <span title='Delete'>
                  <FontAwesomeIcon icon={faTrashCan} className="icon" onClick={()=> deleteTask(task.id)} />
                </span>
            </div>






          </div>

        </React.Fragment>
      )
     })
     
     }





    </div>

  );
}

export default App;
