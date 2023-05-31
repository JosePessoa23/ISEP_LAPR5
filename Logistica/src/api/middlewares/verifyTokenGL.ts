const verifyTokenGL = (req, res,next) => {
    const jwt = req.headers["token"];
            const chavePrivada = "my sakdfho2390asjod$%jl)!sdjas0i secret";
    
            // Efetuando a validação do JWT:
            const jwtService = require("jsonwebtoken");
            jwtService.verify(jwt, chavePrivada, (err, userInfo) => {
                if (err || userInfo.role!='GL') {
                    res.status(401).end();
                    return;
                }
            next();
            });
        }
        

export default verifyTokenGL;