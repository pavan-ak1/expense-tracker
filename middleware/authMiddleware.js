const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');
const {attachCookiesToResponse, createTokenUser} = require('../utils');

const register = async(req,res)=>{
    try {
        const {email,name,password} = req.body
        
        if (!email || !name || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                msg: 'Please provide all required fields' 
            });
        }

        const emailAlreadyExists = await User.findOne({email});
        if(emailAlreadyExists){
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                msg: 'Email already exists' 
            });
        }

        const user = await User.create({email,name,password});
        const tokenUser = createTokenUser(user);
        
        try {
            attachCookiesToResponse({res,user:tokenUser});
            res.status(StatusCodes.CREATED).json({user:tokenUser});
        } catch (jwtError) {
            console.error('JWT Error:', jwtError);
            // Still return success but without the token
            res.status(StatusCodes.CREATED).json({
                user: tokenUser,
                msg: 'User created but authentication failed. Please try logging in.'
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            msg: 'Something went wrong, please try again' 
        });
    }
}

const login = async(req,res)=>{
    try {
        const {email, password}=req.body;
        if(!email || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({ 
                msg: 'Please provide email and password' 
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({ 
                msg: 'Invalid Credentials' 
            });
        }
        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect){
            return res.status(StatusCodes.UNAUTHORIZED).json({ 
                msg: 'Invalid Credentials' 
            });
        }
        const tokenUser = createTokenUser(user);
        try {
            attachCookiesToResponse({res,user:tokenUser});
            res.status(StatusCodes.OK).json({user:tokenUser});
        } catch (jwtError) {
            console.error('JWT Error:', jwtError);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: 'Authentication failed. Please try again.'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
            msg: 'Something went wrong, please try again' 
        });
    }
}

const logout = async(req,res)=>{
    res.cookie('token','logout',{
        httpOnly:true,
        expires:new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({msg:'User logged out'});
}

module.exports = {register, login,logout}