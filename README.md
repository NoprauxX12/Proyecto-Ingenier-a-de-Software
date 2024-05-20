<h1 align="center">El Que Sabe</h1>

El Que Sabe is a web application that serves as an efficient intermediary between freelancers and clients. Our app brings together professionals from various fields into a single catalog, streamlining and expediting the connection process between service providers and those in need of services.

## Documentation

This project was created for the fourth semester course "Software Engineering" (ST0250), taught at EAFIT University by Elizabeth Suescún Monsalve. To learn more about all the implemented features, you can check our backlog [here](https://github.com/users/NoprauxX12/projects/2).

## Installation

To run this project, you need to have Node.js and MySQL installed. Note that we used Node.js version 20.11.1, and we recommend using this version to avoid compatibility issues.

### Database Setup

Before running the program, open the `dbMySql.txt` file and copy the SQL query contained within. Then, open MySQL Workbench and create a new query. Paste the copied content and execute the query to create the necessary database for this project.

To interact with the registration process in the application, you need to populate the `town` and `technicalknowledge` tables. We provide two CSV files that can be used as samples. To import these records into the database using MySQL Workbench, follow these steps:

1. Double-click to select the schema `el_que_sabe`.
2. Run the query: `SELECT * FROM el_que_sabe.town;`.
3. In the Result Grid, click the "Import records from an external file" button.
4. In the file explorer, find `town.csv` located in the repository files.
5. Select "Use existing table" and choose the corresponding table from the dropdown menu.
6. Ensure the columns from the file match the columns in the database table.

Repeat the same process for the `technicalknowledge` table using `technicalknowledge.csv`.

### Environment Configuration

Rename the `.env-change` file to `.env`.

Update the variables in the `.env` file with your own database credentials:
```env
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
DATABASE=el_que_sabe
PORT=port_to_use
```

## Usage

To run the program, open three terminals in the root folder where the project is copied.

### Backend Server

In the first terminal, navigate to the backend folder:

```bash
cd server
```
Install the dependencies:
```bash
npm install
```
Run the server:
```bash
npm start
```

### Chat Server

In the second terminal, navigate to the chat server folder:
```bash
cd serverchat
```
Install the dependencies:
```bash
npm install
```
Run the server:
```bash
npm start
```

### Frontend

In the third terminal, navigate to the frontend folder:
```bash
cd views
```
Install the dependencies:
```bash
npm install
```
Run the server:
```bash
npm start
```
**Note:** Be sure to check the packages listed in the package.json file in each folder to ensure that you have all the necessary dependencies installed.

## Contributing
We are not accepting pull requests at the moment. Please stay tuned for any updates.

## License
This project is not available for distribution. Copyright © Santiago Acevedo Urrego, Juan Sebastián Lizcano Urrea, Juan Pablo Rúa Cartagena and Juan José Restrepo Higuita.
