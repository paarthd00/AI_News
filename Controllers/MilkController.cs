using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TypesOfMilk.Models;

namespace TypesOfMilk.Controllers;

[ApiController]
[Route("api/[controller]")]

public class MilksController : ControllerBase
{
    private readonly DatabaseContext _context;

    public MilksController(DatabaseContext context)
    {
        _context = context;
    }

    // /api/Milks/ByRating?starRating=3
    [HttpGet("ByRating")]
    public async Task<ActionResult<IEnumerable<Milk>>> GetMilkItemsByRating(int starRating)
    {
        return await _context.Milks.Where(t => t.Rating == starRating).ToListAsync();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Milk>>> GetMilkItems()
    {
        return await _context.Milks.ToListAsync();
    }

    // /api/Milks/27
    [HttpGet("{id}")]
    public async Task<ActionResult<Milk>> GetMilkItem(int id)
    {
        var MilkItem = await _context.Milks.FindAsync(id);

        if (MilkItem == null)
        {
            return NotFound();
        }

        return MilkItem;
    }

    [HttpPost]
    public async Task<ActionResult<Milk>> PostMilkItem(Milk Milk)
    {
        _context.Milks.Add(Milk);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMilkItem), new { id = Milk.Id }, Milk);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutMilkItem(int id, Milk Milk)
    {
        if (id != Milk.Id)
        {
            return BadRequest();
        }

        _context.Entry(Milk).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMilkItem(int id)
    {
        var MilkItem = await _context.Milks.FindAsync(id);
        if (MilkItem == null)
        {
            return NotFound();
        }

        try
        {
            _context.Milks.Remove(MilkItem);
            await _context.SaveChangesAsync();

        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }

        return NoContent();
    }
}