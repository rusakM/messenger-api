let fs = require('fs');
let headers = require('../middlewares/headers');

let avatar = `${process.cwd()}/public/photos/avatar.png`;

const getPhoto = (req, res) => {
    let {id} = req.params;
    let link = `${process.cwd()}/public/photos/${id}.jpg`;
    if(fs.existsSync(link)) {
        fs.readFile(link, (err, data) => {
            if(err) console.log(err)
            res.set(headers);
            res.write(data);
            res.status(200);
            res.end();
        });
    }
    else {
        fs.readFile(avatar, (err, data) => {
            res.set(headers);
            res.write(data);
            res.status(200);
            res.end();
        });
    }
}

const getMessage = (req, res) => {
    let {id} = req.params;
    let link = `${process.cwd()}/public/messages/${id}.jpg`;
    if(fs.existsSync(link)) {
        fs.readFile(link, (err, data) => {
            if(err) console.log(err)
            res.set(headers);
            res.write(data);
            res.status(200);
            res.end();
        });
    }
    else {
        fs.readFile(avatar, (err, data) => {
            res.set(headers);
            res.write("Fetch photo error");
            res.status(200);
            res.end();
        });
    }
}

module.exports = {
    getPhoto,
    getMessage
}