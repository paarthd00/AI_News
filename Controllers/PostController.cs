using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AINews.Models;
using Microsoft.AspNetCore.SignalR;
using AINews.Hubs;
using System.Text;
using Newtonsoft.Json;

namespace AINews.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AIPostsController : ControllerBase
{
    private readonly DatabaseContext _context;
    private readonly IHubContext<PostHub> _hubContext;

    public AIPostsController(DatabaseContext context, IHubContext<PostHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AIPost>>> GetPostItems()
    {
        return await _context.AIPosts.ToListAsync();
    }

    // /api/Posts/27
    [HttpGet("{id}")]
    public async Task<ActionResult<AIPost>> GetPostItem(int id)
    {
        var AIPostItem = await _context.AIPosts.FindAsync(id);

        if (AIPostItem == null)
        {
            return NotFound();
        }

        return AIPostItem;
    }

    [HttpPost]
    public async Task<ActionResult<AIPost>> PostPostItem(AIPost AIPost)
    {
        _context.AIPosts.Add(AIPost);
        await _context.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("newpost", AIPost);
        return CreatedAtAction(nameof(GetPostItems), new { id = AIPost.Id }, AIPost);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPostItem(int id, AIPost AIPost)
    {
        if (id != AIPost.Id)
        {
            return BadRequest();
        }

        _context.Entry(AIPost).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        await _hubContext.Clients.All.SendAsync("updatepost", AIPost);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePostItem(int id)
    {
        var PostItem = await _context.AIPosts.FindAsync(id);
        if (PostItem == null)
        {
            return NotFound();
        }

        try
        {
            _context.AIPosts.Remove(PostItem);
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

        var response = await httpClient.PostAsync(Environment.GetEnvironmentVariable("OPENAI_API_ENDPOINT"), requestBody);

        var responseBody = await response.Content.ReadAsStringAsync();

        return Ok(responseBody);
    }

}

public class ChatRequest
{
    public string Prompt { get; set; } = "";
    public int MaxTokens { get; set; }
    public double Temperature { get; set; }
}