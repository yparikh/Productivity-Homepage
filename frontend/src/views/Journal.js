import React, {Component} from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';

import {green, indigo, orange, red} from "@mui/material/colors";
import NoteDrawer from "../components/NoteDrawer";

class Journal extends Component {

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
            <div>
                <main className=" journalContainer">
                    <Box sx={{
                        display: 'flex'
                    }}>
                        <CssBaseline/>
                        <NoteDrawer/>
                        <Box
                            component="main"
                            sx={{
                            flexGrow: 1,
                            p: 3
                        }}>
                            

                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start">
                                <Grid
                                    item
                                    //key={item.id}
                                    sx={{
                                    p: 2
                                }}>
                                    <Card className="noteCard">
                                        <CardContent>
                                            <Typography variant="h6" component="div">
                                                Title
                                            </Typography>
                                            <Typography color="text.secondary">
                                                description
                                            </Typography>
                                        </CardContent>
                                        <CardActions disableSpacing={true}>
                                            <IconButton
                                                aria-label="edit"
                                                //onClick={() => this.editItem(item)}
                                                size="large"
                                                sx={{
                                                color: indigo[400]
                                            }}>
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton
                                                aria-label="delete"
                                                //onClick={() => this.handleDelete(item)}
                                                size="large"
                                                sx={{
                                                color: red[300]
                                            }}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                </main>
            </div>
        );
    }
};

export default Journal;