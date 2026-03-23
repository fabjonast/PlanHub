CREATE TABLE IF NOT EXISTS User(
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(20) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Calendar(
    calendarId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE IF NOT EXISTS Goal(
    goalId INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    categoryId INT,
    title VARCHAR(100) NOT NULL,
    status ENUM('active', 'completed', 'abandoned') NOT NULL DEFAULT'active',
    startDate DATE NOT NULL,
    targetDate DATE NOT NULL,
    created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
);

CREATE TABLE IF NOT EXISTS Task(
    taskId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT'low',
    status ENUM('pending', 'in-progress', 'completed') NOT NULL DEFAULT'in-progress',
    startDate DATETIME,
    endDate DATETIME,
    isAllDay BOOLEAN NOT NULL DEFAULT FALSE,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    scheduleId INT NOT NULL,
    categoryId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (scheduleId) REFERENCES Schedule(scheduleId),
    FOREIGN KEY (categoryId) REFERENCES Category(categoryId)
);

CREATE TABLE IF NOT EXISTS Reminder(
    reminderId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    date DATETIME,
    userId INT NOT NULL,
    goalId INT NOT NULL,
    scheduleId INT NOT NULL,
    taskId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userId),
    FOREIGN KEY (goalId) REFERENCES Goal(goalId),
    FOREIGN KEY (scheduleId) REFERENCES Schedule (scheduleId),
    FOREIGN KEY (taskId) REFERENCES Task(taskId)
);

CREATE TABLE IF NOT EXISTS Category(
    categoryId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    color VARCHAR(20),
    icon VARCHAR(50),
    userId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(userId),
    UNIQUE(userId, name)
);

CREATE TABLE IF NOT EXISTS Schedule(
    scheduleId INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('daily', 'weekly', 'monthly', 'yearly'),
    title VARCHAR(100) NOT NULL,
    calendarId INT NOT NULL,
    FOREIGN KEY(calendarId) REFERENCES Calendar(calendarId)
);

CREATE TABLE IF NOT EXISTS Note(
    noteId INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated DATETIME,
    taskId INT NOT NULL,
    goalId INT NOT NULL,
    reminderId INT NOT NULL,
    FOREIGN KEY (taskId) REFERENCES Task(taskId),
    FOREIGN KEY (goalId) REFERENCES Goal(goalId),
    FOREIGN KEY (reminderId) REFERENCES Reminder(reminderId)
);

CREATE TABLE IF NOT EXISTS Deadline(
    deadlineId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    dueDate DATE NOT NULL,
    dueTime TIME,
    isCompleted BOOLEAN NOT NULL DEFAULT FALSE,
    taskId INT NOT NULL,
    goalId INT NOT NULL,
    FOREIGN KEY (taskId) REFERENCES Task(taskId),
    FOREIGN KEY (goalId) REFERENCES Goal(goalId),
);