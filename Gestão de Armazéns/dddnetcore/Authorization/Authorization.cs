using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using System.Linq;

namespace DDDSample1.Authorizationn{
    public static class Authorization{
        public static bool validateToken(string token)
    {
	    var mySecret = "my sakdfho2390asjod$%jl)!sdjas0i secret";

	    var tokenHandler = new JwtSecurityTokenHandler();
	    tokenHandler.ValidateToken(token, new TokenValidationParameters
		    {
			    ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,
                ValidateAudience = false,
                ValidateIssuer = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(mySecret))
		    }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var role = jwtToken.Claims.First(claim => claim.Type == "role").Value;

            if(role != "GA"){
                throw new Exception("Acesso não autorizado");
            }
	    
		    
	    
	    return true;
}
    }
}