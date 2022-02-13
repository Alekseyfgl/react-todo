import React from "react";

import './tasks-progress.scss'

import AddTask from "./add-task/AddTask";
import TasksTotal from "./tasks-total/TasksTotal";
import TasksUncompletedAmount from "./tasks-uncompleted-amount/TasksUncompletedAmount";
import TasksList from "./tasks-list/TasksList";
import ControlsBar from "../controls-bar/ControlsBar";


class TasksProgress extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                {
                    id: 1,
                    name: 'Task 1',
                    isActive: true,
                    isImportant: true,
                },
                {
                    id: 2,
                    name: 'Task 2',
                    isActive: true,
                    isImportant: true,
                },
                {
                    id: 3,
                    name: 'Task 3',
                    isActive: false,
                    isImportant: false,
                },
                {
                    id: 4,
                    name: 'Task 4',
                    isActive: false,
                    isImportant: false,
                }
            ],
            displayedList: 'all',
            panelForSearch: '',

            toggleInput: false,
        }
        // this.maxId = 5;
    }



    componentDidMount() {
        //эта часть отвечает за правый блок Completed
        this.props.onListClosedTasks(this.state.tasks)
    }

    //
    changeDisplayedList = (displayedList) => {
        // console.log('displayedList',displayedList );
        this.setState({
            displayedList: displayedList,
        })
    }


    searchTasks = (tasks, panelForSearch) => {
        // console.log('searchTasks', panelForSearch);
        if (panelForSearch.length === 0) {
            return tasks
        }

        return tasks.filter(item => item.name.indexOf(panelForSearch) > -1);
    }

    onUpdateSearchApp = (panelForSearch) => {
        this.setState({
            panelForSearch: panelForSearch,
        })
    }


    filterTasks = (tasks, displayedList) => {

        switch (displayedList) {
            case 'all':
                return tasks;
            case 'active'  :
                return tasks.filter(tasksItem => tasksItem.isActive);
            default :
                return tasks.filter(tasksItem => !tasksItem.isActive);
        }
    }
    onFilterSelected = (displayedList) => {
        this.setState({
            displayedList: displayedList,
        })
    }




    //++++++++++ This is needs to be completed ++++++++++
    // renameTaskApp = (e) => {
    //     const btnEdit = e.currentTarget;
    //
    //     // this.setState({
    //     //     toggleInput : !this.state.toggleInput,
    //     // })
    //
    //     // const taskName = btnEdit.parentElement.parentElement.children[0].children[1];
    //     // console.log(taskName)
    //
    //
    //
    //     // this.state.toggleInput ? <input/> : <p>{this.state.name}</p>
    //     // taskName.disabled = false;
    //     // taskName.focus();
    //
    //     // taskName.onblur = () => {
    //     //     // taskName.disabled = true;
    //     //     this.setState({
    //     //         toggleInput : !this.state.toggleInput,
    //     //     })
    //     // }
    // }



    onRenameTask = (id, inputVal) => {
        // console.log(inputVal)
        // console.log(id)
        this.setState(({tasks}) => {
            //возвращаем новый объект
            return {
                tasks: tasks.map(user => {
                    if (user.id === id) {
                        return {
                            ...user,
                            name: inputVal ? inputVal : 'to title',
                        }
                    }
                    return user;
                })
            }
        });

        //эта часть отвечает за правый блок Completed
        this.props.onListClosedTasks(this.state.tasks.map((user => {
            if (user.id === id) {
                return {
                    ...user,
                    name: inputVal ? inputVal : 'no title',
                }
            }
            return user;
        })));
    }

    // checkNameInput = (id, inputVal) => {
    //     // console.log(id, inputVal)
    //     this.setState(({tasks}) => ({
    //         tasks: tasks.map(user => {
    //             if (user.id === id) {
    //                 return {
    //                     ...user,
    //                     name: inputVal ? inputVal : 'no title',
    //                 }
    //             }
    //             return user;
    //         })
    //     }))
    // }

    //удаляем task
    delTask = (id) => {
        // console.log(id)

        //1 вариант
        // console.log('del task', id);
        // const {tasks} = this.state;
        //
        // // делаем новый массив со всеми id кроме того на который нажали
        // const newTasks = tasks.filter((item)=>item.id !== id);
        // // console.log('newTasks', newTasks);
        //
        // //перерисовывает наш список с новым массивом
        // this.setState({
        //     tasks: newTasks,
        // });

        //2 ваирант
        //основываюясь на предыдущих состояниях
        // const cb = (prevState) => {
        //     const {tasks} = prevState;
        //
        //     const newTasks = tasks.filter(item => item.id !== id);
        //     return {
        //         tasks: newTasks,
        //     }
        // };
        // this.setState(cb);

        //3 ваирант
        this.setState(({tasks}) => {
            //эта часть отвечает за правый блок Completed
            this.props.onListClosedTasks(this.state.tasks.filter(item => item.id !== id))

            return {
                tasks: tasks.filter(item => item.id !== id),
            }

        })
    }

    addTask = (name) => {

        if (name.trim().length !== 0) {
            const newTask = {
                id: +new Date(),
                //или id: Data.now()
                name: name.trim(),
                isActive: true,
                isImportant: false,
            }

            this.setState(({tasks}) => {
                const newArr = [...tasks, newTask];

                return {
                    tasks: newArr,
                }
            });
        }
    }


    closeTask = (id) => {

        this.setState(({tasks}) => {
            const index = tasks.findIndex(elem => elem.id === id);
            const oldObj = tasks[index];
            const newItem = {...oldObj, isActive: !oldObj.isActive}
            const newArr = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)];

            //эта часть отвечает за правый блок Completed
            this.props.onListClosedTasks(newArr.filter(closedTasks => closedTasks.isActive === false));

            //а эта уже нет)
            return {
                tasks: newArr,
            }

        })
    }


    render() {
        const {tasks, displayedList, panelForSearch,} = this.state;

        const totalTasks = tasks.length;
        const todoTasks = tasks.filter(activeTasks => activeTasks.isActive === true).length;


        const finalTasks = this.filterTasks(this.searchTasks(tasks, panelForSearch), displayedList);


        return (

            <div
                className="tasks-progress">
                <AddTask onTask={this.addTask}/>
                <TasksTotal totalTask={totalTasks}/>

                <ControlsBar onUpdateSearchApp={this.onUpdateSearchApp}
                             changeDisplayedList={this.changeDisplayedList}/>

                <TasksUncompletedAmount todoTasks={todoTasks}/>

                <TasksList toggleInput={this.state.toggleInput}

                           // renameTaskApp={this.renameTaskApp}
                           onRenameTask={this.onRenameTask}
                           // checkNameInput={this.checkNameInput}

                           closeTask={this.closeTask}
                           tasks={finalTasks}
                           delTask={this.delTask}
                />
            </div>
        )
    }
}


export default TasksProgress;