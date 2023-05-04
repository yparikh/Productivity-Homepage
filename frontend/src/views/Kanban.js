import React, {Component} from "react";
import Modal from "../components/Modal";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import {Button} from "@mui/material";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {ReactSortable} from "react-sortablejs";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class Kanban extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewProgress: 0,
            todoList: [],
            modal: false,
            activeItem: {
                title: "",
                description: "",
                progress: 0,
                justCreated: false
            }
        };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        axios
            .get("/api/pages/")
            .then((res) => this.setState({todoList: res.data}))
            .catch((err) => console.log(err));
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    handleSubmit = (item) => {
        console.log(item)

        if (item.title === "") {
            console.log("bad request");
        } else {
            this.toggle();

            if (item.id) {
                axios
                    .put(`/api/pages/${item.id}/`, item)
                    .then((res) => this.refreshList());
                return;
            }
            axios
                .post("/api/pages/", item)
                .then((res) => this.refreshList());
        }

    };

    handleDelete = (item) => {
        this.setState({modal: false});

        axios
            .delete(`/api/pages/${item.id}/`)
            .then((res) => this.refreshList());

    };

    createItem = () => {
        const item = {
            title: "",
            description: "",
            progress: 0,
            justCreated: true
        };

        this.setState({
            activeItem: item,
            modal: !this.state.modal
        });
    };

    editItem = (item) => {
        this.setState({
            activeItem: item,
            modal: !this.state.modal
        });
    };

    renderItems = (status) => {
        const newItems = this
            .state
            .todoList
            .filter((item) => item.progress === status);

        return newItems.map((item) => (
            <Grid
                item
                key={item.id}
                sx={{
                minWidth: "100%",
                p: 2
            }}>
                <Card className="generatedCard">
                    <CardContent onClick={() => this.editItem(item)}>
                        <Typography variant="h6" component="div">
                            {item.title}
                        </Typography>
                        <Typography color="text.secondary">
                            {item.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ));
    };

    render() {
        return (
            <div className="outerDiv">
                <main className="container">
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        component="div"
                        sx={{
                        display: 'flex'
                    }}>
                        <Typography
                            component="h1"
                            variant="h3"
                            sx={{
                            ml: -2,
                            mt: 3
                        }}>
                            Kanban Board
                        </Typography>
                        <Button
                            variant="contained"
                            aria-label="addItem"
                            onClick={this.createItem}
                            size="small"
                            sx={{
                            mt: 5,
                            backgroundColor: "#48A9A6"
                        }}>
                            New Task
                            <AddBoxIcon/>
                        </Button>
                    </Stack>
                    <div className="kanbanBoard">
                        <Box
                            sx={{
                            display: 'grid',
                            mt: 5,
                            columnGap: 5,
                            rowGap: 1,
                            gridTemplateColumns: 'repeat(3, 1fr)'
                        }}>
                            
                                <Grid
                                    container
                                    item
                                    className="NotStarted"
                                    justifyContent="flex-start"
                                    alignContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                    sx={{
                                    minHeight: 500,
                                    backgroundColor: "#fbb39d",
                                    borderRadius: 3,
                                    p: 0
                                }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                        ml: 2,
                                        mt: 1
                                    }}>
                                        Not Started
                                    </Typography>
                                    <ReactSortable
                                    group="shared"
                                list={this.state.todoList}
                                setList={(newState) => this.setState({list: newState})}>
                                    {this.renderItems(0)}
                                    </ReactSortable>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    className="InProgress"
                                    justifyContent="flex-start"
                                    alignContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                    sx={{
                                    backgroundColor: "#fbdf9d",
                                    borderRadius: 3
                                }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                        ml: 2,
                                        mt: 1
                                    }}>
                                        In Progress
                                    </Typography>
                                    <ReactSortable
                                    group="shared"
                                list={this.state.todoList}
                                setList={(newState) => this.setState({list: newState})}>
                                    {this.renderItems(1)}
                                    </ReactSortable>
                                </Grid>
                                <Grid
                                    container
                                    item
                                    className="Completed"
                                    justifyContent="flex-start"
                                    alignContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                    sx={{
                                    backgroundColor: "#c8ddbb",
                                    borderRadius: 3
                                }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                        ml: 2,
                                        mt: 1
                                    }}>
                                        Completed
                                    </Typography>
                                    <ReactSortable
                                    group="shared"
                                list={this.state.todoList}
                                setList={(newState) => this.setState({list: newState})}>
                                    {this.renderItems(2)}
                                    </ReactSortable>
                                </Grid>
                            </Box>
                        </div>
                        {this.state.modal
                            ? (<Modal
                                activeItem={this.state.activeItem}
                                toggle={this.toggle}
                                onSave={this.handleSubmit}
                                onDelete={this.handleDelete}/>)
                            : null}
                    </main>
                </div>
        );
    }
}

export default Kanban;