require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');

const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const repository = require('./database/repository');

const router = require('./routes/index');
const userIdentity = require('./middleware/UserIdentityMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static/public')));
app.use(fileUpload({}));
app.use(cookieParser());

app.use(userIdentity);
app.use('/api', router);

const start = async () => {
    try {  
        await repository.init();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error(e);
    }
}

start(); 
