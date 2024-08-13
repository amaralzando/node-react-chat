import { Router } from 'express';
import { createChat, findChat, findUserChats } from './Controllers/chatController.js';
import { createMessage, getMessages } from './Controllers/messageController.js';
import { FindUser, getUsers, LoginUser, registerUser } from './Controllers/userController.js';

const router = Router();

//==== ROTAS USER ====
router.post('/user/register', registerUser);
router.post('/user/auth', LoginUser);
router.post('/user/me', FindUser);
router.get('/users', getUsers);

//==== ROTAS CHATS ====
router.post('/chat/createchat', createChat);
router.post('/chat/find', findChat);
router.post('/chat/finduserchat', findUserChats);

//==== ROTAS CHATS ====
router.post('/message/createmessage', createMessage);
router.post('/message/getmessage', getMessages);

export default router;
