const express= require("express");
const mongoose=require("mongoose");
const shortUrl = require("./models/shortUrl");
mongoose.connect("mongodb://localhost/urlShortener",{
    useUnifiedTopology:true
});
const app=express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended:false
}))

app.get('/', async(req,res)=>{
    const shorturls=await shortUrl.find();
    res.render('index', {shorturls:shorturls})
});

app.post('/shortUrls', async(req,res)=>{
    await shortUrl.create({
        full: req.body.fullUrl
    })
    res.redirect('/');
})

app.get('/:shorturl', async (req,res)=>{
    const short_link=await shortUrl.findOne({
        short: req.params.shorturl
    })
    short_link.clicks++;
    short_link.save();
    res.redirect(short_link.full);

})

app.listen(4000)