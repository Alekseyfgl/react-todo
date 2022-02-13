import React from "react";

import TasksCompletedAmount from "./tasks-completed-amount/TasksCompletedAmount";


import './tasks-completed.scss'
import '../other-style/other-them.scss'

function TasksCompleted(props) {

    const finalTasks = props.listClosedTasks.filter(closedTasks => closedTasks.isActive === false)
    const countListClosedTasks = finalTasks.length;


    return (
        <div className="tasks-completed">

            <TasksCompletedAmount countListClosedTasks={countListClosedTasks}/>

            <ul className="completed-list">

                {finalTasks.map(item => {

                    return (

                        <li key={item.id}
                            className={'completed-list__item tasks-list_them'}>



                            <p className="tasks-completed__text">{item.name}</p>



                        </li>
                    )

                })}

            </ul>
        </div>
    )
}


export default TasksCompleted;