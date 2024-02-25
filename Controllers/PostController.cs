using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AINews.Models;
using Microsoft.AspNetCore.SignalR;
using AINews.Hubs;


using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

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
            await _hubContext.Clients.All.SendAsync("deletepost", id);
        }
        catch (DbUpdateException)
        {
            return BadRequest();
        }

        return NoContent();
    }

    [HttpPost("completepost")]
    public async Task<ActionResult<string>> Chat(ChatRequest request)
    {
        var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Add("Authorization", "Bearer " + Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
        var requestBody = new StringContent(JsonConvert.SerializeObject(new
        {
            model = "gpt-3.5-turbo-instruct",
            prompt = request.Prompt,
            max_tokens = request.MaxTokens,
            temperature = request.Temperature
        }), Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync("https://api.openai.com/v1/completions", requestBody);

        var responseBody = await response.Content.ReadAsStringAsync();

        return Ok(responseBody);
    }

}

public class ChatRequest
{
    public string Prompt { get; set; }
    public int MaxTokens { get; set; }
    public double Temperature { get; set; }
}