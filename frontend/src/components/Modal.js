import React, {Component} from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: this.props.activeItem
        };
    }

    handleChange = (e) => {
        let {name, value} = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = {
            ...this.state.activeItem,
            [name]: value
        };

        this.setState({activeItem});
    };

    render() {
        const {toggle, onSave} = this.props;
        return (
            <Dialog open={true}>
                <DialogTitle>Kanban Task</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        id="outlined-required"
                        label="Title"
                        name="title"
                        value={this.state.activeItem.title}
                        onChange={this.handleChange}
                        />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="outlined-name"
                        label="Description"
                        name="description"
                        value={this.state.activeItem.description}
                        onChange={this.handleChange}/>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-label">Task Progress</InputLabel>
                        <Select
                            labelId="task-progress-select-label"
                            id="task-progress-select"
                            value={this.state.activeItem.completed}
                            label="Task Type"
                            onChange={this.handleChange}>
                            <MenuItem value={"Not Started"}>Not Started</MenuItem>
                            <MenuItem value={20}>In Progress</MenuItem>
                            <MenuItem value={this.state.activeItem.completed}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                    <Button color="primary" onClick={() => toggle()}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}