const validTaskData = (formData, type) => {
  if (!formData) {
    throw new Error("All fields are required");
  }
  if (type === "CreateTask") {
    const { taskName, taskDescription, taskDue, taskTitle } = formData;
    if (!taskName) {
      throw new Error("Task Name is required");
    }
    if (!taskDescription) {
      throw new Error("Task Description is required");
    }
    if (!taskDue) {
      throw new Error("Task Due is required");
    }
  } else if (type === "Register") {
    const { userName, emailId, passWord } = formData;
    if (!userName) {
      throw new Error("user name is required");
    }

    if (!emailId) {
      throw new Error("email id is required");
    }
    if (!passWord) {
      throw new Error("password is required");
    }
  } else {
    const { emailId, passWord } = formData;
    if (!emailId) {
      throw new Error("emailID is required");
    }
    if (!passWord) {
      throw new Error("passWord is required");
    }
  }
};

module.exports = validTaskData;
