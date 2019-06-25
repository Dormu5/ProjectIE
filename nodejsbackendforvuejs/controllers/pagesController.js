export default {
    async home(req, res, next){
        res.send('You are in a home page');
    },
    async loginScreen(req, res, next){
        res.send('You are in a login view');
    },
    async registration(req, res, next){
        res.send('You are on a registration page');
    }

}
