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
            <Dialog open={true} toggle={toggle}>
                <DialogTitle toggle={toggle}>Kanban Task</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        required
                        id="outlined-required"
                        label="Required"
                        defaultValue="Enter Task Title"
                        value={this.state.activeItem.title}
                        onChange={this.handleChange}/>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Description"
                        defaultValue="Enter Task Description"
                        value={this.state.activeItem.description}
                        onChange={this.handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        <Select
                            labelId="task-type-select-label"
                            id="task-type-select"
                            value={this.state}
                            label="Task Type"
                            onChange={this.handleChange}>
                            <MenuItem value={10}>Not Started</MenuItem>
                            <MenuItem value={20}>In Progress</MenuItem>
                            <MenuItem value={this.state.activeItem.completed}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogActions>
            </Dialog>
        );
    }
}