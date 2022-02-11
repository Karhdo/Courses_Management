const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes/index');
const database = require('./config/database/index');

const app = express();
const port = 3000;

// Connect to Database
database.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Custom middleware
app.use(SortMiddleware);

// HTTP logger
app.use(morgan('combined'));

// Method Override: PUT,PATCH
app.use(methodOverride('_method'));

// Template engine
app.engine(
    'handlebars',
    handlebars.engine({
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}"><span class="${icon}"></span></a>`;
            },
        },
    }),
);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
