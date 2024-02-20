using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AINews.Models;
using Microsoft.AspNetCore.SignalR;
using AINews.Hubs;
namespace AINews.Controllers;

[ApiController]
[Route("api/[controller]")]

public class PostsController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly IHubContext<PostHub> _hubContext;

    public PostsController(DatabaseContext context, IHubContext<PostHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
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
        await _hubContext.Clients.All.SendAsync("newpost", Post);
        return CreatedAtAction(nameof(GetPostItems), new { id = Post.Id }, Post);
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
        await _hubContext.Clients.All.SendAsync("updatepost", Post);
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
