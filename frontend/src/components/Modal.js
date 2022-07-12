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
        const {toggle, onSave} = this.props;
        return (
            <Dialog open={true}>
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
                        required
                        error={this.state.activeItem.description === ""}
                        margin="normal"
                        id="outlined-name"
                        label="Description"
                        name="description"
                        value={this.state.activeItem.description}
                        helperText={"The Description must not be empty"}
                        onChange={this.handleChange}/>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-label">Task Progress</InputLabel>
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