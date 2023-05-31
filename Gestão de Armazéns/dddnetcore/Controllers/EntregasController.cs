using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;
using DDDSample1.Domain.Armazens;
using DDDSample1.Authorizationn;
using System.IdentityModel.Tokens;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntregasController : ControllerBase
    {
        private readonly IEntregaService _service;

        public EntregasController(IEntregaService service)
        {
            _service = service;
        }

        // GET: api/Families
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetAll()
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            return await _service.GetAllAsync();
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // GET: api/Entregas/F1
        [HttpGet("{id}")]
        public async Task<ActionResult<EntregaDto>> GetGetById(Guid id)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var entrega = await _service.GetByIdAsync(new EntregaId(id));

            if (entrega == null)
            {
                return NotFound();
            }

            return entrega;
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // GET: api/Entregas/F1
        [HttpGet("data/{data}")]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetGetByData(int data)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var entrega = await _service.GetByDataAsync(new Data(data));

            if (entrega == null)
            {
                return NotFound();
            }

            return entrega;
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // GET: api/entregas/armazem/F1
        [HttpGet("armazem/{armazem}")]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetByArmazem(String armazem)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var entrega = await _service.GetByArmazemAsync(new IdProprio(armazem));

            if (entrega == null)
            {
                return NotFound();
            }

            return entrega;
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // GET: api/entregas/data/descendente
        [HttpGet("data/descendente")]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetOrderByData()
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var entrega = await _service.GetOrderByDataAsync();

            if (entrega == null)
            {
                return NotFound();
            }

            return entrega;
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // GET: api/entregas/armazem/ascendente
        [HttpGet("armazem/ascendente")]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetOrderByArmazem()
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var entrega = await _service.GetOrderByArmazemAsync();

            if (entrega == null)
            {
                return NotFound();
            }

            return entrega;
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // POST: api/Entregas
        [HttpPost]
        public async Task<ActionResult<EntregaDto>> Create(EntregaDto dto)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var entrega = await _service.AddAsync(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = entrega.Id }, entrega);
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        
        // PUT: api/Entregas/F5
        [HttpPut("{id}")]
        public async Task<ActionResult<EntregaDto>> Update(EntregaDto dto, Guid id)
        {

            try
            {
                Request.Headers.TryGetValue("Token", out var token);
                Authorization.validateToken(token);
                dto.Id = id;
                var entrega = await _service.UpdateAsync(dto);
                
                if (entrega == null)
                {
                    return NotFound();
                }
                return Ok(entrega);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }

        // Inactivate: api/Entregas/F5
        [HttpDelete("{id}/soft")]
        public async Task<ActionResult<EntregaDto>> SoftDelete(Guid id)
        {
            Request.Headers.TryGetValue("Token", out var token);
            try{
                Authorization.validateToken(token);
            var entrega = await _service.InactivateAsync(new EntregaId(id));

            if (entrega == null)
            {
                return NotFound();
            }

            return Ok(entrega);
            }catch(Exception e){
                return Unauthorized(new {Message = e.Message});
            }
        }
        
        // DELETE: api/Entregas/F5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EntregaDto>> HardDelete(Guid id)
        {
            try
            {
                Request.Headers.TryGetValue("Token", out var token);
                Authorization.validateToken(token);
                var entrega1 = await _service.InactivateAsync(new EntregaId(id));
                var entrega = await _service.DeleteAsync(new EntregaId(id));

                if (entrega == null)
                {
                    return NotFound();
                }

                return Ok(entrega);
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