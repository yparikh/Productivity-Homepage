import React, {Component} from "react";
import Modal from "./components/Modal";
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
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
import {indigo, red} from "@mui/material/colors";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            viewCompleted: false,
            todoList: [],
            modal: false,
            activeItem: {
                title: "",
                description: "",
                completed: false
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
            completed: false
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

    displayCompleted = (status) => {
        if (status) {
            return this.setState({viewCompleted: true});
        }

        return this.setState({viewCompleted: false});
    };

    renderTabList = () => {
        return (
            <Tabs className="nav nav-tabs">
                <Tab
                    value="Complete"
                    label="Complete"
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted
                    ? "nav-link active"
                    : "nav-link"}></Tab>
                <Tab
                    value="Incomplete"
                    label="Incomplete"
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted
                    ? "nav-link"
                    : "nav-link active"}></Tab>
            </Tabs>
        );
    };

    renderItems = () => {
        const {viewCompleted} = this.state;
        const newItems = this
            .state
            .todoList
            .filter((item) => item.completed === viewCompleted);

        return newItems.map((item) => (
            <Grid
                item
                key={item.id}
                sx={{
                maxHeight: 150,
                minWidth: "100%"
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
                            size = "large"
                            sx={{
                            color: indigo[400]
                        }}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton
                            aria-label="delete"
                            onClick={() => this.handleDelete(item)}
                            size = "large"
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
                    <Typography
                        component="h1"
                        variant="h3"
                        align={"center"}
                        sx={{
                        ml: -3
                    }}>
                        Kanban Board
                    </Typography>
                    <div className="kanbanBoard">
                        <Box
                            sx={{
                            display: 'grid',
                            mt: 5,
                            gap: 5,
                            gridTemplateColumns: 'repeat(3, 1fr)'
                        }}>
                            <Typography
                                variant="h6"
                                color={'Black'}
                                align={"center"}
                                sx={{
                                ml: -3
                            }}>
                                Not Started
                            </Typography>
                            <Typography
                                variant="h6"
                                color={'Black'}
                                align={"center"}
                                sx={{
                                ml: -3
                            }}>
                                In Progress
                            </Typography>
                            <Typography
                                variant="h6"
                                color={'Black'}
                                align={"center"}
                                sx={{
                                ml: -3
                            }}>
                                Completed
                            </Typography>
                            <Grid
                                container
                                item
                                className="NotStarted"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                sx={{
                                p: 2,
                                minHeight: 500,
                                backgroundColor: "#EA907A",
                                borderRadius: 3
                            }}>
                                {this.renderItems()}

                            </Grid>
                            <Grid
                                container
                                item
                                className="InProgress"
                                justifyContent="center"
                                alignItems="flex-start"
                                sx={{
                                p: 2,
                                backgroundColor: "#FBC687",
                                borderRadius: 3
                            }}>
                                <Card
                                    sx={{
                                    maxHeight: 150
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Task Name
                                        </Typography>
                                        <Typography color="text.secondary">
                                            description
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing={true}>
                                        <Button size="small">Edit</Button>
                                        <Button size="small" color="error">Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid
                                container
                                item
                                className="Completed"
                                justifyContent="center"
                                alignItems="flex-start"
                                sx={{
                                p: 2,
                                backgroundColor: "#BEDBBB",
                                borderRadius: 3
                            }}>
                                <Card
                                    sx={{
                                    maxHeight: 150,
                                    minWidth: 150
                                }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            Task Name
                                        </Typography>
                                        <Typography color="text.secondary">
                                            this
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing={true}>
                                        <Button size="small">Edit</Button>
                                        <Button size="small" color="error">Delete</Button>
                                    </CardActions>
                                </Card>
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

export default App;