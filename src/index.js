import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Controllers from './controllers';
import controllers from './controllers';

const app = express();

app.use(cors({
    origin: "*",
}));

//Middle Ware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended : true, limit : "700mb"}));

Controllers.forEach((controller) => {
    app.use(controller.path, controller.router);
});

app.get("/", (req, res)=>{
    res.send("this is root");
})

app.use((err, req, res, next) => {
    console.log(err);
    
    res
    .status(err.status || 500)
    .json({messange: err.message || "서버 에러 발생"});
});

app.listen(8000, ()=>{
    console.log("server is started!");
});
