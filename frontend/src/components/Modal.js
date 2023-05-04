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

        const activeItem = {
            ...this.state.activeItem,
            [name]: value
        };
        this.setState({activeItem});
    };

    render() {
        const {toggle, onSave, onDelete} = this.props;
        const disabled = this.state.activeItem.justCreated;

        return (
            <Dialog open={true} onClose={toggle}>
                <DialogTitle>Kanban Task</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        required
                        error={this.state.activeItem.title === ""}
                        margin="normal"
                        id="outlined-required"
                        label="Title"
                        name="title"
                        value={this.state.activeItem.title}
                        helperText={"The Title must not be empty"}
                        onChange={this.handleChange}
                        />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="outlined-multiline-flexible"
                        multiline
                        maxRows={4}
                        label="Description"
                        name="description"
                        value={this.state.activeItem.description}
                        onChange={this.handleChange}/>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-label">Progress</InputLabel>
                        <Select
                            labelId="task-progress-select-label"
                            id="task-progress-select"
                            name="progress"
                            value={this.state.activeItem.progress}
                            label="Task Type"
                            onChange={this.handleChange}>
                            <MenuItem value={0}>Not Started</MenuItem>
                            <MenuItem value={1}>In Progress</MenuItem>
                            <MenuItem value={2}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button 
                        color="error" 
                        disabled = {disabled}
                        onClick={() => onDelete(this.state.activeItem)}>
                        Delete
                    </Button>
                    <Button color="primary" onClick={() => toggle()}>
                        Close
                    </Button>
                    <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}