const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

exports.register = async(req,res) =>{
    const {email, password} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password , 10);
        const result = await db.query(
            'INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id',
            [email, hashedPassword]
        );
        const token = jwt.sign({userId : result.rows[0].id}, process.env.JWT_SECRET);
        res.status(201).json({token});
    }catch(error){
        res.status(500).json({error: 'Error registering user' });
    }
};

exports.login = async(req,res) => {
    const {email, password} = req.body;
    try{
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if(results.rows.length === 0){
            res.status(401).json({error : 'Invalid Credentials'});
        }
        const user = result.rows[0];
        const isValidPassword = await bcrypt.compare(password , user.password);
        if(!isValidPassword){
            return res.status(401).json({error : 'Invalid Credentials'});
        }
        const token = jwt.sign({userId : user.id} , process.env.JWT_SECRET);
        res.json({token});
    }catch (error){
        res.status(500).json({ error: 'Error logging in' });
    }
};