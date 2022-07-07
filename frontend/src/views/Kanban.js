import React, {Component} from "react";
import Modal from "../components/Modal";
import axios from "axios";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import {green, indigo, orange, red, yellow} from "@mui/material/colors";
import {useDrag} from 'react-dnd'

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
                progress: 0
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
    };

    handleDelete = (item) => {
        axios
            .delete(`/api/pages/${item.id}/`)
            .then((res) => this.refreshList());
    };

    createItem = () => {
        const item = {
            title: "",
            description: "",
            progress: 0
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

    displayProgress = (status) => {
        if (status === "Not Started") {
            return this.setState({viewProgress: 2});
        } else if (status === "In Progress") {
            return this.setState({viewProgress: 1});
        } else {
            return this.setState({viewCompleted: 0});
        }
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
                    <CardContent>
                        <Typography variant="h6" component="div">
                            {item.title}
                        </Typography>
                        <Typography color="text.secondary">
                            {item.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing={true}>
                        <IconButton
                            aria-label="edit"
                            onClick={() => this.editItem(item)}
                            size="large"
                            sx={{
                            color: indigo[400]
                        }}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={() => this.handleDelete(item)}
                            size="large"
                            sx={{
                            color: red[300]
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        ));
    };

    render() {
        return (
            <div className="outerDiv">
                <main className="container">
                    <Box
                        component="div"
                        sx={{
                        display: 'flex'
                    }}>
                        <ViewColumnIcon
                            sx={{
                            mt: 3,
                            fontSize: 60
                        }}/>
                        <Typography
                            component="h1"
                            variant="h3"
                            sx={{
                            ml: 0,
                            mt: 3
                        }}>
                            Kanban Board
                        </Typography>
                    </Box>
                    <div className="kanbanBoard">
                        <Box
                            sx={{
                            display: 'grid',
                            mt: 5,
                            columnGap: 5,
                            rowGap: 1,
                            gridTemplateColumns: 'repeat(3, 1fr)'
                        }}>
                            <Typography
                                variant="h6"
                                color={'Black'}
                                sx={{
                                ml: 0
                            }}>
                                Not Started
                                <IconButton
                                    aria-label="addItem"
                                    onClick={this.createItem}
                                    size="large"
                                    sx={{
                                    ml: 2,
                                    color: red[300]
                                }}>
                                    <AddBoxIcon/>
                                </IconButton>
                            </Typography>
                            <Typography
                                variant="h6"
                                color={'Black'}
                                sx={{
                                ml: 0
                            }}>
                                In Progress
                                <IconButton
                                    aria-label="addItem"
                                    onClick={this.createItem}
                                    size="large"
                                    sx={{
                                    ml: 2,
                                    color: orange[300]
                                }}>
                                    <AddBoxIcon/>
                                </IconButton>
                            </Typography>
                            <Typography
                                variant="h6"
                                color={'Black'}
                                sx={{
                                ml: 0
                            }}>
                                Completed
                                <IconButton
                                    aria-label="addItem"
                                    onClick={this.createItem}
                                    size="large"
                                    sx={{
                                    ml: 2,
                                    color: green[300]
                                }}>
                                    <AddBoxIcon/>
                                </IconButton>
                            </Typography>
                            <Grid
                                container
                                item
                                className="NotStarted"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                                sx={{
                                minHeight: 500,
                                backgroundColor: "#EA907A",
                                borderRadius: 3
                            }}>
                                {this.renderItems(0)}

                            </Grid>
                            <Grid
                                container
                                item
                                className="InProgress"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                                sx={{
                                backgroundColor: "#FBC687",
                                borderRadius: 3
                            }}>
                                {this.renderItems(1)}
                            </Grid>
                            <Grid
                                container
                                item
                                className="Completed"
                                justifyContent="center"
                                alignItems="flex-start"
                                spacing={2}
                                sx={{
                                backgroundColor: "#BEDBBB",
                                borderRadius: 3
                            }}>
                                {this.renderItems(2)}
                            </Grid>
                        </Box>
                    </div>
                    {this.state.modal
                        ? (<Modal
                            activeItem={this.state.activeItem}
                            toggle={this.toggle}
                            onSave={this.handleSubmit}/>)
                        : null}
                </main>
            </div>
        );
    }
}

export default Kanban;