
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { addTask, editTask, deleteTask } from '../redux/tasksSlice';
import { Button, TextField, Container, Typography, Box, Paper, Grid, IconButton, Card, CardContent, CardActions, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks);

  // Local state for task input and editing
  const [taskName, setTaskName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Logout functionality
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Add task functionality
  const handleAddTask = () => {
    if (taskName.trim()) {
      dispatch(addTask({ id: Date.now(), name: taskName }));
      setTaskName('');
      toast.success('Task added successfully!');
    } else {
      toast.error('Please enter a valid task name.');
    }
  };

  // Edit task functionality
  const handleEditTask = (taskId) => {
    setEditMode(true);
    setEditingTaskId(taskId);
    const task = tasks.find((task) => task.id === taskId);
    setTaskName(task.name);
  };

  // Save edited task
  const handleSaveEdit = () => {
    if (taskName.trim()) {
      dispatch(editTask({ id: editingTaskId, updatedTask: { name: taskName } }));
      setTaskName('');
      setEditMode(false);
      setEditingTaskId(null);
      toast.success('Task updated successfully!');
    } else {
      toast.error('Please enter a valid task name.');
    }
  };

  // Delete task functionality
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    toast.success('Task deleted successfully!');
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" gutterBottom>
          Welcome to Your Dashboard
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} fullWidth>
          Logout
        </Button>
      </Box>

      {/* Task Input Section */}
      <Box mb={4}>
        <TextField
          label="Enter Task"
          variant="outlined"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          sx={{ mb: 2 }}
        />
        {editMode ? (
          <Button variant="contained" color="primary" onClick={handleSaveEdit} fullWidth>
            Save Task
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddTask} fullWidth>
            Add Task
          </Button>
        )}
      </Box>

      {/* Tasks List Section */}
      <Grid container spacing={3}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <Card sx={{ minHeight: 150 }}>
                <CardContent>
                  <Typography variant="h6">{task.name}</Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <IconButton onClick={() => handleEditTask(task.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTask(task.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body1" color="textSecondary">
                No tasks available. Start by adding a task.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </Container>
  );
};

export default Dashboard;
