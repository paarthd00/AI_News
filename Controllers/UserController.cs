using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AINews.Models;

namespace AINews.Controllers;

[ApiController]
[Route("api/[controller]")]

public class UsersController : ControllerBase
{
    private readonly DatabaseContext _context;

    public UsersController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    // /api/Users/27
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserItem(int id)
    {
        var UserItem = await _context.Users.FindAsync(id);

        if (UserItem == null)
        {
            return NotFound();
        }

        return UserItem;
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostUserItem(User User)
    {
        _context.Users.Add(User);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserItem), new { id = User.Id }, User);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutUserItem(int id, User User)
    {
        if (id != User.Id)
        {
            return BadRequest();
        }

        _context.Entry(User).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUserItem(int id)
    {
        var UserItem = await _context.Users.FindAsync(id);
        if (UserItem == null)
        {
            return NotFound();
        }

        try
        {
            _context.Users.Remove(UserItem);
            await _context.SaveChangesAsync();

        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }

        return NoContent();
    }
}