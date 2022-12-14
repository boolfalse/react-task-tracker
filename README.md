
## React Task Tracker



#### About:

> **React Task Tracker** is a simple project built with React.js


#### Installation:

- Clone the repository and install dependencies:
```bash
git clone git@github.com:boolfalse/react-task-tracker.git
cd react-task-tracker
npm install
```

- Create a 'db.json' file with the content like this:
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Task 1",
      "date": "2022-01-01",
      "is_completed": true
    },
    {
      "id": 2,
      "title": "Task 2",
      "date": "2022-01-02",
      "is_completed": false
    },
    {
      "id": 3,
      "title": "Task 3",
      "date": "2022-01-03",
      "is_completed": true
    }
  ]
}
```
or just copy 'db-example.json' file to 'db.json'.

- Run the application:
```bash
# for development
npm run start
# for production
npm run build
```

- Open the application in the browser:
```bash
# using json-server
npm i -g serve
serve -s build -p 8000

npm run server
# or via manual command
npm i -g json-server
json-server --watch db.json --port 5000
```

#### Resources:

- [Traversy Media - React JS Crash Course - 2021.01.18](https://www.youtube.com/watch?v=w7ejDZ8SWv8)
- [React Router v6 Major Changes](https://www.youtube.com/watch?v=k2Zk5cbiZhg)
- [React Task Tracker @ GitHub](https://github.com/bradtraversy/react-crash-2021)
