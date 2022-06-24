import React, { useState } from 'react'
import './TaskList.scss'

export const TaskList = () => {
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [taskName, setTaskName] = useState('a');
    const [description, setDescription] = useState('b');
    const [taskList, setTaskList] = useState<{name:string, description:string}[]>([])

    const handleSaveTask = () => {
        if(!taskName || !description){
            return;
        }
        
        const list = [...taskList];
        list.push({
            name: taskName,
            description:description
        })
        setTaskList(list);
        setTaskName('');
        setDescription('');
        setIsAddingTask(false);
    }

    return (
        <div className='task-list' data-testid='task-list'>
            <div className='task-list__name'>Tasks list</div>
            <button className='task-list__button task-list__button--add' onClick={() => setIsAddingTask(!isAddingTask)} > Add </button>

            {isAddingTask && (
                <div className='task-list__add-task'>
                    <input placeholder='Task Name' className='task-list__input' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <input placeholder='Task Description' className='task-list__input' value={description} onChange={(e) => setDescription(e.target.value)} />
                    <button className='task-list__button task-list__button--save' onClick={handleSaveTask}>Save</button>
                </div>
            )}

            <ul>
                {taskList.map((task:any) => (
                    <li key={`${task.name} - ${task.description}`}>
                        <span className='task-list__task-name'>{task.name}</span> -
                        <span className='task-list__task-description'>{task.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}