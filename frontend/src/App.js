import React, { Component} from "react";
import Header from "./Header";

import Modal from "./components/Modal";
import axios from "axios";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
        completed: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/api/pages/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
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
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  

  renderTabList = () => {
    
    

    return (
      <Tabs className="nav nav-tabs"
      >
        <Tab value = "Complete"
          label = "Complete"
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
        </Tab>
        <Tab value = "Incomplete"
          label = "Incomplete"
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
        </Tab>
      </Tabs>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <Button 
            variant = "contained"
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </Button>
          <Button 
            variant = "contained"
            color = "error"
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </Button>
        </span>
      </li>
    ));
  };

  render() {
    return (
	<body>
		<Header/>
      <main className="container">
        <h1 className="text-black text-center my-4">Task Tracker</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <Button 
                  variant = "contained"
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add task
                </Button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
	</body>
    );
  }
}

export default App;