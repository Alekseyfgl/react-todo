import React from "react";
import Task from "./task-item/Task-item";


import './tasks-list.scss';
import '../../other-style/btn-delete.scss';


const TasksList = ({
                       tasks,
                       delTask,
                       closeTask,
                       onRenameTask,
                       // renameTaskApp,
                       // checkNameInput,
                       // toggleInput,
                       toggleImportant,
                   }) => {
    // console.log(tasks);

    return (
        <ul className={'tasks-list'}>
            {
                tasks.map(item => <Task
                    key={item.id}
                    {...item}
                    delTask={delTask}
                    closeTask={() => closeTask(item.id)}
                    onRenameTask={onRenameTask}
                    // renameTaskApp={(e) => renameTaskApp(e, item.id)}
                    // checkNameInput={checkNameInput}
                    toggleImportant={() => toggleImportant(item.id)}
                    // toggleInput={toggleInput}
                />)
            }
        </ul>
    )
}


export default TasksList;