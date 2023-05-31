using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;
using DDDSample1.Authorizationn;
using System.IdentityModel.Tokens;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmazensController : ControllerBase
    {
        private readonly IArmazemService _service;
        

        public ArmazensController(IArmazemService service)
        {
            _service = service;
        }

        // GET: api/Armazens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArmazemDto>>> GetAll()
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
                return await _service.GetAllAsync();
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // GET: api/Armazens/A1
        [HttpGet("{id}")]
        public async Task<ActionResult<ArmazemDto>> GetGetById(Guid id)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var arm = await _service.GetByIdAsync(new ArmazemId(id));

            if (arm == null)
            {
                return NotFound();
            }

            return arm;
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // GET: api/Armazens/idProprio/A1
        [HttpGet("idProprio/{id}")]
        public async Task<ActionResult<ArmazemDto>> GetGetByIdProprio(String id)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var arm = await _service.GetByIdProprioAsync(new IdProprio(id));

            if (arm == null)
            {
                return NotFound();
            }

            return arm;
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // POST: api/Armazens
        [HttpPost]
        public async Task<ActionResult<ArmazemDto>> Create(ArmazemDto dto)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var arm = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = arm.Id }, arm);
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        
        // PUT: api/Armazens/F5
        [HttpPut("{id}")]
        public async Task<ActionResult<ArmazemDto>> Update(Guid id, ArmazemDto dto)
        {
            try
            {
                Request.Headers.TryGetValue("Token", out var token);
                Authorization.validateToken(token);
                dto.Id = id;
                var arm = await _service.UpdateAsync(dto);
                
                if (arm == null)
                {
                    return NotFound();
                }
                return Ok(arm);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }
        

        // Inactivate: api/Armazens/F5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArmazemDto>> SoftDelete(Guid id)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var arm = await _service.InactivateAsync(new ArmazemId(id));

            if (arm == null)
            {
                return NotFound();
            }

            return Ok(arm);
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }
        
        // DELETE: api/Armazens/F5
        [HttpDelete("{id}/hard")]
        public async Task<ActionResult<ArmazemDto>> HardDelete(Guid id)
        {
            try
            {
                Request.Headers.TryGetValue("Token", out var token);
                Authorization.validateToken(token);
                var arm1 = await _service.InactivateAsync(new ArmazemId(id));
                var arm = await _service.DeleteAsync(new ArmazemId(id));

                if (arm == null)
                {
                    return NotFound();
                }

                return Ok(arm);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

    
    }
}