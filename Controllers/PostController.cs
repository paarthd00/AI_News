using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AINews.Models;

namespace AINews.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PostsController : ControllerBase
{
    private readonly DatabaseContext _context;

    public PostsController(DatabaseContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetPostItems()
    {
        return await _context.Posts.ToListAsync();
    }

    // /api/Posts/27
    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPostItem(int id)
    {
        var PostItem = await _context.Posts.FindAsync(id);

        if (PostItem == null)
        {
            return NotFound();
        }

        return PostItem;
    }

    [HttpPost]
    public async Task<ActionResult<Post>> PostPostItem(Post Post)
    {
        _context.Posts.Add(Post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPostItem), new { id = Post.Id }, Post);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPostItem(int id, Post Post)
    {
        if (id != Post.Id)
        {
            return BadRequest();
        }

        _context.Entry(Post).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePostItem(int id)
    {
        var PostItem = await _context.Posts.FindAsync(id);
        if (PostItem == null)
        {
            return NotFound();
        }

        try
        {
            _context.Posts.Remove(PostItem);
            await _context.SaveChangesAsync();

        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }

        return NoContent();
    }
}