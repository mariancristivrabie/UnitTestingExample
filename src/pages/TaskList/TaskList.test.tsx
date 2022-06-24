import { fireEvent, render, screen } from '@testing-library/react';
import { TaskList } from './TaskList';


describe('<TaskList />',() => {
    const TaskListComponent = (<TaskList />)

    it('should render',() => {
        render(TaskListComponent);

        const container = screen.getByTestId('task-list');
        expect(container).toBeInTheDocument();

        const button = screen.getByRole('button',{name:'Add'});
        expect(button).toBeInTheDocument();

        const title = screen.getByText('Tasks list');
        expect(title).toBeInTheDocument();
    })

    it('should display the add task section',() => {
        render(TaskListComponent);

        const button = screen.getByRole('button',{name:'Add'});

        let nameInput = screen.queryByPlaceholderText('Task Name');
        let descriptionInput = screen.queryByPlaceholderText('Task Description');


        expect(nameInput).not.toBeInTheDocument();
        expect(descriptionInput).not.toBeInTheDocument();

        if(button){
            fireEvent.click(button);
        }

        nameInput = screen.getByPlaceholderText('Task Name');
        descriptionInput = screen.getByPlaceholderText('Task Description');
        const saveButton = screen.getByRole('button',{name:'Save'})

        expect(nameInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();

        if(button){
            fireEvent.click(button);
        }

        nameInput = screen.queryByPlaceholderText('Task Name');
        descriptionInput = screen.queryByPlaceholderText('Task Description');

        expect(nameInput).not.toBeInTheDocument();
        expect(descriptionInput).not.toBeInTheDocument();
    })

    it('should have empty list',() => {
        render(TaskListComponent);
        const list = screen.getByRole('list');

        expect(list).toBeInTheDocument();
        expect(list.childElementCount).toEqual(0);
    })

    it('should add a task and close add dialog',() => {
        render(TaskListComponent);
        const button = screen.getByRole('button',{name:'Add'});

        if(button){
            fireEvent.click(button);
        }

        let nameInput = screen.queryByPlaceholderText('Task Name');
        let descriptionInput = screen.queryByPlaceholderText('Task Description');
        const saveButton = screen.getByRole('button',{name:'Save'})


        if(nameInput && descriptionInput){
            fireEvent.change(nameInput, { target: { value: 'New task name' } });
            fireEvent.change(descriptionInput, { target: { value: 'New task description' } });
            fireEvent.click(saveButton);
        }

        const list = screen.getByRole('list');
        expect(list.childElementCount).toEqual(1);

        nameInput = screen.queryByPlaceholderText('Task Name');
        descriptionInput = screen.queryByPlaceholderText('Task Description');

        expect(nameInput).not.toBeInTheDocument();
        expect(descriptionInput).not.toBeInTheDocument();
    })
})