import avatarController from "../Controllers/avatarController.js"
import express from "express";


const router=express.Router();



router.post("/create-avatar/:id", avatarController.createAvatar);

router.get("/myAvatar", avatarController.getMyAvatar);


router.put('/edit-avatar/:id',avatarController.editAvatar);




export default router;