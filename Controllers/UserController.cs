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

    // /api/Posts/27
    [HttpGet("{id}")]
    public async Task<ActionResult<AIPost>> GetPostItem(string id)
    {
        var AIPostItem = await _context.AIPosts.FindAsync(id);

        if (AIPostItem == null)
        {
            return NotFound();
        }

        return AIPostItem;
    }

    [HttpPost]
    public async Task<ActionResult<User>> PostPostItem(User User)
    {
        _context.Users.Add(User);
        
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUsers), new { id = User.Id }, User);
    }
}

